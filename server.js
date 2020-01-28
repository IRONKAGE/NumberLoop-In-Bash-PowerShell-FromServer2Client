var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

// Змінна для сервера
var serverNumber = Number();

// Змінна для клієнта
var clientNumber = new Map();


// socket.IO
io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);

    socket.broadcast.emit("user", `Клієнт приєднався`)

    clientNumber.set(socket, 1)

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});


// Генерація чисел на сервері
setInterval(() => {
    do {
        serverNumber++;
        console.log(`Число із сервера ` + serverNumber);
        io.volatile.emit('numberFromServer', serverNumber)
    } while (serverNumber < 1);
}, 3000);


// Генерація чисел на клієнті
setInterval(() => {
    for (const [client, numberFromClient] of clientNumber.entries()) {
        client.emit("numberFromClient", numberFromClient);
        clientNumber.set(client, numberFromClient + 1);
        console.log(`Число із клієнта ` + serverNumber); //Глюк - пам'ять не очищеється, коли користувач від'єднався -> сервер далі рахує + ці цифри не відповідаюьб тому, що на приєднаному клієнті
    }
}, 1000);

server.listen(port);
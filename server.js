var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

// Змінна для сервера
var serverNumber = Number();

// Змінна для клієнта
// var clientNumber = new Map();


// socket.IO
io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);

    socket.broadcast.emit("user", `Клієнт приєднався`)
    socket.broadcast.emit("numberFromClient", serverNumber)

    // clientNumber.set(socket, 1)

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});


// Генерація чисел на сервері
setInterval(() => {
    do {
        serverNumber += 1;
        console.log(`Число із сервера ` + serverNumber);
    } while (serverNumber < 1);
}, 1000);


// Генерація чисел на клієнті
// setInterval(() => {
//     for (const [client, numberFromClient] of clientNumber.entries()) {
//         client.emit("numberFromClient", numberFromClient);
//         clientNumber.set(client, numberFromClient + 1);
//         console.log(`Число із клієнта ` + serverNumber); //Глюк - пам'ять не очищеється, коли користувач від'єднався -> сервер далі рахує + ці цифри не відповідаюьб тому, що на приєднаному клієнті
//     }
// }, 1000);

server.listen(port);
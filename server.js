var server = require('http').createServer();
var port = process.env.PORT || 15000;
var io = require("socket.io")(server);

// Змінна для сервера
var serverNumber = Number();


// socket.IO
io.on("connection", (socket) => {
    console.info(`Клієнт приєднався [id=${socket.id}]`);

    socket.broadcast.emit("user", `Клієнт приєднався`)

    socket.on("disconnect", () => {
        console.info(`Клієнт від'єднався [id=${socket.id}]`);
        socket.broadcast.emit("user", `Клієнт від'єднався`)
    });
});


// Генерація чисел на сервері (краще рішення)
setInterval(() => {
    serverNumber++
    console.log(`Число із сервера ` + serverNumber);
    io.volatile.emit('numberFromServer', serverNumber)
}, 1000);

// Лишив для тесту продуктивності
// setInterval(() => {
//     do {
//         serverNumber++;
//         console.log(`Число із сервера ` + serverNumber);
//         io.volatile.emit('numberFromServer', serverNumber)
//     } while (serverNumber < 1);
// }, 1000);

server.listen(port);
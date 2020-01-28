const io = require("socket.io-client");
clientIO = io.connect("http://localhost:15000");
clientIO.on("user", (msg) => console.info(msg));
clientIO.on("numberFromServer", (msg) => console.info(`Число із сервера ` + msg));
clientIO.on("numberFromClient", (msg) => console.log(`Число із клієнта ` + msg));
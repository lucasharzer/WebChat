require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");


const app = express();

const httpServer = http.Server(app);
const io = socketIO(httpServer);

// Rota na Web
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

// Servidor recebendo mensagens
io.on("connection", function(socket){
    socket.on("chat message", function(msg){
        io.emit("chat message", msg);
    });
});

// Iniciar o servidor
const port = process.env.PORT;

httpServer.listen(port, function(){
    console.log(`Servidor rodando em: http://localhost:${port} !!!`)
});
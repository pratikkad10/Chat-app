import WebSocket, { WebSocketServer } from "ws";

const wss= new WebSocketServer({port:8080});

wss.on("connection", (socket)=>{
    console.log("connection successful");
    socket.on("message", (e)=>{
        console.log(e.toString());
    })
})
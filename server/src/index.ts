import WebSocket, { WebSocketServer } from "ws";

const wss= new WebSocketServer({port:8080});

interface User{
   socket:WebSocket,
    roomId:string
}

const allsockets: User[] = [];

wss.on("connection", (socket)=>{
    console.log("connection successful");

    socket.on("message", (message)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type == "join"){
            console.log("User joined room # ", parsedMessage.payload.roomId);
            
            allsockets.push({
                socket,
                roomId:parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type == "chat"){
            const currentUserRoom = allsockets.find(x => x.socket == socket)?.roomId;
            
            allsockets.forEach(item =>{
                if( item.roomId == currentUserRoom){
                    item.socket.send(parsedMessage.payload.message);
                }
            })
        }
    })
})
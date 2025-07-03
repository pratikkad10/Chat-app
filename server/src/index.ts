import WebSocket, { WebSocketServer } from "ws";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
const PORT=process.env.PORT;

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

app.post('/signup', (req,res)=>{
    try {
        const {username, password}=req.body;
        if(!username && !password){
            res.status(400).json({
                success:false,
                messsage:"Fields should not empty!"
            })
            return;
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            messsage:"User not registered!",
            error
        })
    }
})

app.listen(PORT, ()=>{
    console.log("Srver listening at port ", PORT);
})
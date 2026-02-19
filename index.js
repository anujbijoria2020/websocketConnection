import { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss= new WebSocketServer({ port: 8080 });

//connection event
wss.on("connection",(socket,request)=>{
    console.log("New client connected");
   const ip = request.socket.remoteAddress;

   socket.on("message",(rawData)=>{
       console.log({rawData});
       const message = rawData.toString();

    //broadcasting message to all other clients
    wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            client.send(`Server broadcast message : ${message}`);
        }
    })
   })

   socket.on("error",(error)=>{
    console.error(`Error from ${ip}: ${error}`);
    });

    socket.on("close",()=>{
        console.log(`Connection closed from ${ip}`);
    });
})
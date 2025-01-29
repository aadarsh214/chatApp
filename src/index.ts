import { WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on('connection', (socket) =>{
    socket.on('message', (message) =>{
        //@ts-ignore
        const ParsedMessage = JSON.parse(message);

        if(ParsedMessage.type === "join"){
            console.log('User Joined Room'+ ParsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: ParsedMessage.payload.roomId
            })
        }
        if(ParsedMessage.type === "chat"){
            console.log('User Sent Message'+ ParsedMessage.payload.message);
            let currentUserRoom = null;
            for(let i = 0; i < allSockets.length; i++){
                if(allSockets[i].socket === socket){
                    currentUserRoom = allSockets[i].room;
                }
            }
            for(let i = 0 ; i < allSockets.length ; i++){
                if(allSockets[i].room === currentUserRoom){
                    allSockets[i].socket.send(ParsedMessage.payload.message);
                }
            } 
        }
    })


})
import { WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket;
    root: string;
}

let allSockets: User[] = [];

wss.on('connection', (socket) =>{
    socket.on('message', (message) =>{
        const ParsedMessage = JSON.parse(message as unknown as string);

        if(ParsedMessage.type === 'join'){

        }
        if(ParsedMessage.type === 'chat'){
            }
    })


})
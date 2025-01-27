import { WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on('connection', (socket) =>{
    allSockets.push(socket);
    console.log('user connected');

    socket.on('message', (message) =>{
        console.log('message recived' + message.toString());
        allSockets.forEach(s =>{
            s.send(message.toString());
        })
    })
    socket.on('dissconnected', () =>{
        allSockets = allSockets.filter(x => x != socket);   
    })
})
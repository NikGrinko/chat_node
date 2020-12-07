const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const PORT = 8080;
app.use(express.json())
app.use(cors());

const rooms = new Map();

app.get('/', (request, response) => {
    response.send(200);
});

app.get('/rooms/:id', (request, response) => {
    const roomId = request.params.id

    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    } :
        { users: [], messages: [] };
    response.json(obj)
});

app.post('/rooms', (request, response) => {
    const { roomId, userName } = request.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId,
            new Map([
                ['users', new Map()],
                ['messages', []]
            ]))
    }
    response.send();
})

io.on('connection', socket => {
    socket.on('ROOM_JOIN', ({ roomId, userName }) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
    });

    socket.on('NEW_MESSAGE', ({ roomId, userName, text }) => {
        const message = {
            userName,
            text
        }
        rooms.get(roomId).get('messages').push(message);
        socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', message);

    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...rooms.get(roomId).get('users').values()];
                socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
            }
        })
    });

    console.log(`Socket connected ${socket}`);
});


server.listen(PORT, (error) => {
    if (error) throw Error(error);
    console.log(`CORS-enabled web server listening on port ${PORT}`)
});








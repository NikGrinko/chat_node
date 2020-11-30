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
app.post('/rooms', (request, response) => {
    console.log('Request received')
    const { roomId, name } = request.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId,
            new Map([
                ['users', new Map()],
                ['messages', []]
            ]))
    }
    response.send();
})

io.on('Connection', socket => {
    console.log(`Socket connected ${socket}`);

})

server.listen(PORT, (error) => {
    if (error) throw Error(error);
    console.log(`CORS-enabled web server listening on port ${PORT}`)
});

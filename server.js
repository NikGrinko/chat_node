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

app.use(cors());
const rooms = new Map();

app.get('/', (request, response) => {

    response.json({ msg: 'This is CORS-enabled for a Single Route' });
});

io.on('Connection', socket => {
    console.log(`Socket connected ${socket}`);

})

server.listen(PORT, (error) => {
    if (error) throw Error(error);
    console.log(`CORS-enabled web server listening on port ${PORT}`)
});

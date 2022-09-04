import "reflect-metadata";
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';
import moongoose from 'mongoose';

const app = express();

const server = createServer(app);
moongoose.connect("mongodb://localhost/rocketsocket")
app.use(express.static(path.join(__dirname, "..", "public")));

const io = new Server(server);

io.on("connection", (socket) => {
    //console.log("Socket: "+ socket.id);
});

app.get("/", (request, response) => {
    return response.json({
        message: "Hello world"
    })
})

export { server, io }
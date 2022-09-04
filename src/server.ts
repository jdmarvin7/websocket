import { server } from "./http";
import "./websocket/WebsocketService"

server.listen(3000, () => {
    console.log("Server is running!");
})
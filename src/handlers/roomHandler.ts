import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import type IRoomParams from "../interfaces/IRoomParams";

const rooms: Record<string, string[]> = {};
const roomHandler = (socket: Socket) => {

    // the below map stores for a room what all peers have joined

    const createRoom = () => {
        const roomId = UUIDv4(); // this will be out unique room id in which multipel connection will exchange data
        socket.join(roomId); // we will make the socket connection enter a new room        

        rooms[roomId] = []; // we will create a new room with the given room id

        socket.emit("room-created", { // we will emit event from the server side that socket connection has been added to a room
            roomId
        });
        console.log('Room created with id: ', roomId);
    }

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        console.log("room with participants", rooms);

        if (rooms[roomId]) {
            // if the given roomId exists in memory db
            console.log('New user has joined room', roomId, "with peer id as", peerId);
            // the moment new user joins add the peerId to the key of roomId
            rooms[roomId].push(peerId);
            socket.join(roomId);

            // below event is for logging purpose
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        }
    }

    // when to call the above 2 functions ?
    // we will call the above 2 functions when the user will emit events on the create room or join room button
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler; 
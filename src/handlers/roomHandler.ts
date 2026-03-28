import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // this will be out unique room id in which multipel connection will exchange data
        socket.join(roomId); // we will make the socket connection enter a new room
        socket.emit("room-created", { // we will emit event from the server side that socket connection has been added to a room
            roomId
        });
        console.log('Room created with id: ', roomId);

    }

    const joinedRoom = ({ roomId }: { roomId: string }) => {
        console.log('New user has joined room', roomId);
    }

    // when to call the above 2 functions ?
    // we will call the above 2 functions when the user will emit events on the create room or join room button
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler;
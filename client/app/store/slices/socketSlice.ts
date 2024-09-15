import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import SocketService from "../../services/socket";

interface User {
  id: string;
  name: string;
  color: string;
}

interface SocketState {
  isConnected: boolean;
  connectedUsers: User[];
  roomId: string | null;
}

const initialState: SocketState = {
  isConnected: false,
  connectedUsers: [],
  roomId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setConnectedUsers: (state, action: PayloadAction<User[]>) => {
      state.connectedUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.connectedUsers.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.connectedUsers = state.connectedUsers.filter(
        (user) => user.id !== action.payload,
      );
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
  },
});

export const {
  setConnected,
  setConnectedUsers,
  addUser,
  removeUser,
  setRoomId,
} = socketSlice.actions;

export const initializeSocket = () => (dispatch: AppDispatch) => {
  console.log("Calling the initialize socket function");
  const socket = SocketService.initSocket();

  socket.on("connect", () => {
    dispatch(setConnected(true));
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    dispatch(setConnected(false));
    console.log("Disconnected from socket server");
  });

  socket.on("user-list", (users: User[]) => {
    dispatch(setConnectedUsers(users));
  });

  socket.on("user-joined", (user: User) => {
    dispatch(addUser(user));
  });

  socket.on("user-left", (userId: string) => {
    dispatch(removeUser(userId));
  });

  SocketService.connect();

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("user-list");

    socket.off("user-joined");
    socket.off("user-left");
    SocketService.disconnect();
  };
};

export const joinRoom =
  (roomId: string, username: string) => (dispatch: AppDispatch) => {
    const socket = SocketService.getSocket();
    socket.emit("join-room", { roomId, name: username });
    dispatch(setRoomId(roomId));
  };

export const emitEvent = (event: string, data: any) => () => {
  const socket = SocketService.getSocket();
  socket.emit(event, data);
};

export default socketSlice.reducer;

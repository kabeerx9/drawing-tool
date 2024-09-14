"use client";

import Board from "@/components/board/board";
import Menu from "@/components/menu/menu";
import Toolbox from "@/components/toolbox/toolbox";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { socket } from "@/app/socket";
import { useParams, useRouter } from "next/navigation";
export interface IUser {
  id: string;
  name: string;
  color: string;
}

const RoomPage = () => {
  const router = useRouter();
  const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
  const { roomId } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/");
    }

    socket.on("user-list", (users) => {
      console.log("user list event got sent from backend");
      setConnectedUsers(users);
    });

    socket.on("user-joined", (user) => {
      console.log("Someone joined the room baby");
      toast.success(`${user.name} joined the room`);
    });

    socket.on("user-left", (userId) => {
      setConnectedUsers((prevUsers) => {
        const userLeft = prevUsers.find((user) => user.id === userId);
        if (userLeft) {
          toast.error(`${userLeft.name} left the room`);
        }
        return prevUsers.filter((user) => user.id !== userId);
      });
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    return () => {
      socket.off("user-list");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("connect");
    };
  }, [roomId]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Menu />
      <div className="flex items-start w-full">
        <Toolbox />
      </div>
      <Board
        connectedUsers={connectedUsers}
        roomId={roomId as string}
        username={username}
      />
    </div>
  );
};

export default RoomPage;

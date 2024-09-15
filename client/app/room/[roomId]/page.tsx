"use client";

import Board from "@/components/board/board";
import Menu from "@/components/menu/menu";
import Toolbox from "@/components/toolbox/toolbox";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { initializeSocket, joinRoom } from "@/app/store/slices/socketSlice";

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { roomId } = useParams();

  const { isConnected, connectedUsers } = useAppSelector(
    (state) => state.socket,
  );

  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    if (isConnected && roomId) {
      const username = localStorage.getItem("username");
      if (username) {
        dispatch(joinRoom(roomId as string, username));
      } else {
        router.push("/");
      }
    }
  }, [isConnected, roomId, dispatch, router]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Menu />
      <div className="flex items-start w-full">
        <Toolbox />
      </div>
      <Board />
    </div>
  );
};

export default RoomPage;

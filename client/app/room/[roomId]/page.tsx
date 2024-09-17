"use client";

import Board from "@/components/board/board";
import Menu from "@/components/menu/menu";
import Toolbox from "@/components/toolbox/toolbox";

import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { initializeSocket, joinRoom } from "@/app/store/slices/socketSlice";

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { roomId } = useParams();

  const [socketInitialized, setSocketInitialized] = useState(false);

  const { isConnected, connectedUsers } = useAppSelector(
    (state) => state.socket,
  );

  useLayoutEffect(() => {
    const cleanup = dispatch(initializeSocket());
    setSocketInitialized(true);
    return cleanup;
  }, [dispatch]);

  useLayoutEffect(() => {
    const cleanup = dispatch(initializeSocket());

    return cleanup;
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

  if (!socketInitialized)
    return (
      <div className="w-full h-full bg-green-800 text-white font-bold text-3xl flex items-center justify-center">
        Initializing...
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Menu />
      <div className="flex items-start w-full">
        <Toolbox />
        Kabeer Kabeer
      </div>
      <Board />
    </div>
  );
};

export default RoomPage;

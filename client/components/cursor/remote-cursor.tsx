"use client";
import React, { useEffect, useState } from "react";
import { Pen } from "lucide-react";

import SocketService from "@/app/services/socket";

type RemoteCursorProps = {
  color: string;
  name: string;
  userId: string;
};

const RemoteCursor = ({ color, name, userId }: RemoteCursorProps) => {
  const socket = SocketService.getSocket();
  console.log("remote cursor re-render");

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("Effect re-render in user->", name);
    const handleCursorMove = (data: {
      x: number;
      y: number;
      userId: string;
    }) => {
      // console.log('data.userId is ', data.userId);
      // console.log('data.x is ', data.x);
      // console.log('data.y is ', data.y);

      if (data.userId === userId) {
        setPosition({ x: data.x, y: data.y });
      }
    };

    socket.on("cursor-move", handleCursorMove);

    return () => {
      socket.off("cursor-move", handleCursorMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        pointerEvents: "none",
      }}
    >
      <svg width="20" height="20">
        <Pen size={20} color={color} />
      </svg>
      <span
        style={{
          backgroundColor: color,
          padding: "2px 5px",
          borderRadius: "3px",
          color: "white",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default RemoteCursor;

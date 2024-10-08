"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActionMenuItem } from "@/app/store/slices/menu-slice";
import { MENU_ITEMS } from "@/app/utils/constants";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import SocketService from "@/app/services/socket";
import { changeBrushSize, changeColor } from "@/app/store/slices/toolbox-slice";
import RemoteCursor from "../cursor/remote-cursor";
import { serializeImageData } from "@/app/utils/utils";

const Board = () => {
  const socket = SocketService.getSocket();

  const username = localStorage.getItem("username");
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const drawHistory = useRef<ImageData[]>([]);
  const drawIndex = useRef(0);

  const { isConnected, connectedUsers, roomId } = useAppSelector(
    (state) => state.socket,
  );

  const connectedUsersExcludingMe = connectedUsers.filter(
    (user) => user.name !== username,
  );

  const { activeMenuItem, actionMenuItem } = useAppSelector(
    (state) => state.menu,
  );
  const { color, size } = useAppSelector(
    (state) => state.toolbox[activeMenuItem],
  );

  const drawLine = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      socket.emit("cursor-move", {
        x: e.clientX,
        y: e.clientY,
        userId: `${socket.id}`,
      });
      if (!isDrawing.current) return;
      drawLine(e.clientX, e.clientY);

      // socket.emit means we are sending a messagqe to the server
      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    },
    [dispatch],
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      // this URL is a base64 string of the canvas image

      const a = document.createElement("a");
      a.download = "sketch.jpg";
      a.href = URL;
      a.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (drawIndex.current === 0) {
        context?.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (drawIndex.current > 0) {
        drawIndex.current -= 1;
        const imageData = drawHistory.current[drawIndex.current];
        context?.putImageData(imageData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (drawIndex.current < drawHistory.current.length - 1) {
        drawIndex.current++;
        const imageData = drawHistory.current[drawIndex.current];
        context?.putImageData(imageData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.DELETE) {
      context?.clearRect(0, 0, canvas.width, canvas.height);
    }
    dispatch(setActionMenuItem(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const changeConfig = () => {
      context.strokeStyle = color || "black";
      context.lineWidth = size || 3;
    };

    changeConfig();
  }, [color, size]);

  // Component mount we need to add this stuff , this is the main logic for drawing stuff.
  // useLayoutEffect is because we want canvas to be rendered first before we add the above useEffect canvas stroke and other stuff.
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true;
      beginPath(e.clientX, e.clientY);

      // socket.emit means we are sending a message to the server
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      // whenever we move the mouse up we need to save the path to the drawHistory
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);

      // we need to send this image data to the server
      const serializedImageData = serializeImageData(imageData);
      console.log("I am sending image to the server.", serializedImageData);

      // Check the size of the serialized data
      const dataSize = JSON.stringify(serializedImageData).length;
      console.log(`Serialized data size: ${dataSize} bytes`);

      // If the size is larger than 1MB, log a warning
      if (dataSize > 1 * 1024 * 1024) {
        console.warn(
          `Data size (${dataSize} bytes) exceeds 1MB. This may cause issues with WebSocket transmission.`,
        );
      }

      // socket.emit("save-canvas", serializedImageData);

      drawIndex.current = drawHistory.current.length - 1;

      isDrawing.current = false;
      context.closePath();
    };

    const changeConfigWebSocket = (data: {
      item: string;
      size: string;
      color: string;
    }) => {
      console.log("Websocket change config was fired ", data);
      if (data.color) {
        dispatch(changeColor({ item: activeMenuItem, color: data.color }));
      }
      if (data.size) {
        dispatch(changeBrushSize({ item: activeMenuItem, size: data.size }));
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // socket.on means we are listening to the server

    const handleBeginPath = (data: { x: number; y: number }) => {
      beginPath(data.x, data.y);
    };

    const handleDrawLine = (data: { x: number; y: number }) => {
      drawLine(data.x, data.y);
    };

    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);
    socket.on("changeConfig", changeConfigWebSocket);

    // New event listener for canvas history

    socket.on("canvas-history", (history: ImageData[]) => {
      console.log("CANVAS HISTORY ON CLINET BOIIIIIIIIIIII");
      // need to deserialize data here and also then see whether i want a complete array from the backend or just the latest one.

      drawHistory.current = history;
      drawIndex.current = drawHistory.current.length - 1;
      if (history.length > 0) {
        context.putImageData(history[drawIndex.current], 0, 0);
      }
    });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
      socket.off("changeConfig", changeConfigWebSocket);
      socket.off("canvas-history");
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full bg-white"
      />
      {connectedUsersExcludingMe?.map((user) => (
        <RemoteCursor
          key={user.id}
          name={user.name}
          userId={user.id}
          color={user.color}
        />
      ))}
    </>
  );
};

export default Board;

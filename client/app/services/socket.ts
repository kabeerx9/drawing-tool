import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      console.log("NEW SOCKET INSTANCE CREATED");
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public initSocket(): Socket {
    console.log("INTIALIZE SOCKET CALLED");
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        autoConnect: false,
      });
      console.log("SOCKET INITIALIZED");
    }
    console.log("this.socket after initialization is ", this.socket);
    return this.socket;
  }

  public getSocket(): Socket {
    console.log("GET SOCKET CALLED");
    if (!this.socket) {
      throw new Error("Socket not initialized. Call initSocket first.");
    }
    return this.socket;
  }

  public connect(): void {
    if (this.socket) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketService.getInstance();

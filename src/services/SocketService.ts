import { io, Socket } from 'socket.io-client';
import { socketURL } from '../routes';

class SocketService {
  private socket: Socket;

  createSocketConnection = (): void  => {
    this.socket = io(socketURL);
  }

  emitEvent = (event: string, payload: any): void => {
    if (!this.socket) {
      throw new Error('Socket connection not established');
    }

    this.socket.emit(event, payload);
  }

  registerEvent = (event: string, callback: any): void => {
    this.socket.on(event, callback);
  }
}

export default new SocketService();

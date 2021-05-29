import { io, Socket } from 'socket.io-client';

import { socketURL } from '../routes';
import { SocketEventHandler } from '../events/SocketEvents';

class SocketClass {
  private socket: Socket;

  private registerRoutes = (): void => {
    if (!this.socket) {
      throw new Error('Create socket connection first');
    }

    const {
      handleOffer,
      handleAnswer,
      handleICECandidates,
      handlePeerJoined,
    } = SocketEventHandler;

    this.socket.on('peer-joined', handlePeerJoined);
    this.socket.on('offer', handleOffer);
    this.socket.on('answer', handleAnswer);
    this.socket.on('ice-candidate', handleICECandidates);
  };

  createSocketConnection = (): Socket => {
    this.socket = io(socketURL);
    this.registerRoutes();
    return this.socket;
  };

  getSocketInstance = (): Socket => {
    return this.socket;
  };

  joinRoom = (roomSlug: string): void => {
    if (!this.socket) {
      throw new Error('Create socket connection first');
    }

    this.socket.emit('join-room', roomSlug);
  };

  sendPayload = (event: string, payload: any): void => {
    if (!this.socket) {
      throw new Error('Create socket connection first');
    }

    this.socket.emit(event, payload);
  };
}

export const SocketHandler = new SocketClass();

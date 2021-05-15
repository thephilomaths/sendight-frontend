import { io, Socket } from 'socket.io-client';

import { socketURL } from '../routes';
import { SocketEventHandler } from '../handlers/SocketEventsHandler';

let socket: Socket;

const registerRoutes = (): void => {
  if (!socket) {
    throw new Error('Create socket connection first');
  }

  const {
    handleOffer,
    handleAnswer,
    handleICECandidates,
    handlePeerJoined,
  } = SocketEventHandler;

  socket.on('peer-joined', handlePeerJoined);

  socket.on('offer', handleOffer);

  socket.on('answer', handleAnswer);

  socket.on('ice-candidate', handleICECandidates);
};

const SocketService = {
  createSocketConnection: (): Socket => {
    socket = io(socketURL);

    registerRoutes();

    return socket;
  },

  getSocketInstance: (): Socket => {
    return socket;
  },

  joinRoom: (roomSlug: string): void => {
    if (!socket) {
      throw new Error('Create socket connection first');
    }

    socket.emit('join-room', roomSlug);
  },

  sendPayload: (event: string, payload: any): void => {
    if (!socket) {
      throw new Error('Create socket connection first');
    }

    socket.emit(event, payload);
  },
};

export { SocketService };

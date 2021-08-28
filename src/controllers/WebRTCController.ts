import SocketService from '../services/SocketService';
import { webRTCConnectionInfo } from '../config';
import { SOCKET_EVENTS } from '../constants/SocketEvents';

interface ICreateDataChannelParams {
  label: string;
  onOpenHandler?: (event: Event | RTCDataChannelEvent) => void;
  onMessageHandler?: (event: Event | RTCDataChannelEvent) => void;
}

class WebRTCController {
  private peerId: string;
  private role: string;
  private webRTCConnection: RTCPeerConnection;

  createWebRTCConnection = (): void => {
    this.webRTCConnection = new RTCPeerConnection(webRTCConnectionInfo);

    this.webRTCConnection.onicecandidate = this.handleICECandidateWebRTCEvent;
  };

  createOffer = (): void => {};

  createAnswer = (): void => {};

  handleICECandidateWebRTCEvent = (event: RTCPeerConnectionIceEvent): void => {
    const { candidate } = event;

    if (candidate) {
      SocketService.emitEvent(SOCKET_EVENTS.ICE_CANDIDATE, { target: this.peerId, candidate });
    }
  };

  setOffer = (): void => {};

  setAnswer = (): void => {};

  setIceCandidate = (): void => {};

  // Socket events start
  handlePeerJoinedEvent = async (payload: { id: string; role: string }): void => {
    this.peerId = payload.id;
    this.role = payload.role;

    this.createWebRTCConnection();
  };
  // Socket events end
}

export default new WebRTCController();

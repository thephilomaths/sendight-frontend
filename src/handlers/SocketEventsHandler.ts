import { SocketService } from '../services/SocketService';
import { WebRTCService } from '../services/WebRTCService';
import { WebRTCEventsHandler } from './WebRTCEventsHandler';

const SocketEventHandler = {
  handleOffer: (offer: RTCSessionDescriptionInit): void => {
    const { webRTCConnection, peerId } = WebRTCService;

    webRTCConnection.ondatachannel = WebRTCEventsHandler.handleDataChannelEvent;

    webRTCConnection
      .setRemoteDescription(offer)
      .then(() => {
        return webRTCConnection.createAnswer();
      })
      .then((answer) => {
        webRTCConnection.setLocalDescription(answer).then(() => {
          SocketService.sendPayload('answer', { target: peerId, answer });
        });
      });
  },

  handleAnswer: (answer: RTCSessionDescriptionInit): void => {
    const { webRTCConnection } = WebRTCService;

    webRTCConnection.setRemoteDescription(answer);
  },

  handleICECandidates: (candidate: RTCIceCandidateInit): void => {
    const { webRTCConnection } = WebRTCService;
    const iceCandidate = new RTCIceCandidate(candidate);

    webRTCConnection.addIceCandidate(iceCandidate);
  },

  handlePeerJoined: (payload: { id: string; role: string }): void => {
    const peerId = payload.id;
    const webRTCConnection = WebRTCService.createNewWebRTCClient();

    if (payload.role === 'peer') {
      // This means the other user is peer and current user is creator
      // Create offer
      webRTCConnection.createOffer().then((offer) => {
        webRTCConnection.setLocalDescription(offer).then(() => {
          SocketService.sendPayload('offer', { target: peerId, offer });
        });
      });
    }

    console.log(WebRTCService);
    WebRTCService.peerId = peerId;
  },
};

export { SocketEventHandler };

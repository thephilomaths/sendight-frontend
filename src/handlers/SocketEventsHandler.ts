import { SocketService } from '../services/SocketService';
import { WebRTCService } from '../services/WebRTCService';
import { WebRTCEventsHandler } from './WebRTCEventsHandler';

const SocketEventHandler = {
  handleOffer: (offer: RTCSessionDescriptionInit): void => {
    const peer = WebRTCService.getPeer();
    const peerId = WebRTCService.getPeerId();

    peer.ondatachannel = WebRTCEventsHandler.handleDataChannelEvent;

    peer
      .setRemoteDescription(offer)
      .then(() => {
        return peer.createAnswer();
      })
      .then((answer) => {
        peer.setLocalDescription(answer).then(() => {
          SocketService.sendPayload('answer', { target: peerId, answer });
        });
      });
  },

  handleAnswer: (answer: RTCSessionDescriptionInit): void => {
    const peer = WebRTCService.getPeer();

    peer.setRemoteDescription(answer);
  },

  handleICECandidates: (candidate: RTCIceCandidateInit): void => {
    const peer = WebRTCService.getPeer();
    const iceCandidate = new RTCIceCandidate(candidate);

    peer.addIceCandidate(iceCandidate);
  },

  handlePeerJoined: (payload: { id: string; role: string }): void => {
    const peerId = payload.id;
    const peer = WebRTCService.createNewWebRTCClient();

    peer.onicecandidate = WebRTCEventsHandler.handleICECandidateEvent;
    peer.onconnectionstatechange =
      WebRTCEventsHandler.handleConnectionStateChange;

    if (payload.role === 'peer') {
      // This means the other user is peer and this is creator
      const dataChannel = peer.createDataChannel('dataChannel');

      WebRTCService.setDataChannel(dataChannel);

      // Create offer
      peer.createOffer().then((offer) => {
        peer.setLocalDescription(offer).then(() => {
          SocketService.sendPayload('offer', { target: peerId, offer });
        });
      });
    }

    WebRTCService.setPeer(peer);
    WebRTCService.setPeerId(peerId);
  },
};

export { SocketEventHandler };

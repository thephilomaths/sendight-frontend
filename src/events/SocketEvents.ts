import { META_DATA_CHANNEL_LABEL } from '../constants/WebRTC';
import { SocketHandler } from '../handlers/SocketHandler';
import { WebRTCHandler } from '../handlers/WebRTCHandler';
import { WebRTCEventsHandler } from './WebRTCEvents';

const SocketEventHandler = {
  handleOffer: (offer: RTCSessionDescriptionInit): void => {
    const { webRTCConnection, peerId } = WebRTCHandler;

    webRTCConnection.ondatachannel = WebRTCEventsHandler.handleDataChannelEvent;

    webRTCConnection
      .setRemoteDescription(offer)
      .then(() => {
        return webRTCConnection.createAnswer();
      })
      .then((answer) => {
        webRTCConnection.setLocalDescription(answer).then(() => {
          SocketHandler.sendPayload('answer', { target: peerId, answer });
        });
      });
  },

  handleAnswer: (answer: RTCSessionDescriptionInit): void => {
    const { webRTCConnection } = WebRTCHandler;

    webRTCConnection.setRemoteDescription(answer);
  },

  handleICECandidates: (candidate: RTCIceCandidateInit): void => {
    const { webRTCConnection } = WebRTCHandler;
    const iceCandidate = new RTCIceCandidate(candidate);

    webRTCConnection.addIceCandidate(iceCandidate);
  },

  handlePeerJoined: async (payload: { id: string; role: string }): Promise<void> => {
    const peerId = payload.id;

    WebRTCHandler.peerId = peerId;

    WebRTCHandler.createWebRTCClient();

    if (payload.role === 'peer') {
      // This means the other user is peer and current user is creator

      // Create first metaData channel
      WebRTCHandler.createMetaDataChannel();

      // Create offer
      const offer = await WebRTCHandler.createOffer();

      SocketHandler.sendPayload('offer', { target: peerId, offer });
    }
  },
};

export { SocketEventHandler };

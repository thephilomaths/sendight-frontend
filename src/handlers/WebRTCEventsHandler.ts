import { SocketService } from '../services/SocketService';
import { WebRTCService } from '../services/WebRTCService';

const WebRTCEventsHandler = {
  handleICECandidateEvent: (event: RTCPeerConnectionIceEvent): void => {
    const { candidate } = event;

    if (candidate) {
      const peerId = WebRTCService.getPeerId();

      SocketService.sendPayload('ice-candidate', { target: peerId, candidate });
    }
  },

  handleDataChannelEvent: (event: RTCDataChannelEvent): void => {
    const dataChannel = event.channel;

    WebRTCService.setDataChannel(dataChannel);
  },

  handleConnectionStateChange: (): void => {
    const peer = WebRTCService.getPeer();

    switch (peer.connectionState) {
      case 'connected':
        console.log('WebRTC connection created');
        break;
      case 'disconnected':
        console.log('WebRTC connection disconnected');
        break;
      case 'failed':
        console.log('Failed to create WebRTC connection');
        break;
      case 'closed':
        console.log('Closed WebRTC connection');
        break;
      default:
        break;
    }
  },
};

export { WebRTCEventsHandler };

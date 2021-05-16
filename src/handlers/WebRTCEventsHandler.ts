import {SocketService} from '../services/SocketService';
import {WebRTCService} from '../services/WebRTCService';

const WebRTCEventsHandler = {
  handleICECandidateEvent: (event: RTCPeerConnectionIceEvent): void => {
    const { candidate } = event;

    if (candidate) {
      const { peerId }= WebRTCService;
      SocketService.sendPayload('ice-candidate', { target: peerId, candidate });
    }
  },

  handleDataChannelEvent: (event: RTCDataChannelEvent): void => {
    const { label } = event.channel;
    const { channel } = event;

    if (label.startsWith('file')) {
      const fileUUID: string = label.split('-')[1];
      const fileName: string = WebRTCService.fileToMetadataMap[fileUUID].name
      const fileBuffer: Array<ArrayBuffer> = [];
      channel.onmessage = (e) => {
        fileBuffer.push(e.data);
      }
      const a = document.createElement('a');
      const blob = new Blob(fileBuffer);
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      a.remove();
    } else if (label === 'metaDataChannel') {
      channel.onmessage = (e) => {
        WebRTCService.fileToMetadataMap = JSON.parse(e.data);
      }
    }
  },

  handleConnectionStateChange: (): void => {
    const { webRTCConnection } = WebRTCService;

    switch (webRTCConnection.connectionState) {
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

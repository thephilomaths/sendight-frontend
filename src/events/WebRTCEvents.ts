import { END_OF_FILE_MESSAGE, META_DATA_CHANNEL_LABEL } from '../constants/WebRTC';
import { SocketHandler } from '../handlers/SocketHandler';
import { WebRTCHandler } from '../handlers/WebRTCHandler';

const fileBuffer: Array<ArrayBuffer> = [];

const WebRTCEventsHandler = {
  handleICECandidateEvent: (event: RTCPeerConnectionIceEvent): void => {
    const { candidate } = event;

    if (candidate) {
      const { peerId } = WebRTCHandler;
      SocketHandler.sendPayload('ice-candidate', { target: peerId, candidate });
    }
  },

  handleDataChannelEvent: (event: RTCDataChannelEvent): void => {
    const {
      channel,
      channel: { label },
    } = event;

    WebRTCHandler.addDataChannel(label, channel);
    console.log('label', label);

    if (label.startsWith('file')) {
      channel.binaryType = 'arraybuffer';

      const fileUUID: string = label.split('-')[1];
      // const fileName: string = WebRTCHandler.fileToMetadataMap[fileUUID].name;
      const fileName = 'asdasdadadsasdasd.mp4';

      channel.onmessage = async (e) => {
        const { data } = e;

        if (data !== END_OF_FILE_MESSAGE) {
          fileBuffer.push(data);
        } else {
          console.log('END OF FILE');

          const a = document.createElement('a');
          const blob = new Blob(fileBuffer);

          a.href = window.URL.createObjectURL(blob);
          a.download = fileName;
          a.click();
          a.remove();

          channel.close();
        }
      };
    } else if (label === META_DATA_CHANNEL_LABEL) {
      channel.onmessage = (e) => {
        WebRTCHandler.fileToMetadataMap = JSON.parse(e.data);
        console.log(e.data);
      };
    }

    console.log('FUNCTION EXECUTED');
  },

  handleConnectionStateChange: (): void => {
    const { webRTCConnection } = WebRTCHandler;

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

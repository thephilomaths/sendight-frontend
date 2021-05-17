import { v4 as uuidv4 } from 'uuid';
import { webRTCConnectionInfo } from '../config';
import { WebRTCEventsHandler } from '../handlers/WebRTCEventsHandler';

interface ICreateDataChannelParams {
  label: string;
  onOpenHandler?: (event: Event | RTCDataChannelEvent) => void;
  onMessageHandler?: (event: Event | RTCDataChannelEvent) => void;
}

class WebRTCServiceClass {
  webRTCConnection: RTCPeerConnection;
  peerId: string;
  dataChannel: RTCDataChannel;
  fileToMetadataMap: { [key: string]: Record<string, string> };

  createDataChannel = ({
    label,
    onOpenHandler,
    onMessageHandler,
  }: ICreateDataChannelParams): void => {
    this.webRTCConnection.onicecandidate =
      WebRTCEventsHandler.handleICECandidateEvent;
    this.webRTCConnection.onconnectionstatechange =
      WebRTCEventsHandler.handleConnectionStateChange;

    this.dataChannel = this.webRTCConnection.createDataChannel(label);

    if (onOpenHandler) {
      this.dataChannel.onopen = onOpenHandler;
    }

    if (onMessageHandler) {
      this.dataChannel.onmessage = onMessageHandler;
    }
  };

  createNewWebRTCClient = (): RTCPeerConnection => {
    this.webRTCConnection = new RTCPeerConnection(webRTCConnectionInfo);
    return this.webRTCConnection;
  };

  closeWebRTCClient = (): void => {
    if (this.webRTCConnection.connectionState !== 'closed') {
      this.webRTCConnection.close();
    }
  };

  sendMetadata = (files: File[]): void => {
    const metadata = files.reduce(
      (
        accumulator: { [key: string]: Record<string, string | number> },
        file
      ) => {
        const uuid = uuidv4();
        const { name, type, size } = file;

        accumulator[uuid] = { name, type, size };

        return accumulator;
      },
      {}
    );

    this.createDataChannel({ label: 'metadataChannel' });

    this.dataChannel.send(JSON.stringify(metadata));
  };

  sendFile = (file: File, label: string): void => {
    this.createDataChannel({ label });
  };
}

export const WebRTCService = new WebRTCServiceClass();

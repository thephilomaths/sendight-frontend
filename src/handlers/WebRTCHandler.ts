import { webRTCConnectionInfo } from '../config';
import { END_OF_FILE_MESSAGE, MAXIMUM_MESSAGE_SIZE, META_DATA_CHANNEL_LABEL } from '../constants/WebRTC';
import { WebRTCEventsHandler } from '../events/WebRTCEvents';

interface ICreateDataChannelParams {
  label: string;
  onOpenHandler?: (event: Event | RTCDataChannelEvent) => void;
  onMessageHandler?: (event: Event | RTCDataChannelEvent) => void;
}

class WebRTC {
  webRTCConnection: RTCPeerConnection;
  peerId: string;
  dataChannelsMap: { [key: string]: RTCDataChannel } = {};
  fileToMetadataMap: { [key: string]: Record<string, string> };

  private createDataChannel = ({ label, onOpenHandler, onMessageHandler }: ICreateDataChannelParams): void => {
    this.dataChannelsMap[label] = this.webRTCConnection.createDataChannel(label);

    if (onOpenHandler) {
      this.dataChannelsMap[label].onopen = onOpenHandler;
    }

    if (onMessageHandler) {
      this.dataChannelsMap[label].onmessage = onMessageHandler;
    }
  };

  createWebRTCClient = () => {
    this.webRTCConnection = new RTCPeerConnection(webRTCConnectionInfo);

    this.webRTCConnection.onicecandidate = WebRTCEventsHandler.handleICECandidateEvent;
    this.webRTCConnection.onconnectionstatechange = WebRTCEventsHandler.handleConnectionStateChange;
  };

  createOffer = async () => {
    const offer = await this.webRTCConnection.createOffer();

    await this.webRTCConnection.setLocalDescription(offer);

    return offer;
  };

  closeWebRTCClient = (): void => {
    if (this.webRTCConnection.connectionState !== 'closed') {
      this.webRTCConnection.close();
    }
  };

  addDataChannel = (label: string, channel: RTCDataChannel) => {
    this.dataChannelsMap[label] = channel;
  };

  createMetaDataChannel = () => {
    this.createDataChannel({ label: META_DATA_CHANNEL_LABEL });

    this.dataChannelsMap[META_DATA_CHANNEL_LABEL].onmessage = (e) => {
      this.fileToMetadataMap = JSON.parse(e.data);
      console.log(e.data);
    };
  };

  sendMetadata = (filesObject: { [key: string]: File }): void => {
    const metadata = Object.keys(filesObject).reduce(
      (accumulator: { [key: string]: Record<string, string | number> }, fileHash) => {
        const { name, type, size } = filesObject[fileHash];

        accumulator[fileHash] = { name, type, size };

        return accumulator;
      },
      {}
    );

    this.dataChannelsMap[META_DATA_CHANNEL_LABEL].send(JSON.stringify(metadata));
  };

  sendFiles = (filesObject: { [key: string]: File }): void => {
    Object.keys(filesObject).forEach((fileHash) => {
      const label = `file-${fileHash}`;
      const file = filesObject[fileHash];

      const handleDataChannelOpen = async () => {
        // const arrayBuffer = await file.arrayBuffer();
        const channel = this.dataChannelsMap[label];

        const chunkSize = 16384;
        let count = 0;

        const fileReader = new FileReader();
        fileReader.addEventListener('error', (error) => {
          // return console.error('Error reading file:', error);
        });
        fileReader.addEventListener('abort', (event) => {
          // return console.log('File reading aborted:', event);
        });

        let offset = 0;

        const readSlice = (o: number) => {
          // console.log('readSlice ', o);
          const slice = file.slice(offset, o + chunkSize);
          fileReader.readAsArrayBuffer(slice);
        };

        fileReader.addEventListener('load', (e: any) => {
          // console.log('FileRead.onload ', e);
          channel.send(e.target.result);
          offset += e.target.result.byteLength;
          // console.log(offset);
          count += 1;

          if (count % 100 === 0) {
            console.log(count);
          }

          if (offset < file.size) {
            readSlice(offset);
          } else {
            channel.send('EOF');
          }
        });

        readSlice(0);

        // let x = 0;
        // for (let i = 0; i < arrayBuffer.byteLength; i += MAXIMUM_MESSAGE_SIZE) {
        //   setTimeout(() => {
        //     console.log('chunk sent', arrayBuffer.slice(i, i + MAXIMUM_MESSAGE_SIZE));

        //     channel.send(arrayBuffer.slice(i, i + MAXIMUM_MESSAGE_SIZE));
        //   }, 50 * x);
        //   x += 1;
        // }

        // setTimeout(() => {
        //   channel.send(END_OF_FILE_MESSAGE);
        // }, x * 50);
      };

      this.createDataChannel({ label, onOpenHandler: handleDataChannelOpen });

      this.dataChannelsMap[label].binaryType = 'arraybuffer';
    });
  };
}

export const WebRTCHandler = new WebRTC();

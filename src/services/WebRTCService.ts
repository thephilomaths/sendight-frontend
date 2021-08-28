/* eslint-disable no-console */
import { webRTCConnectionInfo } from '../config';
import { END_OF_FILE_MESSAGE, META_DATA_CHANNEL_LABEL } from '../constants/WebRTC';

interface ICreateDataChannelParams {
  label: string;
  onOpenHandler?: (event: Event | RTCDataChannelEvent) => void;
  onMessageHandler?: (event: Event | RTCDataChannelEvent) => void;
}

export class WebRTCService {
    webRTCConnection: RTCPeerConnection;
    peerId: string;

    dataChannelMap: { [key: string]: RTCDataChannel };

    fileToMetadataMap: { [key: string]: Record<string, string> };
    fileBuffer: ArrayBuffer[];

    createConnection = (): void => {
        this.webRTCConnection = new RTCPeerConnection();
    }

    createDataChannels = (labels: string[]): void => {
        labels.forEach((label) => {
            this.dataChannelMap[label] = this.webRTCConnection.createDataChannel(label);
        });
    }

    createOffer = (): void => {
        this.webRTCConnection.createOffer().then((offer) => {
            this.webRTCConnection.setLocalDescription(offer);
        }).then(() => {
            console.log('Offer set successfully');
        });
    }

    handleOnOpenEvent = (label: string): void => {
        this.dataChannelMap[label].onopen = () => {
            return console.log(`${label} opened`)
        };
    }

    handleOnMessageEvent = (): void => {
        // TODO: Implement
    }

    handleOnDataChannelEvents = (labels: string[]): void => {
        labels.forEach((label) => {
            this.webRTCConnection.ondatachannel = (ev: RTCDataChannelEvent) => {
                this.dataChannelMap[label] = ev.channel;
            }
        });
    }

    handleOnIceCandidateEvent = (): void => {
        this.webRTCConnection.onicecandidate = () => {
            console.log('New Ice Candidate');
        }
    }
}

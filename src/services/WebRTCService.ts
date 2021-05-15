import { webRTCConnectionInfo } from '../config';

let peer: RTCPeerConnection;
let dataChannel: RTCDataChannel;
let peerId: string;

const WebRTCService = {
  createNewWebRTCClient: (): RTCPeerConnection => {
    return new RTCPeerConnection(webRTCConnectionInfo);
  },

  getPeer: (): RTCPeerConnection => {
    return peer;
  },

  setPeer: (peerConnection: RTCPeerConnection): void => {
    peer = peerConnection;
  },

  getPeerId: (): string => {
    return peerId;
  },

  setPeerId: (id: string): void => {
    peerId = id;
  },

  getDataChannel: (): RTCDataChannel => {
    return dataChannel;
  },

  setDataChannel: (channel: RTCDataChannel): void => {
    dataChannel = channel;
  },
};

export { WebRTCService };

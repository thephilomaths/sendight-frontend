import { action, makeAutoObservable } from 'mobx';
import { WebRTCConnectionStatus } from '../types/WebRTC';

interface IFileHashToMetadataMap {
  [fileHash: string]: File
}

interface IFilesProgress {
  [fileHash: string]: number;
}

interface IFileHashToDataMap {
  [fileHash: string]: Array<ArrayBuffer>;
}

class DataStore {
  peerConnectionStatus = false;
  webRTCConnectionStatus: WebRTCConnectionStatus = WebRTCConnectionStatus.DISCONNECTED;
  fileHashToMetadataMap: IFileHashToMetadataMap = {};
  fileHashToDataMap: IFileHashToDataMap = {}
  filesSendProgress: IFilesProgress = {};
  filesReceiveProgress: IFilesProgress = {};
  isSending = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setFileHashToMetadataMap = (fileHashToMetadataMap: IFileHashToMetadataMap) => {
    this.fileHashToMetadataMap = fileHashToMetadataMap;
  }

  @action
  setFileSendProgress = (fileHash: string, progress: number) => {
    this.filesSendProgress[fileHash] = progress;
  }

  @action
  setFileReceiveProgress = (fileHash: string, progress: number) => {
    this.filesReceiveProgress[fileHash] = progress;
  }

  @action
  addFileData = (fileHash: string, buffer: ArrayBuffer) => {
    if (!this.fileHashToDataMap[fileHash]) {
      this.fileHashToDataMap[fileHash] = [];
    }
    this.fileHashToDataMap[fileHash].push(buffer);
  }

  @action
  clearFileData = (fileHash: string) => {
    this.fileHashToDataMap[fileHash] = [];
  }

  @action
  setPeerConnectionStatus = (peerConnectionStatus: boolean) => {
    this.peerConnectionStatus = peerConnectionStatus;
  }

  @action
  setWebRTCConnectionStatus = (webRTCConnectionStatus: WebRTCConnectionStatus) => {
    this.webRTCConnectionStatus = webRTCConnectionStatus;
    // eslint-disable-next-line no-console
    console.log('Connection status: ', webRTCConnectionStatus);
  }

  @action
  clearFilesData = () => {
    this.fileHashToMetadataMap = {};
    this.fileHashToDataMap = {};
    this.filesReceiveProgress = {};
    this.filesSendProgress = {};
  }

  @action
  setIsSending = (isSending: boolean) => {
    this.isSending = isSending;
  }
}

export default new DataStore();

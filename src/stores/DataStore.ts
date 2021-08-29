import { action, observable, makeAutoObservable } from 'mobx';
import {WebRTCConnectionStatus} from '../types/WebRTC';

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
  filesSendProgress: IFilesProgress = {};
  filesReceiveProgress: IFilesProgress = {};
  fileHashToDataMap: IFileHashToDataMap = {}

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
  setFileData = (fileHash: string, buffer: ArrayBuffer) => {
    if (!this.fileHashToDataMap[fileHash]) {
      this.fileHashToDataMap[fileHash] = [];
    }
    this.fileHashToDataMap[fileHash].push(buffer);
  }

  @action
  setPeerConnectionStatus = (peerConnectionStatus: boolean) => {
    this.peerConnectionStatus = peerConnectionStatus;
  }

  @action
  setWebRTCConnectionStatus = (webRTCConnectionStatus: WebRTCConnectionStatus) => {
    this.webRTCConnectionStatus = webRTCConnectionStatus;
    console.log('Connection status: ', webRTCConnectionStatus);
  }
}

export default new DataStore();

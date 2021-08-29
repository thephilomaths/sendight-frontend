import { action, observable } from 'mobx';

interface IFileHashToMetadataMap {
  [fileHash: string]: Record<string, string>
}

interface IFilesProgress {
  [fileHash: string]: number;
}

interface IFileHashToDataMap {
  [fileHash: string]: Array<ArrayBuffer>;
}

class DataStore {
  @observable fileHashToMetadataMap: IFileHashToMetadataMap = {};
  @observable filesSendProgress: IFilesProgress = {};
  @observable filesReceiveProgress: IFilesProgress = {};
  @observable fileHashToDataMap: IFileHashToDataMap = {}

  @action
  setFileHashToMetadataMap = (fileHashToMetadataMap: IFileHashToMetadataMap) => {
    this.fileHashToMetadataMap = fileHashToMetadataMap;
    console.log('Metadata', fileHashToMetadataMap);
  }

  @action
  setFileSendProgress = (fileHash: string, progress: number) => {
    this.filesSendProgress[fileHash] = progress;
    console.log('Send progress', this.filesSendProgress)
  }

  @action
  setFileReceiveProgress = (fileHash: string, progress: number) => {
    this.filesReceiveProgress[fileHash] = progress;
    console.log('Receive progress', this.filesReceiveProgress);
  }

  @action
  setFileData = (fileHash: string, buffer: ArrayBuffer) => {
    if (!this.fileHashToDataMap[fileHash]) {
      this.fileHashToDataMap[fileHash] = [];
    }
    this.fileHashToDataMap[fileHash].push(buffer);

    console.log('Received data', buffer);
  }
}

export default new DataStore();
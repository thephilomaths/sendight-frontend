import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import DataStore from '../../../stores/DataStore';
import { Button } from '../../Button';
import FileItem from './FileItem';

const Wrapper = styled.div`
  width: 100%;
`;

const FilesWrapper = styled.div`
  box-sizing: border-box;
  height: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  margin-bottom: 24px;
  background-color: #000000;
  
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    background-color: #646464;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #1e1e1e;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }
  ::-webkit-resizer {
    background-color: #666;
  }
`;

const FileItemWrapper = styled.div`
  margin-bottom: 8px;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FileReceiver = () => {
  const handleCancelDownload = (fileHash: string) => {
    console.log(fileHash);
  };

  const handleDownload = (fileHash: string): void => {
    const a = document.createElement('a');
    const blob = new Blob(DataStore.fileHashToDataMap[fileHash]);

    a.href = window.URL.createObjectURL(blob);
    a.download = DataStore.fileHashToMetadataMap[fileHash].name;
    a.click();
    a.remove();
  };

  const handleClearDownloads = () => {
    DataStore.clearFilesData();
  };

  const getFilesData = () => {
    return Object.keys(DataStore.fileHashToMetadataMap).map((fileHash) => {
      const file = DataStore.fileHashToMetadataMap[fileHash];
      const receiveProgress = DataStore.filesReceiveProgress[fileHash];

      return (
        <FileItemWrapper key={fileHash}>
          <FileItem
            file={file}
            progress={receiveProgress}
            fileHash={fileHash}
            enableDownload={receiveProgress >= file.size}
            onDownload={() => {
              return handleDownload(fileHash);
            }}
          />
        </FileItemWrapper>
      );
    });
  };

  return (
    <Wrapper>
      <FilesWrapper>{getFilesData()}</FilesWrapper>
      <Button onClick={handleClearDownloads}>Clear Downloads</Button>
    </Wrapper>
  );
};

export default observer(FileReceiver);

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
  height: 100%;
  min-height: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border-radius: 8px;
  border: 2px solid rgba(74, 74, 79, 1);
  margin-bottom: 24px;
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

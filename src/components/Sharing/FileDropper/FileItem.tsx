import React from 'react';
import styled from 'styled-components';
import FileIcon from '@material-ui/icons/Description';
import RemoveIcon from '@material-ui/icons/HighlightOff';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

import { Text } from '../../Text';
import { FileDropperUtil } from '../../../utils/FileDropper';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(12, 12, 13, 1);
  border: 1px solid rgba(42, 42, 46, 1);
  border-radius: 5px;
  padding: 16px;
`;

const FileIconWrapper = styled.div`
  margin-right: 12px;
`;

const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  padding: unset;
  margin-left: 12px;
  cursor: pointer;

  &:hover {
    color: #e91e63;
    transition: 0.3s;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const Progress = styled.progress`
  height: 4px;
  border: none;
  color: #e91e63;
  border-radius: 16px;
  margin-right: 8px;

  &::-webkit-progress-value {
    background: #e91e63;
    border-radius: 16px;
  }

  &::-webkit-progress-value {
    background: #e91e63;
    border-radius: 16px;
  }

  &::-moz-progress-bar {
    background: #ffe3ec;
    border-radius: 16px;
  }

  &::-webkit-progress-bar {
    background: #ffe3ec;
    border-radius: 16px;
  }
`;

const FileIconStyles = {
  color: '#fff',
};

const IconStyles = {
  color: '#fff',
};

interface IProps {
  file: File;
  fileHash: string;
  progress?: number;
  enableDownload?: boolean;
  onRemove?: (fileToRemoveHash: string) => void;
  onDownload?: (fileToDownloadHash: string) => void;
}

const FileItem = (props: IProps): React.ReactElement => {
  const { file, fileHash, progress, enableDownload, onRemove, onDownload } = props;

  return (
    <Wrapper>
      <FileIconWrapper>
        <FileIcon style={FileIconStyles} />
      </FileIconWrapper>
      <FileDetails>
        <Text content={file.name} maxWidth="275px" fontWeight="bolder" title={file.name} truncate />
        <ProgressContainer>
          {progress ? (
            <>
              <Progress value={progress} max={file.size} />
              <Text content={FileDropperUtil.formatBytes(progress)} fontSize="12px" /> &nbsp;/&nbsp;
            </>
          ): ''}
          <Text content={FileDropperUtil.formatBytes(file.size)} fontSize="12px" fontWeight="700" />
        </ProgressContainer>
      </FileDetails>
      {
        onRemove && (
          <ActionButton
            type="button"
            onClick={() => {
              return onRemove(fileHash);
            }}
          >
            <RemoveIcon style={IconStyles} />
          </ActionButton>
        )
      }

      {
        onDownload && enableDownload && (
          <ActionButton
            type="button"
            onClick={() => {
              return onDownload(fileHash);
            }}
          >
            <GetAppRoundedIcon style={IconStyles} />
          </ActionButton>
        )
      }
    </Wrapper>
  );
};

FileItem.defaultProps = {
  progress: null,
  onRemove: null,
  onDownload: null,
  enableDownload: false,
};

export default FileItem;

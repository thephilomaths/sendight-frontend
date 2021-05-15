import React from 'react';
import styled from 'styled-components';
import FileIcon from '@material-ui/icons/Description';
import RemoveIcon from '@material-ui/icons/HighlightOff';

import { Text } from '../../Text';
import { FileDropperUtil } from '../../../utils/FileDropper';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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

const RemoveButton = styled.button`
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

const FileIconStyles = {
  color: '#fff',
};

const RemoveIconStyles = {
  color: '#fff',
};

interface IProps {
  file: File;
  onRemove: (fileToRemove: File) => void;
}

const FileItem = (props: IProps): React.ReactElement => {
  const { file, onRemove } = props;

  return (
    <Wrapper>
      <FileIconWrapper>
        <FileIcon style={FileIconStyles} />
      </FileIconWrapper>
      <FileDetails>
        <Text
          content={file.name}
          maxWidth="275px"
          fontWeight="bolder"
          title={file.name}
          truncate
        />
        <Text
          content={FileDropperUtil.formatBytes(file.size)}
          fontSize="12px"
        />
      </FileDetails>
      <RemoveButton
        type="button"
        onClick={() => {
          return onRemove(file);
        }}
      >
        <RemoveIcon style={RemoveIconStyles} />
      </RemoveButton>
    </Wrapper>
  );
};

export { FileItem };

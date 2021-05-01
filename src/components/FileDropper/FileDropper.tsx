import React, { useRef } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { Button } from '../Button';
import { Text } from '../Text';

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 2px dashed rgba(74, 74, 79, 1);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 24px;
  transition: 0.3s;

  &:hover {
    background-color: #111111;
    transition: 0.3s;
  }
`;

const InfoText = styled.div`
  margin: 24px 0 8px;
`;

const InfoSubText = styled.div`
  margin-bottom: 40px;
`;

const NoteText = styled.div`
  margin: 24px 48px;
  text-align: center;
  opacity: 0.7;
`;

const File = styled.input`
  display: none;
`;

const iconStyles = {
  color: '#E91E63',
  'font-size': '48px',
};

const FileDropper = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Wrapper onClick={onClickHandler}>
      <File type="file" ref={fileInputRef} />
      <AddCircleOutlineIcon style={iconStyles} />
      <InfoText>
        <Text
          content="Drag and drop files"
          fontSize="18px"
          fontWeight="800"
          letterSpacing="1px"
        />
      </InfoText>
      <InfoSubText>
        <Text content="or click to send files" />
      </InfoSubText>
      <Button>Select files to upload</Button>
      <NoteText>
        <Text
          content="Make sure you trust your recipient when sharing sensitive data."
          fontSize="14px"
        />
      </NoteText>
    </Wrapper>
  );
};

export { FileDropper };

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { Button } from '../../Button';
import { Text } from '../../Text';
import { FileDropperUtil } from '../../../utils/FileDropper';
import { FileItem } from './FileItem';
import { WebRTCService } from '../../../services/WebRTCService';

const Wrapper = styled.div<{ isDragging: boolean; containItems: boolean }>`
  box-sizing: border-box;
  height: 100%;
  min-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.3s;

  ${({ isDragging, containItems }) => {
    return containItems
      ? `
          padding: 0;
          border: none;
          justify-content: space-between;
          align-items: flex-start;
        `
      : `
          border: 2px ${
            isDragging ? 'solid #E91E63' : 'dashed rgba(74, 74, 79, 1)'
          };
          padding: 24px;

          &:hover {
            background-color: #111111;
            transition: 0.3s;
          }
        `;
  }}
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

const DroppedFilesWrapper = styled.div`
  width: 100%;
  background-color: #000;
  padding: 32px;
  border-radius: 5px;
  border: 1px solid rgba(12, 12, 13, 1);
  height: 380px;
  max-height: 380px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-button {
    background-color: #666;
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
  ::-webkit-scrollbar-corner {
    background-color: #646464;
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

const AddMoreAndSizeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  width: 100%;
`;

const AddMoreSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconStyles = {
  color: '#E91E63',
  fontSize: '48px',
};

const FileDropper = (): React.ReactElement => {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<Array<File>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  /**
   * Function to handle the file input selection
   */
  const onAddClickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Function to handle file input when user tries to select files
   * from native file select dialog box
   *
   * @param e - React change event
   */
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    if (files) {
      setDroppedFiles((oldFiles) => {
        return FileDropperUtil.getUniqueFiles(oldFiles, files);
      });
    }
  };

  /**
   * Function to handle drag
   *
   * @param e - React drag event
   */
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Function to handle when drag mouse enters the file dropper area
   *
   * @param e - React drag event
   */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedItems = e.dataTransfer.items || [];

    dragCounter.current += 1;

    if (draggedItems.length && !isDragging) {
      setIsDragging(true);
    }
  };

  /**
   * Function to handle when drag mouse leaves the file dropper area
   *
   * @param e - React drag event
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current -= 1;

    if (!dragCounter.current) {
      setIsDragging(false);
    }
  };

  /**
   * Function to handle when drag mouse drop the files in the file dropper area
   *
   * @param e - React drag event
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
    dragCounter.current = 0;

    const draggedFiles = e.dataTransfer.files;

    if (draggedFiles) {
      setDroppedFiles((oldFiles) => {
        return FileDropperUtil.getUniqueFiles(oldFiles, draggedFiles);
      });

      e.dataTransfer.clearData();
    }
  };

  /**
   * Function to handle file remove from file dropper area
   *
   * @param fileToRemove
   */
  const handleFileRemove = (fileToRemove: File) => {
    setDroppedFiles((allFiles) => {
      return allFiles.filter((file) => {
        return !FileDropperUtil.isEqual(fileToRemove, file);
      });
    });
  };

  return (
    <Wrapper
      onClick={() => {
        if (!droppedFiles.length) onAddClickHandler();
      }}
      onDragOver={handleDrag}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      isDragging={isDragging}
      containItems={!!droppedFiles.length}
    >
      <File
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        multiple
      />
      {droppedFiles.length > 0 ? (
        <>
          <DroppedFilesWrapper>
            {droppedFiles.map((file) => {
              return (
                <FileItemWrapper>
                  <FileItem file={file} onRemove={handleFileRemove} />
                </FileItemWrapper>
              );
            })}
          </DroppedFilesWrapper>
          <AddMoreAndSizeWrapper>
            <AddMoreSection onClick={onAddClickHandler}>
              <AddCircleOutlineIcon />
              &nbsp;
              <Text content="Click here to add more" />
            </AddMoreSection>
            <Text
              content={FileDropperUtil.formatBytes(
                FileDropperUtil.getAllFilesSize(droppedFiles)
              )}
              fontWeight="bold"
              fontSize="14px"
            />
          </AddMoreAndSizeWrapper>
          <Button width="100%" onClick={() => {
            WebRTCService.sendMetadata(droppedFiles);
          }}>Send</Button>
        </>
      ) : (
        <>
          <AddCircleOutlineIcon style={IconStyles} />
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
          <Button>Select files to send</Button>
          <NoteText>
            <Text
              content="Make sure you trust your recipient when sharing sensitive data."
              fontSize="14px"
            />
          </NoteText>
        </>
      )}
    </Wrapper>
  );
};

export { FileDropper };

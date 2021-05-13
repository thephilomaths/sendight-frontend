import React from 'react';
import styled from 'styled-components';

import { Text } from '../../Text';
import { Button } from '../../Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
`;

interface IProps {
  content: string | undefined;
  roomSlug: string | null;
  handleRetry: (roomSlug: string) => void;
  handleCreateNewRoom: () => void;
}

const ErrorState = (props: IProps): React.ReactElement => {
  const { content, roomSlug, handleRetry, handleCreateNewRoom } = props;

  return (
    <Wrapper>
      <ContentWrapper>
        <Text fontSize="20px" color="#eee" content={content || ''} />
      </ContentWrapper>
      <ButtonWrapper>
        {roomSlug && (
          <>
            <Button
              onClick={() => {
                return handleRetry(roomSlug);
              }}
            >
              Retry joining room
            </Button>
            &nbsp;&nbsp;&nbsp;
          </>
        )}

        <Button onClick={handleCreateNewRoom}>
          {roomSlug ? 'Create new room' : 'Retry creating new room'}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export { ErrorState };

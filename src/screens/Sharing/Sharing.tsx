import React from 'react';
import styled from 'styled-components';

import { FileDropper } from '../../components/FileDropper';
import { Text } from '../../components/Text';
import SendIllustration from '../../assets/illustrations/send.svg';

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 500px;
  width: 1024px;
  padding: 32px;
  border: 1px solid rgba(42, 42, 46, 1);
  background-color: rgba(12, 12, 13, 1);
  border-radius: 10px;
`;

const ActionWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const FileDropperWrapper = styled.div`
  margin-right: 48px;
  width: 45%;
`;

const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.div`
  margin-bottom: 16px;
`;

const Illustration = styled.img`
  margin-top: 32px;
  height: 250px;
`;

const Sharing = () => {
  return (
    <Wrapper>
      <Container>
        <ActionWrapper>
          <FileDropperWrapper>
            <FileDropper />
          </FileDropperWrapper>
          <Content>
            <Heading>
              <Text
                content="Simple, P2P file sharing"
                fontSize="32px"
                fontWeight="800"
              />
            </Heading>
            <Text
              content="Sendight lets you share files in peer-to-peer way via webRTC. So you can keep what you share private and make sure your stuff doesn’t stay online forever."
              lineHeight="24px"
            />
            <Illustration src={SendIllustration} />
          </Content>
        </ActionWrapper>
      </Container>
    </Wrapper>
  );
};

export { Sharing };

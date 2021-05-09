import React from 'react';
import styled from 'styled-components';

import { FileDropper } from '../../components/FileDropper';
import { Text } from '../../components/Text';
import SendIllustration from '../../assets/illustrations/send.svg';

const Wrapper = styled.div`
  display: flex;
  height: 90%;

  @media screen and (min-width: 960px) {
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  height: fit-content;
  width: 1024px;
  padding: 32px;
  border: 1px solid rgba(42, 42, 46, 1);
  background-color: rgba(12, 12, 13, 1);
  border-radius: 10px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const FileDropperWrapper = styled.div`
  margin: 0 0 48px 0;

  @media screen and (min-width: 960px) {
    margin: 0 48px 0 0;
    width: 45%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 960px) {
    width: 50%;
  }
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

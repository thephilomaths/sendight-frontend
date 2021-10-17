import React from 'react';
import styled from 'styled-components';

import SendIcon from '@material-ui/icons/Send';
import { Text } from '../Text';
import GithubLogo from '../../assets/icons/github.png';

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: black;
  height: 80px;
  width: 100%;
  padding: 16px 48px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const SendightLogoContainer = styled.a`
  text-decoration: none;
  color: white;
`;

const GithubLogoContainer = styled.a``;

const Title = styled.span`
  font-size: 32px;
  font-weight: 400;
  margin-left: 6px;
`;

const Navbar = (): React.ReactElement => {
  return (
    <Wrapper>
      <SendightLogoContainer href="/">
        <SendIcon
          style={{
            color: '#E91E63',
            fontSize: '32px',
            transform: 'rotate(-45deg)',
          }}
        />
        <Title>
          <Text content="Send" fontSize="32px" fontWeight="800" />
          ight
        </Title>
      </SendightLogoContainer>

      <GithubLogoContainer
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/thephilomaths/sendight-frontend"
      >
        <img src={GithubLogo} alt="Github icon" width="32px" />
      </GithubLogoContainer>
    </Wrapper>
  );
};

export { Navbar };

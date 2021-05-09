import React from 'react';
import styled from 'styled-components';

import SendIcon from '@material-ui/icons/Send';
import { Text } from '../Text';

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: black;
  height: 80px;
  width: 100%;
  padding: 16px 48px;
  display: flex;
  align-items: baseline;
`;

const Title = styled.span`
  font-size: 32px;
  font-weight: 400;
  margin-left: 6px;
`;

const Navbar = (): React.ReactElement => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export { Navbar };

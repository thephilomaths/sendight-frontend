import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  background-color: #e91e63;
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: #ad1457;
  }
`;

interface IProps {
  children: string;
}

const Button = (props: IProps) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export { Button };

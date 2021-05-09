import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  textAlign?: string;
}

const Wrapper = styled.div<ButtonProps>`
  color: white;
  background-color: #e91e63;
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  width: ${({ width }) => {
    return width;
  }};
  text-align: ${({ textAlign }) => {
    return textAlign;
  }};

  &:hover {
    background-color: #ad1457;
  }
`;

interface IProps extends ButtonProps {
  children: string;
}

const Button = (props: IProps): React.ReactElement => {
  const { children, width, textAlign } = props;

  return (
    <Wrapper width={width} textAlign={textAlign}>
      {children}
    </Wrapper>
  );
};

Button.defaultProps = {
  width: 'unset',
  textAlign: 'center',
};

export { Button };

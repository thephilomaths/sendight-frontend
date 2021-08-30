import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  textAlign?: string;
  isDisabled?: boolean;
}

const Wrapper = styled.div<ButtonProps>`
  color: white;
  background-color: #e91e63;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 700;
  width: ${({ width }) => {
    return width;
  }};
  text-align: ${({ textAlign }) => {
    return textAlign;
  }};
  opacity: ${({isDisabled}) => {
    return isDisabled ? 0.5 : 1;
  }};
  cursor: ${({isDisabled}) => {
    return isDisabled ? 'not-allowed' : 'pointer';
  }};

  &:hover {
    background-color: #ad1457;
  }
`;

interface IProps extends ButtonProps {
  children: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Button = (props: IProps): React.ReactElement => {
  const { children, width, textAlign, isDisabled, onClick } = props;

  return (
    <Wrapper width={width} textAlign={textAlign} onClick={isDisabled ? undefined : onClick}>
      {children}
    </Wrapper>
  );
};

Button.defaultProps = {
  width: 'unset',
  textAlign: 'center',
  isDisabled: false,
  onClick: null,
};

export { Button };

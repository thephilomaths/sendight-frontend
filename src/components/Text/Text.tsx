import React from 'react';
import styled from 'styled-components';

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
}

const getTextStyles = (styles: TextProps) => {
  const { fontSize, fontWeight, lineHeight, letterSpacing, color } = styles;

  return `
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    color: ${color};
    letter-spacing: ${letterSpacing};
  `;
};

const Wrapper = styled.span<TextProps>`
  ${(props) => {
    return getTextStyles(props);
  }}
`;

interface IProps extends TextProps {
  content: string;
}

const Text = (props: IProps) => {
  const {
    content,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color,
  } = props;

  return (
    <Wrapper
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      color={color}
    >
      {content}
    </Wrapper>
  );
};

Text.defaultProps = {
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.5',
  letterSpacing: 'initial',
  color: 'white',
};

export { Text };

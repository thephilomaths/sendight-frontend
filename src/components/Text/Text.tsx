import React from 'react';
import styled from 'styled-components';

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  maxWidth?: string;
  color?: string;
  truncate?: boolean;
}

const getTextStyles = (styles: TextProps) => {
  const {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color,
    truncate,
    maxWidth,
  } = styles;

  return `
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    color: ${color};
    letter-spacing: ${letterSpacing};
    max-width: ${maxWidth};

    ${
      truncate &&
      `
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `
    }
  `;
};

const Wrapper = styled.span<TextProps>`
  ${(props) => {
    return getTextStyles(props);
  }}
`;

interface IProps extends TextProps {
  content: string;
  title?: string;
}

const Text = (props: IProps): React.ReactElement => {
  const {
    content,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color,
    truncate,
    title,
    maxWidth,
  } = props;

  return (
    <Wrapper
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      color={color}
      truncate={truncate}
      title={title}
      maxWidth={maxWidth}
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
  truncate: false,
  title: '',
  maxWidth: 'unset',
};

export { Text };

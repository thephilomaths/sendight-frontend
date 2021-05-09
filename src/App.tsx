import React from 'react';
import styled from 'styled-components';

import { Sharing } from './screens/Sharing';
import { Navbar } from './components/Navbar';

const Wrapper = styled.div`
  height: 100%;
`;

const App = (): React.ReactElement => {
  return (
    <Wrapper>
      <Navbar />
      <Sharing />
    </Wrapper>
  );
};

export default App;

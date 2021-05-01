import React from 'react';
import styled from 'styled-components';

import { Sharing } from './screens/Sharing';
import { Navbar } from './components/Navbar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Sharing />
    </Wrapper>
  );
};

export default App;

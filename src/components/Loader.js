import styled from 'styled-components';
import React from 'react';

const Text = styled.span`
  text-align: center;
  display: block;
  color: black;t
`;

function Loader() {
    return (
      <Text>
        Loading
      </Text>
    );
  }
  
  export default Loader;
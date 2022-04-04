import styled from 'styled-components';
import React from 'react';



function BtnFavorites() {
    return (
        <button onClick={() => setOn(!on)}>{on ? "ON" : "OFF"}</button>
    );
  }
  
  export default BtnFavorites;
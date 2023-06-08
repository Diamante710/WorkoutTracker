import React from 'react';
import {css} from '@emotion/react';

const headerStyle = css`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
`;


const Header = () => {
  return (
    <header css={headerStyle}>
      <h1 Heading>Workout Tracker</h1>
    </header>
  );
};

export default Header;
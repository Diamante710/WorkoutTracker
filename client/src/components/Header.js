import React from 'react';
import {css} from '@emotion/css';

const headerStyle = css`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
`;


const Header = () => {
  return (
    <header className={headerStyle}>
      <h1>Workout Tracker</h1>
    </header>
  );
};

export default Header;
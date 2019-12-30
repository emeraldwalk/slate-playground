import React from 'react';
import githubImg from '../GitHub-Mark-32px.png'

export interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => (
  <h1>
    <span>SlateJS Playground</span>
    <span>0.4x</span>
    <a href="../5">0.5x</a>
    <a
      href="https://github.com/emeraldwalk/slate-playground"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        alt="Github Repo"
        src={githubImg}
      />
    </a>
    <a
      href="https://docs.slatejs.org/v/v0.47/"
      rel="noopener noreferrer"
      target="_blank"
      title="SlateJS 0.4x docs"
    >SlateJS
    </a>
  </h1>
);

export default Header;
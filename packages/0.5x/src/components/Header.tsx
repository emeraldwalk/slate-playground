import React from 'react'
import githubImg from '../GitHub-Mark-32px.png'

export interface HeaderProps {
  el: React.ElementType,
}

const Header: React.FC<HeaderProps> = ({ el: El }) => (
  <El className="c_header">
    <span>SlateJS Playground</span>
    <a href="../4">0.4x</a>
    <span>0.5x</span>
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
      href="https://docs.slatejs.org/"
      rel="noopener noreferrer"
      target="_blank"
      title="SlateJS 0.x docs"
    >SlateJS
    </a>
  </El>
)

export default Header
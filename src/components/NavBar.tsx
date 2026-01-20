import React from 'react';
import Icon from './Icon';
import './NavBar.sass';
import logo from '../assets/logo.png';

interface NavBarProps {
  name?: string;
}

const NavBar: React.FC<NavBarProps> = ({ name }) => {
  return (
    <nav>
      <img className="logo" src={logo} alt="Logo" />
      <ul className="menu">
        {name && <li className="item user"><a href="#">{name}</a></li>}
        <li className="item icon">
          <a href="#" aria-label="Settings" title="Settings">
            <Icon symbol="gear" />
          </a>
        </li>
        <li className="item icon">
          <a href="#" aria-label="Log out" title="Log out">
            <Icon symbol="power" />
          </a>
        </li>
        <li className="item icon">
          <a
            href="https://github.com/LucienLee/vue-data-grid"
            aria-label="View source on GitHub"
            title="View source on GitHub"
          >
            <Icon symbol="github" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

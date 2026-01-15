import React from 'react';
import Icon from './Icon';
import './DgCellMenu.sass';

const DgCellMenu: React.FC = () => {
  const items = [
    {
      symbol: 'compare',
      label: 'Compare with',
      class: 'icon--compare'
    }, {
      symbol: 'edit',
      label: 'Edit'
    }, {
      symbol: 'revision',
      label: 'View Revisions'
    }
  ];

  return (
    <div className="dg-cell-menu">
      <ul className="panel">
        {items.map((item, index) => (
          <li className="item" key={index}>
            <a className="button" href="#">
              <span className={`icon ${item.class || ''}`}>
                <Icon symbol={item.symbol} />
              </span>
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DgCellMenu;

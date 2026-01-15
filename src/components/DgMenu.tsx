import React from 'react';
import RoundCheckBox from './RoundCheckBox';
import { capitalize } from 'utils/filters';
import './DgMenu.sass';

interface DgMenuProps {
  position: { x: number; y: number };
  options: Record<string, boolean>;
  escaped?: string[];
  onChange: (key: string, value: boolean) => void;
}

const DgMenu: React.FC<DgMenuProps> = ({ position, options, escaped, onChange }) => {
  const posStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`
  };

  const shouldBeEscaped = (option: string) => {
    return escaped ? escaped.includes(option) : false;
  };

  return (
    <div className="dg-menu" style={posStyle}>
      <div className="panel">
        {Object.keys(options).map((key) => (
          !shouldBeEscaped(key) && (
            <div className="option" key={key}>
              <RoundCheckBox
                label={capitalize(key)}
                value={options[key]}
                isBlock={true}
                onChange={(val) => onChange(key, val)}
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default DgMenu;

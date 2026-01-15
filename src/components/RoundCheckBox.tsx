import React from 'react';
import classNames from 'classnames';
import './RoundCheckBox.sass';

interface RoundCheckBoxProps {
  value: boolean;
  label: string;
  isBlock?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
  // Support both onChange (standard) and onInput (if preferred) but standardized to onChange
}

const RoundCheckBox: React.FC<RoundCheckBoxProps> = ({ value, label, isBlock, className, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={classNames('roundCheckBox', { 'roundCheckBox--block': isBlock }, className)}>
      <input type="checkbox" checked={value} onChange={handleChange} />
      <span className={classNames('roundBox', { 'roundBox--checked': value })}></span>
      <span className="label">{label}</span>
    </label>
  );
};

export default RoundCheckBox;

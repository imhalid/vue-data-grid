import React from 'react';
import './Icon.sass';

interface IconProps {
  symbol: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ symbol, className }) => {
  const iconClass = className ? `icon-${symbol} ${className}` : `icon-${symbol}`;
  return (
    <svg className={`Icon ${iconClass}`} aria-hidden="true">
      <use xlinkHref={`#${symbol}`} />
    </svg>
  );
};

export default Icon;

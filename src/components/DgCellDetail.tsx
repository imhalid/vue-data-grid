import React from 'react';
import './DgCellDetail.sass';

interface DgCellDetailProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const DgCellDetail: React.FC<DgCellDetailProps> = ({ children, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In Vue .self modifier checks if event.target is the element itself.
    // Here we check if the clicked element is the panel itself.
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  };

  return (
    <div className="dg-cell-detail">
      <div className="panel" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};

export default DgCellDetail;

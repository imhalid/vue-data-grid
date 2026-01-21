import React, { useState } from 'react';
import RoundCheckBox from './RoundCheckBox';
import MultiRangeSlider from './MultiRangeSlider';
import Icon from './Icon';
import classNames from 'classnames';
import './DgFilter.sass';

interface DgFilterProps {
  isActive: boolean;
  bound: [number, number];
  range: [number, number];
  onChange: (isActive: boolean) => void;
  onSort: (order: number) => void;
  onRange: (range: [number, number]) => void;
}

const DgFilter: React.FC<DgFilterProps> = ({ isActive, bound, range, onChange, onSort, onRange }) => {
  const [sort, setSort] = useState<{ ascending: boolean; descending: boolean }>({
    ascending: false,
    descending: false
  });

  const onActive = () => {
    onChange(!isActive);
  };

  const onSortCheck = (key: 'ascending' | 'descending', value: boolean) => {
    let order = 0;
    const newSort = { ...sort, [key]: value };

    if (value) {
      // uncheck others
      for (const prop in newSort) {
        if (prop !== key) {
          (newSort as any)[prop] = false;
        }
      }
    }

    setSort(newSort);

    if (newSort.ascending) {
      order = 1;
    } else if (newSort.descending) {
      order = -1;
    }
    onSort(order);
  };

  return (
    <div className={classNames('filter', { 'filter--active': isActive })}>
      <img className="square" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
      <button
        type="button"
        className="button"
        onClick={onActive}
        aria-label="Filter"
        aria-pressed={isActive}
      >
        <Icon symbol="filter" className="icon--filter" />
      </button>
      {isActive && (
        <div className="panel">
          <div className="control">
            <p className="control-label">SORT</p>
            <RoundCheckBox
              className="sortOption"
              label="ascending"
              value={sort.ascending}
              isBlock={false}
              onChange={(val) => onSortCheck('ascending', val)}
            />
            <RoundCheckBox
              className="sortOption"
              label="descending"
              value={sort.descending}
              isBlock={false}
              onChange={(val) => onSortCheck('descending', val)}
            />
          </div>
          <div className="control">
            <p className="control-label">LIMIT RANGE</p>
            <MultiRangeSlider
              min={bound[0]}
              max={bound[1]}
              value={range}
              onChange={onRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DgFilter;

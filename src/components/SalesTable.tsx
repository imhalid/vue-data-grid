import React, { useState, useMemo, useRef } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { gsap } from 'gsap';
import { records as initialRecords } from '../data.json';
import settings from '../tableSettings';
import { toCurrency, toMMMMYYYY, capitalize, toGMapQuery, toUpperMagnitude } from 'utils/filters';
import { normPagePosInEvent } from 'utils/mouse';
import DgMenu from './DgMenu';
import DgCellMenu from './DgCellMenu';
import DgCellDetail from './DgCellDetail';
import DgFilter from './DgFilter';
import classNames from 'classnames';
import './SalesTable.sass';
import Table, { Column } from './Table';

interface RecordData {
  uid: number;
  customer: string;
  company: string;
  contact: string;
  address: string;
  revenue: number;
  VAT: number;
  totalPrice: number;
  status: string;
  date: string;
  [key: string]: any;
}

const SalesTable: React.FC = () => {
  // Initial Data
  const [records] = useState<RecordData[]>(initialRecords);

  // Settings State
  const [attributes, setAttributes] = useState(settings.attributes);
  const expandables = settings.expandables;
  const interactables = settings.interactables;
  const currencies = settings.currencies;
  const hasDetails = settings.hasDetails;
  const filterables = settings.filterables;
  const omitOnMenu = settings.omitOnMenu;

  // Interaction State
  const [sortAttribute, setSortAttribute] = useState('');
  const [sortOrders, setSortOrders] = useState<Record<string, number>>(() => {
    const orders: Record<string, number> = {};
    settings.filterables.forEach(attr => orders[attr] = 0);
    return orders;
  });

  const [filterBounds] = useState<Record<string, [number, number]>>(() => {
    const bounds: Record<string, [number, number]> = {};
    const records = initialRecords as unknown as RecordData[];
    settings.filterables.forEach(attribute => {
      bounds[attribute] = [0, toUpperMagnitude(records.reduce((acc, cur) => {
        return cur[attribute] > acc ? cur[attribute] : acc;
      }, 0))];
    });
    return bounds;
  });

  const [filterRanges, setFilterRanges] = useState<Record<string, [number, number]>>(() => {
    const ranges: Record<string, [number, number]> = {};
    settings.filterables.forEach(attribute => {
      ranges[attribute] = _.clone(filterBounds[attribute]);
    });
    return ranges;
  });

  const [activefilterables, setActiveFilterables] = useState<Record<string, boolean>>(() => {
    const active: Record<string, boolean> = {};
    settings.filterables.forEach(attribute => active[attribute] = false);
    return active;
  });

  const [expanding, setExpanding] = useState('');
  const [focusCell, setFocusCell] = useState({
    recordId: '' as number | string,
    attribute: ''
  });

  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  // Refs for animation
  const lastExpanded = useRef<gsap.core.Tween | null>(null);
  const headerRefs = useRef<Record<string, HTMLTableHeaderCellElement | null>>({});

  // Computed
  const sortedRecords = useMemo(() => {
    const order = sortAttribute ? sortOrders[sortAttribute] || 0 : 0;

    const filteredRecords = records.filter((record) => {
      return Object.keys(filterRanges).reduce((acc, key) => {
        return acc && filterRanges[key][0] <= record[key] && filterRanges[key][1] >= record[key];
      }, true);
    });

    if (sortAttribute) {
      return filteredRecords.slice().sort((a, b) => {
        const aSort = a[sortAttribute];
        const bSort = b[sortAttribute];
        const localOrder = (aSort === bSort ? 0 : aSort > bSort ? 1 : -1) * order;
        const aDate = moment(a.date.replace(/(-\d+)$/, ''));
        const bDate = moment(b.date.replace(/(-\d+)$/, ''));

        if (aDate.isSame(bDate)) return localOrder;
        return aDate.isBefore(bDate) ? -1 : 1;
      });
    } else {
      return filteredRecords.slice().sort((a, b) => {
        return moment(a.date).isBefore(b.date) ? -1 : 1;
      });
    }
  }, [records, sortAttribute, sortOrders, filterRanges]);

  const filteredAttributes = useMemo(() => {
    return Object.keys(attributes).filter((el) => attributes[el]);
  }, [attributes]);

  const numOfDateGroup = useMemo(() => {
    const dates = sortedRecords.map(el => el.date);
    return _.countBy(dates, (date) => toMMMMYYYY(date));
  }, [sortedRecords]);

  const maxLenOfCols = useMemo(() => {
    return records.reduce((acc, record) => {
      Object.keys(record).forEach((prop) => {
        const val = String(record[prop]);
        if (!acc[prop] || acc[prop] < val.length) {
          acc[prop] = val.length;
        }
      });
      return acc;
    }, {} as Record<string, number>);
  }, [records]);

  // Methods
  const isCurrency = (str: string) => currencies.includes(str);

  const isfirstOfDateGroup = (index: number) => {
    return index === 0
      ? true
      : toMMMMYYYY(sortedRecords[index].date) !== toMMMMYYYY(sortedRecords[index - 1].date);
  };

  const getHeightStyleByDate = (date: string) => {
    return {
      height: `calc(${numOfDateGroup[toMMMMYYYY(date)] * 100}% + 1px)`
    };
  };

  const getAddressLink = (text: string) => toGMapQuery(text);

  const headerClass = (attribute: string) => {
    return [
      `header--${attribute}`,
      { 'header--expandable': expanding !== attribute && expandables.includes(attribute) }
    ];
  };

  const cellClass = (attribute: string, recordId: number) => {
    return [
      `cell--${attribute}`,
      { 'cell--focus': (interactables.includes(attribute) || hasDetails.includes(attribute)) &&
          focusCell.recordId === recordId && focusCell.attribute === attribute }
    ];
  };

  const clearFocusCell = () => {
    setFocusCell({ recordId: '', attribute: '' });
  };

  const closeFilterMenu = () => {
    setActiveFilterables(prev => {
      const next = { ...prev };
      for (let attribute in next) next[attribute] = false;
      return next;
    });
  };

  const expandCol = (attribute: string, event: React.MouseEvent | React.SyntheticEvent) => {
    if (showMenu) return;
    const target = event.target as HTMLElement;
    const isClickedHeader = target.classList.contains('header');
    const isClickedSame = expanding === attribute;
    const isExpandables = expandables.includes(attribute);

    if ((isClickedSame && isClickedHeader) || !isExpandables) {
      setExpanding('');
      if (lastExpanded.current) lastExpanded.current.reverse();
    }

    if (isExpandables && !isClickedSame) {
      setExpanding(attribute);
      if (lastExpanded.current) lastExpanded.current.reverse();

      const col = headerRefs.current[attribute];
      if (col) {
        const targetWidth = (maxLenOfCols[attribute] || 0) / 2 + 1;
        lastExpanded.current = gsap.to(col, {
            duration: 0.2,
            width: `${targetWidth}em`,
            ease: "none"
        });
      }
    }
  };

  const onHeaderClick = (attribute: string, event: React.MouseEvent) => {
    clearFocusCell();
    closeFilterMenu();
    expandCol(attribute, event);
  };

  const onCellClick = (attribute: string, id: number, event: React.MouseEvent) => {
    closeFilterMenu();
    if (expandables.includes(attribute) && expanding !== attribute) {
      return onHeaderClick(attribute, event);
    }
    if (focusCell.recordId === id && focusCell.attribute === attribute) {
      return clearFocusCell();
    }
    setFocusCell({ recordId: id, attribute });
    expandCol(attribute, event);
  };

  const onSort = (attribute: string, order: number) => {
    setSortAttribute(order ? attribute : '');
    setSortOrders(prev => ({ ...prev, [attribute]: order }));
  };

  const onRange = (attribute: string, range: [number, number]) => {
    setFilterRanges(prev => ({ ...prev, [attribute]: range }));
  };

  const onFilterMenuChange = (attribute: string, active: boolean) => {
    clearFocusCell();
    setActiveFilterables(prev => ({ ...prev, [attribute]: active }));
  };

  const openMenu = (event: React.MouseEvent) => {
    const nativeEvent = event.nativeEvent || event;
    const normalizedEvent = normPagePosInEvent(nativeEvent);
    const rect = document.querySelector('.dg-table')?.getBoundingClientRect();

    if (rect) {
        const OFFSET = 1;
        setMenuPos({
            x: normalizedEvent.pageX - rect.left + OFFSET,
            y: normalizedEvent.pageY - rect.top + OFFSET
        });
    }

    clearFocusCell();
    closeFilterMenu();
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const columns = useMemo(() => {
    const cols: Column<RecordData>[] = [];

    // Date Column (Generic implementation of the specific date group)
    cols.push({
      key: 'date',
      title: '', // No header title
      headerClassName: 'header--date',
      className: (row, index) => classNames('cell--placeholder', { 'is-visible': isfirstOfDateGroup(index) }),
      render: (val, row) => (
         <span className="cell-content forgedCell" style={getHeightStyleByDate(row.date)}>
           {toMMMMYYYY(row.date)}
         </span>
      )
    });

    // Dynamic Attributes
    filteredAttributes.forEach(attribute => {
        cols.push({
            key: attribute,
            title: capitalize(attribute),
            headerClassName: classNames(headerClass(attribute)),
            headerRender: (col) => (
                <>
                {capitalize(attribute)}
                {filterables.includes(attribute) && (
                   <DgFilter
                      isActive={activefilterables[attribute]}
                      bound={filterBounds[attribute]}
                      range={filterRanges[attribute]}
                      onChange={(val) => onFilterMenuChange(attribute, val)}
                      onSort={(order) => onSort(attribute, order)}
                      onRange={(range) => onRange(attribute, range)}
                   />
                )}
                </>
            ),
            className: (row) => classNames(cellClass(attribute, row.uid)),
            onHeaderClick: (e) => {
                if (e.target === e.currentTarget) onHeaderClick(attribute, e);
            },
            onHeaderContextMenu: (e) => {
                e.preventDefault();
                openMenu(e);
            },
            onCellClick: (e, row) => onCellClick(attribute, row.uid, e),
            render: (val, row) => (
                <>
                    {interactables.includes(attribute) && focusCell.recordId === row.uid && focusCell.attribute === attribute && (
                        <DgCellMenu />
                    )}
                    {hasDetails.includes(attribute) && focusCell.recordId === row.uid && focusCell.attribute === attribute && (
                        <DgCellDetail onClick={clearFocusCell}>
                           <p>{val}</p>
                           <a href={getAddressLink(val)} target="_blank" rel="noreferrer">View in Google Maps</a>
                        </DgCellDetail>
                    )}
                    <span className="cell-content">
                        {isCurrency(attribute) ? toCurrency(val) : val}
                    </span>
                </>
            )
        });
    });

    return cols;
  }, [filteredAttributes, activefilterables, filterBounds, filterRanges, focusCell, expanding, sortedRecords, numOfDateGroup, interactables, hasDetails, expandables, sortOrders]);

  return (
    <div className="dg-table sales-table">
        <Table
            data={sortedRecords}
            columns={columns}
            rowKey={(row) => row.uid}
            onTableClick={closeMenu}
            getHeaderRef={(key, el) => { headerRefs.current[key] = el; }}
        />
      {showMenu && (
        <DgMenu
           position={menuPos}
           options={attributes}
           escaped={omitOnMenu}
           onChange={(key, val) => {
             setAttributes(prev => ({...prev, [key]: val}));
           }}
        />
      )}
    </div>
  );
};

export default SalesTable;

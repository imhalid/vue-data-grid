import React from 'react';
import classNames from 'classnames';

export interface Column<T> {
  key: string;
  title?: React.ReactNode;
  width?: string | number;
  className?: string | ((row: T, rowIndex: number) => string);
  headerClassName?: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  headerRender?: (column: Column<T>) => React.ReactNode;
  onHeaderClick?: (event: React.MouseEvent, column: Column<T>) => void;
  onHeaderContextMenu?: (event: React.MouseEvent, column: Column<T>) => void;
  onCellClick?: (event: React.MouseEvent, row: T, column: Column<T>) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  className?: string;
  onTableClick?: (event: React.MouseEvent) => void;
  getHeaderRef?: (key: string, element: HTMLTableHeaderCellElement | null) => void;
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  className,
  onTableClick,
  getHeaderRef,
  isLoading,
  emptyMessage = "No data available"
}: TableProps<T>) => {
  if (isLoading) {
    return <div className={classNames(className, "table-loading")}>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={classNames(className, "table-empty")}>{emptyMessage}</div>;
  }

  return (
    <div className={className}>
      <table className="table" onClick={onTableClick}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || index}
                className={classNames('header', col.headerClassName)}
                style={col.width ? { width: col.width } : undefined}
                onClick={(e) => col.onHeaderClick?.(e, col)}
                onContextMenu={(e) => col.onHeaderContextMenu?.(e, col)}
                ref={getHeaderRef ? (el) => getHeaderRef(col.key, el) : undefined}
              >
                {col.headerRender ? col.headerRender(col) : col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowKey(row)}>
              {columns.map((col, colIndex) => {
                const value = row[col.key];
                const cellClass = typeof col.className === 'function'
                  ? col.className(row, rowIndex)
                  : col.className;

                return (
                  <td
                    key={col.key || colIndex}
                    className={classNames('cell', cellClass)}
                    onClick={(e) => col.onCellClick?.(e, row, col)}
                  >
                    {col.render ? col.render(value, row, rowIndex) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

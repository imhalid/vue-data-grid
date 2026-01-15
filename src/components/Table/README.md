# Table Component

A generic, reusable table component for React.

## Purpose

The `Table` component provides a flexible way to render tabular data. It supports:
- Custom rendering for headers and cells.
- Click handling for rows, cells, and headers.
- Custom styling hooks.
- Ref forwarding for advanced interactions (e.g., animations).

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `data` | `T[]` | Yes | Array of data records. |
| `columns` | `Column<T>[]` | Yes | Array of column definitions. |
| `rowKey` | `(row: T) => string \| number` | Yes | Function to generate unique key for each row. |
| `className` | `string` | No | CSS class for the wrapper div. |
| `onTableClick` | `(event: MouseEvent) => void` | No | Click handler for the table element. |
| `getHeaderRef` | `(key: string, el: HTMLElement) => void` | No | Callback to get ref of header cells. |
| `isLoading` | `boolean` | No | Shows loading state if true. |
| `emptyMessage` | `ReactNode` | No | Content to show when data is empty. |

## Column Definition

```typescript
interface Column<T> {
  key: string;            // Unique key for the column
  title?: ReactNode;      // Header title
  width?: string | number;// Column width
  className?: string | ((row: T, index: number) => string); // Cell class
  headerClassName?: string; // Header class
  render?: (val: any, row: T, index: number) => ReactNode; // Custom cell render
  headerRender?: (column: Column<T>) => ReactNode; // Custom header render
  onHeaderClick?: (e: MouseEvent, column: Column<T>) => void;
  onCellClick?: (e: MouseEvent, row: T, column: Column<T>) => void;
}
```

## Usage Example

```tsx
import Table from 'components/Table';

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role', render: (val) => <strong>{val}</strong> }
];

const data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
];

<Table
  data={data}
  columns={columns}
  rowKey={(row) => row.id}
/>
```

## Design Constraints

- The Table is a presentational component. Sorting, filtering, and pagination logic should be handled by the parent component.
- Layout relies on standard HTML `table` elements.

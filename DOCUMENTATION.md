# Project Documentation

This document explains the core features and configuration of the Vue Data Grid project.

## How to Make Expandable Column

The project supports expandable columns where the column width adjusts to fit the content when clicked. This is handled dynamically based on the data and configuration.

### Configuration
To make a column expandable:
1. Open `src/tableSettings.js`.
2. Locate the `expandables` array.
3. Add the attribute name (key from your data) to this array.

**Example:**
```javascript
// src/tableSettings.js
export default {
  // ...
  expandables: ['company', 'contact', 'address'], // 'company' column will be expandable
  // ...
}
```

### Implementation Details
The logic resides in `src/components/DgTable.vue`:
- **`maxLenOfCols` computed property**: Calculates the maximum length of the content for each attribute across all records. This determines the target width for expansion.
- **`expandCol` method**: Triggered when a header or cell is clicked.
  - It checks if the attribute is in the `expandables` list.
  - It uses `TweenMax` (from `gsap`) to animate the column width to the calculated target width (`maxLenOfCols`).
- **`headerClass`**: Adds the `header--expandable` class to the column header if it is in the `expandables` list, showing a visual indicator (an arrow).

## How to Handle Data

The data flow works by importing a JSON file and configuring how it is displayed via settings.

### Data Source
- The raw data is located in `src/data.json`.
- It is a JSON object with a `records` array containing the data entries.
- Each record must have a unique `uid` and a `date` field (used for grouping), along with other attributes.

**Example Data Structure:**
```json
{
  "records": [
    {
      "uid": 1,
      "customer": "IBBP Apps",
      "company": "H&R Real Inc.",
      "revenue": 90277.76,
      "date": "2014-03-07"
      // ... other fields
    }
  ]
}
```

### Configuration (`src/tableSettings.js`)
This file controls the behavior of the data columns:
- **`attributes`**: Key-value pairs defining which columns are initially visible.
- **`interactables`**: Columns that trigger a menu on click.
- **`currencies`**: Columns that should be formatted as currency.
- **`hasDetails`**: Columns that show extra details (e.g., Google Maps link) when clicked.
- **`filterables`**: Columns that can be filtered.

### Processing
In `src/components/DgTable.vue`:
1. **Importing**: Data is imported directly from `../data.json`.
2. **Sorting and Filtering**: The `sortedRecords` computed property filters the records based on user input (ranges) and sorts them.
3. **Grouping**: Records are effectively grouped by date. The implementation checks if a record is the first of its date group (`isfirstOfDateGroup`) to render the date cell appropriately.

## Usage Packages

The project relies on the following key libraries:

- **[Vue.js](https://vuejs.org/)**: The core framework used for the application.
- **[GSAP](https://greensock.com/gsap/)**: Used for high-performance animations, specifically for the column expansion effect (`TweenMax`).
- **[Lodash](https://lodash.com/)**: A utility library used for data manipulation (e.g., `_.clone`, `_.countBy`).
- **[Moment.js](https://momentjs.com/)**: Used for parsing, validating, manipulating, and formatting dates.
- **[Normalize.css](https://necolas.github.io/normalize.css/)**: A modern, HTML5-ready alternative to CSS resets.

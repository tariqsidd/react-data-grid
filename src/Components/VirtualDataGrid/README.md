# Virual Data Grid

The Virtual Data Grid is a React component designed to efficiently display large datasets in a table-like structure with virtualization support. It is highly customizable and includes various features to enhance user interaction with the data.

The component supports in-grid editing with various field types such as textfield, numberfield, datefield, and selectfield. It also includes drag and drop functionality, error fields, seamless error traversal across the grid, row deletion, and the ability to export data to CSV.

The header and data format needs to follow a coherent pattern.

## Usage

import VirtualDataGrid from 'virtual-data-grid';

// ...

```
const MyDataGrid = () => {
  const DataGridOptions = {
    deleteRow: true,
    editing: true,
    showErrors: true,
    showErrorAlert: true,
    showExportButton: true,
    showSubmitButton: true,
    showProceedButton: true,
    showSkipButton: true,
  };
  const itemHeightConstant = 40; // Set your desired item height
  const incomingData = []; // Provide your data array
  const incomingTableOptions = DataGridOptions; // Choose from available options
  const tableHeaders = []; // Define the headers for your data
  const buffer = 5;
  const numberOfRows = 6;

  const onSubmit = () => {
    // Define behavior on submit
  };

  const onProceedAnyway = () => {
    // Define behavior on proceed
  };

  const onSkip = () => {
    // Define behavior on skip
  };

  const callExportCSV = false;

  const onDataChange = () => {
    // Callback Function invoked when data changes
  };

  const containerHeight = null; // Set a fixed container height if needed

  return (
    <VirtualDataGrid
      itemHeight={itemHeightConstant}
      incomingData={incomingData}
      incomingTableOptions={incomingTableOptions}
      tableHeaders={tableHeaders}
      buffer={buffer}
      numberOfRows={numberOfRows}
      onSubmit={onSubmit}
      onProceedAnyway={onProceedAnyway}
      onSkip={onSkip}
      callExportCSV={callExportCSV}
      onDataChange={onDataChange}
      containerHeight={containerHeight}
    />
  );
};

export default MyDataGrid;
```

## Props

- itemHeight: The constant height of each item in the grid.
- incomingData: The array of data to be displayed.
- incomingTableOptions: Options for customizing the behavior of the data grid (See DataGridOptions for available options).
- tableHeaders: An array defining the headers for the data grid.
- buffer: The number of items to render outside the current viewport.
- numberOfRows: The number of rows to display in the grid.
- onSubmit: Callback function triggered on submit action.
- onProceedAnyway: Callback function triggered on proceed action.
- onSkip: Callback function triggered on skip action.
- callExportCSV: Flag to trigger CSV file export functionality.
- onDataChange: Callback function triggered on data change.
- containerHeight: The fixed height of the container, set to null for dynamic height.

## DataGrid Options

The incomingTableOptions prop accepts an object with the following properties:

- deleteRow: Enable/disable the ability to delete rows.
- editing: Enable/disable editing mode for the data.
- showErrors: Display errors in the grid.
- showErrorAlert: Display an alert for errors.
- showExportButton: Show/hide the export to CSV button.
- showSubmitButton: Show/hide the submit button.
- showProceedButton: Show/hide the proceed button.
- showSkipButton: Show/hide the skip button.

## Header

```
tableHeader = [
  {
    headerName: "Name",
    headerFieldName: "name",
    headerCellType: "text",
    headerSchema: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 2, maxLength: 8 },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Date",
    headerFieldName: "date",
    headerCellType: "date",
    headerSchema: {
      type: "object",
      properties: {
        date: { type: "string" },
      },
      required: ["date"],
      additionalProperties: false,
    },
  },
  {
    headerName: "City",
    headerFieldName: "city",
    headerCellType: "select",
    headerOptions: cities,
    headerSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
      additionalProperties: false,
    },
  },
  {
    headerName: "Phone Number",
    headerFieldName: "phoneNo",
    headerCellType: "number",
    headerSchema: {
      type: "object",
      properties: {
        phoneNo: { type: "integer" },
      },
      required: ["phoneNo"],
      additionalProperties: false,
    },
  },
]
```

### Required

- headerName: Name of the column Header
- headerFieldName: Key of that particular field in data
- headerCellType: Type of cell. Anything from this ["text", "date", "select", "number"]

### Optional

- headerSchema: Json Schema to validate the cell value. Make sure properties key matches the headerFieldName
- headerOptions: Options for select dropdown

```
const cities = [
  { label: "New York", value: "New York" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Chicago", value: "Chicago" },
  { label: "San Francisco", value: "San Francisco" },
];
```

## Data

```
const data = [
    {
    name: "Name",
    date: new Date().toLocaleDateString(),
    city: "Los Angeles",
    phoneNo: 1000000,
    error: {
      name: "Error in name",
    },
    indexId: Math.random()
      .toString(36)
      .substring(2, 6 + 2),
  },
  {
    name: "Name 1",
    date: new Date().toLocaleDateString(),
    city: "New Yor",
    phoneNo: 1000000,
    error: {
      name: "Error in city",
    },
    indexId: Math.random()
      .toString(36)
      .substring(2, 6 + 2),
  },

]

```

### Required

- indexId: A random unique id generated to help with virtualisation of big data in the grid

### Optional

- error: This helps to highlight the error in data grid. It will always be an object containing key-value pair with key being headerFieldName and value will be the error message for that particular headerFieldName.

# Material Table

The MaterialTable component is a React-based table implementation that provides a feature-rich and customizable interface for efficiently managing and displaying data. It supports features such as data filtering, selection, custom actions, and more.

## Usage

```
import { MaterialTable } from "@dastgyr1/rc-fe-core";

const MyMaterialTable = () => {
  return (
    <MaterialTable
      data={rows}
      columns={columns}
      cellStyles={{minWidth:'auto', maxWidth: 'auto'}}
      headerCellStyles={{minWidth:'auto', maxWidth: 'auto'}}
      options={{
        selection: true,
        selectionProps: (rowData) => ({
          disabled: rowData.name === 'Alice Johnson',
        }),
        rowsPerPageOptions: [10, 20, 50, 100],
        selectionActions: [
          { icon: <DeleteIcon />, action: () => {} },
          { icon: <GetAppRoundedIcon />, action: () => {} },
        ],
        defaultPageSize: 10,
      }}
      ssf
      onChangeFilter={(qp)=>{
        console.log('qp',qp)
      }}
      isNextPage={false}
      setPage={(page) => {
        console.log('Current Page:', page);
      }}
      onPageSizeChange={(pageSize) => {
        console.log('Page Size:', pageSize);
      }}
      onRowSelection={(rows)=>{
                    console.log('rows',rows)
     }}
    />
  );
};

export default MyMaterialTable;

```

## Props

- **data**: The array of data to be displayed.
- **columns**: An array defining the structure and properties of each column.
- **cellStyles**: To pass styling to all Table Cells.
- **headerCellStyles**: To pass styling to Header Cells.
- **options**: Configuration options for the MaterialTable, including selection, actions, and pagination.
- **setPage**: Callback function triggered when the page changes.
- **onPageSizeChange**: Callback function triggered when the page size changes.
- **ssf**: To enable server-side filtering and prevent in table filtering.
- **onChangeFilter**: Callback function triggered when the filters set and returns the queryParams.
- **isNextPage**: Enable/Disable the next page icon
- **onRowSelection**: Callback function triggered when the rows selected and returns the selected rows.
- **onRowClick**: Callback function triggered when row clicked

### Table Options

These are optional parameters:

- **uniqueIdKey**: Key to identify the presence of unique key present in table.
- **selection**: Enable/Disable selection functionality in table.
- **selectionProps**: Disable selction functionality of particular rows on conditional basis.
- **rowsPerPageOptions**: An array specifying the available options for the number of rows per page. In this case, users can choose from 10, 20, 50, or 100 rows per page.
- **selectionActions**: An array of objects representing actions that can be performed on the selected rows. Each object includes an icon and a corresponding action function.
- **defaultPageSize**: Specifies the default number of rows per page when the table is initially rendered.
- **columnAlign**: To set alligment of entire table data

## Colunms

```
const columns = [
  {
    field: "name",
    header: "Name",
    filterType: "textField",
    width: "400px",
  },
  {
    field: "age",
    header: "Age",
    filterType: "numberField",
  },
  { field: "email", header: "Email" },
  {
    field: "city",
    header: "City",
    filterType: "select",
    options: cities,
    render: (rowData) => (
      <Chip
        label={rowData.city}
        variant="outlined"
        style={{
          color: "#EB6262",
          backgroundColor: "#eb626238",
          fontWeight: "500",
        }}
      />
    ),
  },
  { field: "date", header: "Date", filterType: "dateSelect" },
  {
    header: "Actions",
    render: (rowData) => (
      <IconButton onClick={() => {}}>
        <VisibilityIcon
          style={{
            color: "#ff9800",
          }}
        />
      </IconButton>
    ),
    width: "100px",
  },
]
```

### Required

- **header**: Name of the column Header
- **field**: Key of that particular field in data

### Optional

- **filterType**: Type of filter cell. Anything from this ["textField", "dateSelect", "select", "numberField"]
- **width**: To set fixed width of that column
- **options**: Options for select dropdown
- **render**: To specify how the data in that column should be visually represented or rendered. It allows you to customize the appearance of the data in a particular column by providing a rendering function.

## Data

```
const rows = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    email: "john.doe@example.com",
    city: "New York",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 34,
    email: "jane.smith@example.com",
    city: "New York",
    date: "2023-11-23",
  },
  {
    id: "3",
    name: "Alice Johnson",
    age: 34,
    email: "jane.smith@example.com",
    city: "Los Angeles",
    date: "2023-11-22",
  },
]
```

import React from "react";
import { tableHeader, tableOptions, getUserData } from "./Data";
import { VirtualDataGrid } from "./Components";
import { MaterialTable } from "./Components";

const cities = [
  { label: "New York", value: "New York" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Chicago", value: "Chicago" },
  { label: "San Francisco", value: "San Francisco" },
];

const columns = [
  {
    field: "name",
    header: "Name",
    type: "text",
    filterType: "textField",
  },
  {
    field: "age",
    header: "Age",
    type: "number",
    filterType: "numberField",
  },
  { field: "email", header: "Email" },
  { field: "city", header: "City", filterType: "select", options: cities },
  { field: "date", header: "Date", filterType: "dateSelect" },
  // {
  //   field: "name",
  //   header: "Name",
  //   type: "text",
  //   filterType: "textField",
  // },
  // {
  //   field: "age",
  //   header: "Age",
  //   type: "number",
  //   filterType: "numberField",
  // },
  // { field: "email", header: "Email" },
  // { field: "city", header: "City", filterType: "select", options: cities },
  // { field: "date", header: "Date", filterType: "dateSelect" },
  // {
  //   field: "name",
  //   header: "Name",
  //   type: "text",
  //   filterType: "textField",
  // },
  // {
  //   field: "age",
  //   header: "Age",
  //   type: "number",
  //   filterType: "numberField",
  // },
  // { field: "email", header: "Email" },
  // { field: "city", header: "City", filterType: "select", options: cities },
  // { field: "date", header: "Date", filterType: "dateSelect" },
];
const initialRows = [
  { id: "1", name: "John Doe", age: 28, email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
  { id: "3", name: "Alice Johnson", age: 34, email: "jane.smith@example.com" },
];
const App = () => {
  return (
    <>
      {/* <VirtualDataGrid
        // containerHeight={400}
        buffer={30}
        numberOfRows={50}
        itemHeight={50} // Adjust as needed
        incomingData={getUserData(5000)}
        tableHeaders={tableHeader}
        incomingTableOptions={tableOptions}
        callExportCSV={false}
        onDataChange={(data) => {
          console.log(data);
        }}
      /> */}
      <MaterialTable
        data={initialRows}
        // ssf
        // onChangeFilter={(qp)=>{
        //   console.log('qp',qp)
        // }}
        columns={columns}
        // isNextPage={false}
        options={{
          selection: true,
          selectionProps: (rowData) => ({
            disabled: rowData.name === "Alice Johnson",
          }),
          rowsPerPageOptions: [10, 20, 50, 100],
        }}
        setPage={(page) => {
          console.log("Current Page:", page);
        }}
        onPageSizeChange={(pageSize) => {
          console.log("Page Size:", pageSize);
        }}
      />
    </>
  );
};

export default App;

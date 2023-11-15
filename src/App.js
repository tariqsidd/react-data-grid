import React from "react";
import { tableHeader, tableOptions, getUserData } from "./Data";
import {VirtualDataGrid} from "./Components";

const App = () => {
  return (
    <VirtualDataGrid
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
    />
  );
};

export default App;

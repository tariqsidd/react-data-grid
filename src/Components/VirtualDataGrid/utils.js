export const indexMap = new Map();
let DragStartCellOrdinate = null;
let DragEndCellOrdinate = null;
let columnOrder = [];

export const setColumnOrder = (tableHeaders) => {
  const validHeaders = tableHeaders
    ? tableHeaders.filter(
        (item) =>
          item.headerFieldName !== undefined && item.headerFieldName !== null
      )
    : [];
  columnOrder = validHeaders.map((item) => item.headerFieldName.toString());
};

export const getColumnOrder = () => {
  return columnOrder;
};

export const setStartCellOrdinate = (cellValue, column, key, rowId) => {
  DragStartCellOrdinate = {
    cellValue,
    column,
    key,
    rowId,
  };
};

export const setEndCellOrdinate = (cellValue, key, rowId) => {
  DragEndCellOrdinate = {
    cellValue,
    key,
    rowId,
  };
};

export const getStartCellOrdinate = () => {
  return DragStartCellOrdinate;
};

export const getEndCellOrdinate = () => {
  return DragEndCellOrdinate;
};

export const clearOrdinates = () => {
  DragStartCellOrdinate = null;
  DragEndCellOrdinate = null;
};

// export const convertToHasMap = (data) => {
//   const indexMap = new Map();
//   data.forEach((item, index) => {
//     indexMap.set(item.indexId, index);
//   });
//   return indexMap;
// };

export const findIndexById = (indexId) => {
  return indexMap.has(indexId) ? indexMap.get(indexId) : -1;
};

export const convertToHashMap = (data, chunkSize = 500) => {
  // Function to add items to the map in chunks
  const addToMapInChunks = (startIndex) => {
    for (
      let i = startIndex;
      i < Math.min(startIndex + chunkSize, data.length);
      i++
    ) {
      const item = data[i];
      if (item.indexId) {
        indexMap.set(item.indexId, i);
      }
    }
  };

  // Loop to process the entire dataset in chunks
  for (let i = 0; i < data.length; i += chunkSize) {
    addToMapInChunks(i);
  }
};

export const bulkDeleteFromDataAndHashMap = (data, idsToDelete) => {
  // Filter out the items from the data array
  data = data.filter((item) => !idsToDelete?.includes(item.indexId));
  // Clear the existing hashmap
  indexMap.clear();
  // Rebuild the hashmap with the updated data
  convertToHashMap(data);

  return data;
};

export const errorIdentifier = (data) =>
  data.flatMap((row, rowIndex) =>
    row.error
      ? Object.keys(row.error).map((cellName) => ({
          rowIndex,
          cellName,
          indexId: row.indexId,
        }))
      : []
  );

export const jsonToCSV = (jsonData, tableHeader, columnDelimiter = ',', lineDelimiter = '\n') => {
  let result, ctr;

  if (!jsonData.length) {
    return null;
  }

  // Extracting headerNames for CSV headers
  const headers = tableHeader.map(header => header.headerName);
  result = headers.join(columnDelimiter) + lineDelimiter;

  // Mapping JSON data based on headerFieldNames
  jsonData.forEach(item => {
    ctr = 0;
    tableHeader.forEach(header => {
      if (ctr > 0) result += columnDelimiter;

      result += item[header.headerFieldName] ? item[header.headerFieldName] : '';
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}



export const  downloadCSV = (csvData, filename = 'data.csv')=> {
  let blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  let link = document.createElement("a");

  if (navigator.msSaveBlob) { // For IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    let url = URL.createObjectURL(blob);
    link.href = url;
    link.style.visibility = 'hidden';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


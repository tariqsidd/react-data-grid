import React, { useState, useRef, useCallback, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ErrorAlert from "./ErrorAlert";
import { subscribeToData, unsubscribe } from "./Reactive/subscriber";
import {
  bulkDeleteFromDataAndHashMap,
  convertToHashMap,
  setColumnOrder,
  findIndexById,
  errorIdentifier,
} from "./utils";
import { commonStyles } from "./styles";
import { DataGridOptions, itemHeightConstant } from "./constants";
import { CSVLink } from "react-csv";
import debounce from "lodash.debounce";

const VirtualTable = ({
  itemHeight = itemHeightConstant,
  incomingData = [],
  incomingTableOptions,
  tableHeaders = [],
  buffer = 5,
  numberOfRows = 6,
  onSubmit = () => {},
  onProceedAnyway = () => {},
  onSkip = () => {},
  callExportCSV = false,
  onDataChange,
  containerHeight = null,
}) => {
  const [tableOptions, setTableOptions] = useState({});
  const viewportHeight = numberOfRows * itemHeight;
  const [data, setData] = useState([]);
  const [numVisibleItems, setNumVisibleItems] = useState(
    Math.trunc(viewportHeight / itemHeight)
  );
  const [viewState, setViewState] = useState({
    start: 0,
    end: numVisibleItems,
  });
  const viewPortRef = useRef(null);
  const rowsToDelete = useRef([]);
  const scrollPositionRef = useRef(0);
  const containerStyle = { height: data.length * itemHeight };
  const [error, setError] = useState(false);
  const csvLinkRef = useRef();

  useEffect(() => {
    setData(incomingData);
    convertToHashMap(incomingData);
    setColumnOrder(tableHeaders);
    subscribeToData("rowsToDelete", getRowsToDelete);
    return () => {
      unsubscribe("willRowMutate");
      unsubscribe("rowsToDelete");
      unsubscribe("errorFocusCell");
      unsubscribe("errorFocusCellRef");
    };
  }, []);

  useEffect(() => {
    let options = DataGridOptions;
    let updatedTableOptions = {
      ...options,
      ...incomingTableOptions,
    };
    setTableOptions({
      ...updatedTableOptions,
    });
  }, [incomingTableOptions]);

  const scrollPos = useCallback(() => {
    const currentIndx = Math.trunc(viewPortRef.current.scrollTop / itemHeight);
    const adjustedIndex = Math.max(0, currentIndx - buffer);
    const endIndex = Math.min(
      data.length - 1,
      adjustedIndex + numVisibleItems + buffer
    );

    if (adjustedIndex !== viewState.start || endIndex !== viewState.end) {
      setViewState({ start: adjustedIndex, end: endIndex });
    }
  }, [
    itemHeight,
    numVisibleItems,
    viewState.start,
    viewState.end,
    data.length,
  ]);

  const debounceScrollPos = debounce(scrollPos, 250);

  const scrollToRow = (rowIndex) => {
    const scrollPosition = rowIndex * itemHeight - itemHeight;
    if (viewPortRef.current) {
      viewPortRef.current.scrollTop = scrollPosition;
    }
  };

  const onRowChange = useCallback((updatedRow) => {
    setData((prevData) => {
      const index = findIndexById(updatedRow.indexId, prevData);
      if (index !== -1) {
        return [
          ...prevData.slice(0, index),
          updatedRow,
          ...prevData.slice(index + 1),
        ];
      }
      return prevData;
    });
  }, []);

  const renderRows = useCallback(() => {
    let result = [];
    if (data.length) {
      for (let i = viewState.start; i <= viewState.end; i++) {
        let item = { ...data[i], top: i * itemHeight };
        "indexId" in item &&
          result.push(
            <TableRow
              key={`${item.indexId}-Row`}
              item={item}
              columns={tableHeaders}
              itemHeight={itemHeight}
              onRowChange={onRowChange}
              tableOptions={tableOptions}
            />
          );
      }
      return result;
    }
  }, [viewState.start, viewState.end, itemHeight, data, tableHeaders]);

  useEffect(() => {
    if (scrollPositionRef.current) {
      viewPortRef.current.scrollTop = scrollPositionRef.current;
    }
    return () => {
      scrollPositionRef.current = viewPortRef.current?.scrollTop;
    };
  }, []);

  useEffect(() => {
    setNumVisibleItems(Math.trunc(viewportHeight / itemHeight));
  }, [itemHeight, viewportHeight]);

  const getRowsToDelete = (id) => {
    const index = rowsToDelete.current.indexOf(id);
    if (index === -1) {
      rowsToDelete.current.push(id);
    } else {
      rowsToDelete.current.splice(index, 1);
    }
  };

  useEffect(() => {
    const errors = errorIdentifier(data);
    if (errors.length > 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data]);

  const prepareCSVData = () => {
    const csvData = [];
    const headerRow = tableHeaders.map((header) => header.headerName);
    csvData.push(headerRow);
    data.forEach((row) => {
      const rowData = tableHeaders.map((header) => row[header.headerFieldName]);
      csvData.push(rowData);
    });
    return csvData;
  };

  const cleanData = (data) => {
    const result = data.map(({ selected, top, ...rest }) => rest);
    return result;
  };

  useEffect(() => {
    if (callExportCSV && csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  }, [callExportCSV]);

  useEffect(() => {
    onDataChange(cleanData(data));
  }, [data]);

  const classes = commonStyles();
  return (
    <Box style={scrollBoxStyles.parentContainer}>
      <Box className={classes.buttonContainer}>
        {tableOptions.showSkipButton && error && (
          <Button
            data-testid="skip-button"
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={onSkip}
          >
            Skip These Records
          </Button>
        )}
        {tableOptions.showSubmitButton && (
          <Button
            data-testid="submit-button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
            disabled={error}
          >
            Submit
          </Button>
        )}
        {tableOptions.showProceedButton && (
          <Button
            data-testid="proceed-button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onProceedAnyway}
          >
            Proceed Anyway
          </Button>
        )}
      </Box>
      <Box className={classes.buttonContainer}>
        {rowsToDelete.current.length > 0 && (
          <Button
            data-testid="delete-button"
            variant="contained"
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
            onClick={() => {
              let modifiedData = bulkDeleteFromDataAndHashMap(
                data,
                rowsToDelete.current
              );
              setData(modifiedData);
              rowsToDelete.current = [];
            }}
          >
            Delete
          </Button>
        )}
        {tableOptions.showExportButton && (
          <Button
            data-testid="export-button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              if (csvLinkRef.current) {
                csvLinkRef.current.link.click();
              }
            }}
            startIcon={<GetAppIcon />}
          >
            Export CSV
          </Button>
        )}

        <CSVLink
          data={prepareCSVData()}
          filename="table-data.csv"
          ref={csvLinkRef}
        />
      </Box>
      {tableOptions.showErrorAlert && (
        <ErrorAlert scrollToRow={scrollToRow} data={data} />
      )}
      <Box
        ref={viewPortRef}
        style={scrollBoxStyles.scrollContainer(
          itemHeight,
          data.length,
          containerHeight,
          numVisibleItems
        )}
        onScroll={debounceScrollPos}
      >
        <TableHeader columns={tableHeaders} />
        <Box
          style={{
            position: "absolute",
            width: "100%",
            ...containerStyle,
          }}
        >
          {renderRows()}
        </Box>
      </Box>
    </Box>
  );
};

const scrollBoxStyles = {
  parentContainer: {
    height: "calc(100vh - 64px)",
  },
  scrollContainer: (itemHeight, length, containerHeight) => {
    let dynamicHeight = Math.min(
      length * itemHeight,
      containerHeight || window.innerHeight - itemHeight * 3 - 6
    );
    let overFlow = length < window.innerHeight / itemHeight ? "hidden" : "auto";
    return {
      position: "relative",
      width: "100%",
      height: `calc(100vh - ${itemHeight * 3 + 6}px)`,
      maxHeight: `${dynamicHeight}px`,
      border: "1px solid rgba(224, 224, 224, 1)",
      overflowY: overFlow,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    };
  },
};

export default VirtualTable;

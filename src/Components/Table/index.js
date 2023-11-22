import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Checkbox,
  Box,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import { addParamsToUrl } from "./utils";
import { Filter } from "./Filter";
import { tableOptions } from "../../Data";

const initializeFilters = (columns) => {
  const initialFilters = {};
  columns.forEach((column) => {
    initialFilters[column.field] =
      column.filterType === "dateSelect" ? null : "";
  });
  return initialFilters;
};

export const MaterialTable = ({
  options,
  columns,
  data,
  page = 1,
  setPage = () => {},
  isNextPage = true,
  ssf,
  onChangeFilter = () => {},
  onPageSizeChange = () => {},
}) => {
  // Example data
  const [rows, setRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [filters, setFilters] = useState(initializeFilters(columns));
  const [pageSize, setPageSize] = useState(
    options.rowsPerPageOptions ? options.rowsPerPageOptions[0] : 20
  );

  useEffect(() => {
    if (!Object.keys(selectedRows).length) {
      setSelectAll(false);
    }
  }, [selectedRows]);

  useEffect(() => {
    onChangeFilter(addParamsToUrl(filters));
  }, [filters]);

  const handleSelectRow = (id) => {
    const newRow = rows.find((row) => row.id === id);
    const isSelected = selectedRows[id];

    if (isSelected) {
      // Create a new object without the unselected row
      const { [id]: _, ...newSelectedRows } = selectedRows;
      setSelectedRows(newSelectedRows);
    } else {
      // Add the selected row
      setSelectedRows({
        ...selectedRows,
        [id]: newRow,
      });
    }
  };

  const handleSelectAll = () => {
    const newSelection = {};
    const isRowSelectable = (row) =>
      !(options.selectionProps && options.selectionProps(row).disabled);

    if (!selectAll) {
      rows.filter(isRowSelectable).forEach((row) => {
        newSelection[row.id] = row;
      });
    }

    setSelectAll(!selectAll);
    setSelectedRows(newSelection);
  };

  const handleFilterChange = (event, column) => {
    const value = event.target.value;
    setFilters({ ...filters, [column]: value });

    const filteredRows = data.filter((row) => {
      const rowValue = String(row[column]).toLowerCase();
      return rowValue.includes(value.toLowerCase());
    });

    if (!ssf) {
      setRows(filteredRows);
    }
  };

  const handleDateChange = (date, column) => {
    setFilters({ ...filters, [column]: date });

    const filteredRows = data.filter((row) => {
      // Assuming the date in your row data is a string in 'yyyy-MM-dd' format
      const rowDate = row[column];
      const filterDate = date ? date.toISOString().split("T")[0] : "";
      return filterDate ? rowDate === filterDate : true;
    });

    setRows(filteredRows);
  };

  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {Object.keys(selectedRows).length > 0 &&
          options.selectionActions?.map((i) => {
            return (
              <IconButton aria-label="clear date" onClick={i.action}>
                {i.icon}
              </IconButton>
            );
          })}
      </Box>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {options.selection && (
              <TableCell
                className={`${classes.headerCell} ${classes.checkboxCell}`}
              >
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column} className={classes.headerCell}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {options.selection && (
              <TableCell
                className={`${classes.filterCell} ${classes.checkboxCell}`}
              />
            )}
            {columns.map((column) => (
              <TableCell
                key={column + "-filter"}
                className={classes.filterCell}
              >
                <Filter
                  type={column.filterType}
                  value={filters[column.field]}
                  onChange={(event) => handleFilterChange(event, column.field)}
                  handleDateChange={handleDateChange}
                  options={column?.options || []}
                  label={column.header}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {options.selection && (
                <TableCell
                  className={`${classes.cell} ${classes.checkboxCell}`}
                >
                  <Checkbox
                    checked={!!selectedRows[row.id]}
                    onChange={() => handleSelectRow(row.id)}
                    disabled={
                      options.selectionProps
                        ? options.selectionProps(row).disabled
                        : false
                    } // Add this line
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.field} className={classes.cell}>
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TablePagination
          rowsPerPageOptions={
            options.rowsPerPageOptions ? options.rowsPerPageOptions : []
          }
          rowsPerPage={pageSize}
          onRowsPerPageChange={(event) => {
            onPageSizeChange(event.target.value);
            setPageSize(event.target.value);
          }}
          count={2}
          page={page}
          nextIconButtonProps={{ disabled: !isNextPage }}
          backIconButtonProps={page === 1 ? { disabled: true } : undefined}
          onPageChange={(e, p) => {
            if (p > page) {
              setPage(p);
            } else {
              setPage(p);
            }
          }}
          labelDisplayedRows={() => {
            return `Page ${page}`;
          }}
        />
      </Box>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750, // This is the minimum width for the entire table
    tableLayout: "fixed", // Fixed table layout
  },
  headerCell: {
    position: "sticky",
    border: "none",
    top: 0, // Top of the table container
    zIndex: 10, // Higher than the row z-index to stay on top
    background: theme.palette.background.paper, // Ensures the background matches
    minWidth: "120px", // Minimum width for each header cell
    backgroundColor: "#ccc",
    fontWeight: "bold",
  },
  filterCell: {
    position: "sticky",
    top: 56, // Height of the header cell, adjust accordingly
    zIndex: 5, // Lower than the header but above the rows
    background: theme.palette.background.paper, // Ensures the background matches
    paddingTop: "12px", // Consistent padding
    paddingBottom: "12px",
    minWidth: "120px", // Minimum width for each filter cell
  },
  cell: {
    minWidth: "120px", // Minimum width for each cell
    paddingTop: "8px", // Consistent padding
    paddingBottom: "8px",
  },
  container: {
    // overflowX: "auto", // Enable horizontal scrolling
    maxHeight: "calc(100vh - 100px)", // Adjust the height accordingly
  },
  checkboxCell: {
    minWidth: 60, // Reduce this to your desired width
    width: 60, // Set a fixed width for checkbox cells
  },
}));

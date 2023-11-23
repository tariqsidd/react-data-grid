import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Input,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterListIcon from "@material-ui/icons/FilterList";

export const Filter = ({
  type,
  value,
  onChange,
  options,
  label,
  handleDateChange,
}) => {
  const renderField = () => {
    switch (type) {
      case "textField":
        return (
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      case "numberField":
        return (
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            size="small"
            type="number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      case "select":
        return (
          <FormControl variant="outlined" size="small" fullWidth>
            <Select
              displayEmpty
              value={value}
              onChange={onChange}
              renderValue={value !== "" ? undefined : () => null}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "dateSelect":
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              onChangeRaw={(e) => {
                e.preventDefault();
              }}
              fullWidth
              format="MM/dd/yyyy"
              value={value || null} // Ensure value is null when undefined or empty
              onChange={(date) => {
                handleDateChange(date, "date");
              }} // Update to use 'handleDateChange'
              KeyboardButtonProps={{
                "aria-label": "change date",
                style: { padding: "0px" },
              }}
              variant="inline"
              inputVariant="outlined"
              size="small"
              InputProps={{
                endAdornment: value && (
                  <IconButton
                    style={{ padding: "0px" }}
                    onClick={() => handleDateChange(null, "date")}
                  >
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              InputAdornmentProps={{
                position: "start",
              }}
            />
          </MuiPickersUtilsProvider>
        );
      default:
        return null;
    }
  };

  return renderField();
};

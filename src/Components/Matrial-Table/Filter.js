import {Box, FormControl, IconButton, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ClearIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";

export const Filter = ({type, value, onChange, options, label, handleDateChange}) => {
  const renderField = () => {
    switch (type) {
      case 'textField':
        return <TextField value={value} onChange={onChange} size="small" fullWidth/>;
      case 'numberField':
        return <TextField value={value} onChange={onChange} size="small" type="number" fullWidth/>;
      case 'select':
        return (
          <FormControl size="small" fullWidth>
            <Select
              displayEmpty
              value={value}
              onChange={onChange}
              renderValue={value !== '' ? undefined : () => null}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'dateSelect':
        return (
          <Box style={{display: 'inline-flex', alignItems: 'center'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker

                onChangeRaw={(e)=>{
                  e.preventDefault();
                }}
                fullWidth
                format="MM/dd/yyyy"
                value={value || null} // Ensure value is null when undefined or empty
                onChange={(date) => {
                  handleDateChange(date, 'joiningDate')
                }} // Update to use 'handleDateChange'
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {value &&
            <IconButton
              style={{position: 'absolute', right: 50}}
              aria-label="clear date"
              onClick={() => handleDateChange(null, 'joiningDate')}>
              <ClearIcon/>
            </IconButton>
            }
          </Box>
        );
      default:
        return null;
    }
  };

  return renderField();
};

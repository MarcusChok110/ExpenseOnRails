import { TextField, TextFieldProps } from '@material-ui/core';
import React, { useState } from 'react';

/**
 * Custom hook which returns the input field value and a predefined TextField
 * @param label Label for input field
 * @param type Type of input field
 */
export default function useInput(
  label: string,
  type: string,
  otherProps?: TextFieldProps
): [string, JSX.Element, React.Dispatch<React.SetStateAction<boolean>>] {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [
    value,
    <TextField
      value={value}
      onChange={handleInput}
      variant="outlined"
      label={label}
      required
      type={type}
      margin="normal"
      fullWidth
      error={error}
      {...otherProps}
      helperText={error && otherProps?.helperText}
    />,
    setError,
  ];
}

import { TextField, TextFieldProps } from '@material-ui/core';
import React, { useState } from 'react';

/**
 * Custom hook which returns the input field value and a predefined TextField
 * @param label Label for input field
 * @param type Type of input field
 */
export default function useInput(
  label: string,
  type: string = 'text'
): [
  string,
  TextFieldProps,
  React.FC<TextFieldProps>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputProps: TextFieldProps = {
    value,
    onChange: handleInput,
    label,
    type,
    error,
  };

  return [value, inputProps, InputField, setError, setValue];
}

const InputField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  label,
  type,
  error,
  ...otherProps
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      variant="outlined"
      label={label}
      type={type}
      margin="normal"
      fullWidth
      error={error}
      {...otherProps}
      helperText={error && otherProps?.helperText}
    />
  );
};

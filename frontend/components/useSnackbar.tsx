import {
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

/**
 * Type for onClose handler function
 */
type CloseHandler = (
  e: React.SyntheticEvent<any, Event>,
  reason?: SnackbarCloseReason
) => void;

/**
 * Type for optional snackbar action props
 */
interface SnackbarAction {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
}

/**
 * Type for return value of useSnackbar
 */
type useSnackbarResult = [() => void, Props, React.FC<Props>];

/**
 * Custom hook which returns a custom snackbar
 */
export default function useSnackbar(
  message: React.ReactNode,
  action?: SnackbarAction
): useSnackbarResult {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose: CloseHandler = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const snackbarAlertProps: Props = {
    open,
    message,
    handleClose,
    action,
  };

  return [handleOpen, snackbarAlertProps, SnackbarAlert];
}

/**
 * Props for SnackbarAlert component
 */
interface Props {
  open: boolean;
  message: React.ReactNode;
  handleClose: CloseHandler;
  action?: SnackbarAction;
}

/**
 * Reusable Snackbar component
 */
const SnackbarAlert: React.FC<Props> = ({
  open,
  message,
  handleClose,
  action,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={
        <>
          {action ? (
            <Button color="secondary" size="small" onClick={action.onClick}>
              {action.label}
            </Button>
          ) : null}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

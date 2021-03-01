import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';

export default function useDialog(
  title: string,
  closeButton?: boolean,
  actions?: ExpenseDialogAction[]
): [VoidFunction, DialogProps, React.FC<DialogProps>, VoidFunction] {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dialogProps = {
    open,
    title,
    handleClose,
    closeButton,
    actions,
  };

  return [handleOpen, dialogProps, ExpenseDialog, handleClose];
}

interface ExpenseDialogAction {
  label: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface DialogProps {
  open: boolean;
  title: string;
  handleClose: VoidFunction;
  closeButton?: boolean;
  actions?: ExpenseDialogAction[];
  customClose?: VoidFunction;
}

const ExpenseDialog: React.FC<DialogProps> = ({
  open,
  title,
  handleClose,
  children,
  closeButton,
  actions,
  customClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        customClose?.();
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {closeButton && (
          <Button
            onClick={() => {
              handleClose();
              customClose?.();
            }}
            color="primary"
          >
            Close
          </Button>
        )}
        {actions?.map((action) => (
          <Button onClick={action.handleClick} color="primary">
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

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
  actions?: ExpenseDialogAction[]
): [VoidFunction, DialogProps, React.FC<DialogProps>] {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dialogProps = {
    open,
    title,
    handleClose,
    actions,
  };

  return [handleOpen, dialogProps, ExpenseDialog];
}

interface ExpenseDialogAction {
  label: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface DialogProps {
  open: boolean;
  title: string;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  actions?: ExpenseDialogAction[];
  contentText?: string;
}

const ExpenseDialog: React.FC<DialogProps> = ({
  open,
  title,
  handleClose,
  children,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && (
        <DialogActions>
          {actions.map((action) => (
            <Button onClick={action.handleClick} color="primary">
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

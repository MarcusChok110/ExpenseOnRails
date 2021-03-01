import {
  Checkbox,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';
import { Transaction } from '../../redux/types';
import { Order } from './utils';

interface HeadCell {
  id: keyof Transaction;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'title', label: 'Transaction', numeric: false },
  { id: 'amount', label: 'Amount', numeric: true },
  { id: 'description', label: 'Description', numeric: false },
  { id: 'type', label: 'Type', numeric: false },
  { id: 'category', label: 'Category', numeric: false },
  { id: 'date', label: 'Date', numeric: false },
];

const useStyles = makeStyles((theme) => ({
  cell: {
    backgroundColor: theme.palette.info.main + '26',
    color: theme.palette.info.dark,
  },
}));

interface Props {
  numSelected: number;
  order: Order;
  orderBy: string;
  onSelectedAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction
  ) => void;
  rowCount: number;
}

const ExpenseTableHead: React.FC<Props> = (props) => {
  const classes = useStyles();

  const {
    numSelected,
    onRequestSort,
    onSelectedAllClick,
    order,
    orderBy,
    rowCount,
  } = props;

  const createSortHandler = (property: keyof Transaction) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.cell}>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectedAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.cell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.cell} align="center">
          Edit
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ExpenseTableHead;

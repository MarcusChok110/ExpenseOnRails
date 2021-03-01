import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Add, AttachMoney, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExpenseTable from '../../components/ExpenseTable/index';
import Forbidden from '../../components/Forbidden';
import LoadingCircle from '../../components/Form/LoadingCircle';
import SubmitButton from '../../components/Form/SubmitButton';
import useInput from '../../components/Form/useInput';
import useSelect from '../../components/Form/useSelect';
import useDialog from '../../components/useDialog';
import useLoading from '../../components/useLoading';
import useSnackbar from '../../components/useSnackbar';
import { selectAccount } from '../../redux/slices/account';
import {
  selectTransactions,
  transactionsActions,
} from '../../redux/slices/transactions';
import { selectUser } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';
import { Transaction } from '../../redux/types';
import { dateToFormString } from '../../utils/dateToString';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const Transactions: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const account = useSelector(selectAccount);
  const transactions = useSelector(selectTransactions);

  const [editMode, setEditMode] = useState(false);

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'revenue', label: 'Revenue' },
  ];

  const categoryOptions = account.categories.map((element) => ({
    value: element,
    label: element,
  }));

  const [search, searchProps, SearchInput] = useInput(
    'Search Transactions',
    'text'
  );

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.title.includes(search) ||
      transaction.description.includes(search) ||
      transaction.amount.toString().includes(search)
    );
  });

  const [
    handleOpenDialog,
    dialogProps,
    ExpenseDialog,
    handleCloseDialog,
  ] = useDialog('Create New Transaction', true);
  const [title, titleProps, TitleInput, , setTitle] = useInput('Name');
  const [amount, amountProps, AmountInput, , setAmount] = useInput(
    'Amount',
    'number'
  );
  const [
    description,
    descriptionProps,
    DescriptionInput,
    ,
    setDescription,
  ] = useInput('Description');
  const [type, typeProps, TypeInput, setType] = useSelect(
    'Type',
    'type-select',
    typeOptions
  );
  const [category, categoryProps, CategoryInput, setCategory] = useSelect(
    'Category',
    'category-select',
    categoryOptions
  );
  const [date, dateProps, DateInput, , setDate] = useInput('Date', 'date');

  const [id, setId] = useState('');

  const handleFormReset = () => {
    setTitle('');
    setAmount('');
    setDescription('');
    setType('');
    setCategory('');
    setDate('');
  };

  const handleEdit = (transaction: Transaction) => {
    setEditMode(true);
    setId(transaction._id);
    const { title, amount, description, type, category, date } = transaction;
    setTitle(title);
    setAmount(String(amount));
    setDescription(description);
    setType(type);
    setCategory(category);
    setDate(dateToFormString(date));
    handleOpenDialog();
  };

  const handleDelete = async (
    ids: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    try {
      for (const _id of ids) {
        await dispatch(transactionsActions.deleteTransaction({ jwt, _id }));
      }
      setSelected([]);
      openDeleteSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormReset();
    handleCloseDialog();
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    const transaction: Transaction = {
      title,
      amount: Number(amount),
      description,
      type: type as 'expense' | 'revenue',
      category,
      date,
      _id: id,
    };
    if (!editMode) {
      try {
        await dispatch(
          transactionsActions.createTransaction({ jwt, transaction })
        );
        openCreateSuccess();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(
          transactionsActions.editTransaction({ jwt, transaction })
        );
        openUpdateSuccess();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [createLoading, doSubmit] = useLoading(handleSubmit);
  const [deleteLoading, doDelete] = useLoading(handleDelete);
  const loading = createLoading || deleteLoading;

  const [
    openCreateSuccess,
    createSuccessProps,
    CreateSuccessSnackbar,
  ] = useSnackbar('Successfully created new transaction');

  const [
    openUpdateSuccess,
    updateSuccessProps,
    UpdateSuccessSnackbar,
  ] = useSnackbar('Successfully updated transaction');

  const [
    openDeleteSuccess,
    deleteSuccessProps,
    DeleteSuccessSnackbar,
  ] = useSnackbar('Successfully deleted transaction(s)');

  return (
    <>
      <Typography variant="h2">Transactions</Typography>
      <div className={classes.toolbar}></div>
      {user.loggedIn ? (
        <>
          <Paper className={classes.paper} elevation={3}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={8}>
                <SearchInput
                  {...searchProps}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  margin="none"
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    handleOpenDialog();
                    setEditMode(false);
                  }}
                >
                  Add Transaction
                </Button>
              </Grid>
            </Grid>
            <div className={classes.toolbar}></div>
            <ExpenseTable
              transactions={filteredTransactions}
              handleEdit={handleEdit}
              handleDelete={doDelete}
            />
          </Paper>
          <CreateSuccessSnackbar {...createSuccessProps} />
          <DeleteSuccessSnackbar {...deleteSuccessProps} />
          <UpdateSuccessSnackbar {...updateSuccessProps} />
          <LoadingCircle display={loading} />
          <ExpenseDialog {...dialogProps} customClose={handleFormReset}>
            <form method="post" className={classes.form} onSubmit={doSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TitleInput {...titleProps} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AmountInput
                    {...amountProps}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DescriptionInput {...descriptionProps} multiline />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TypeInput {...typeProps} required />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CategoryInput {...categoryProps} required />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DateInput
                    {...dateProps}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton>{editMode ? 'Update' : 'Create'}</SubmitButton>
                </Grid>
              </Grid>
            </form>
          </ExpenseDialog>
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default Transactions;

import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Add, AttachMoney, Search } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import ExpenseTable from '../../components/ExpenseTable/index';
import Forbidden from '../../components/Forbidden';
import SubmitButton from '../../components/Form/SubmitButton';
import useInput from '../../components/Form/useInput';
import useSelect from '../../components/Form/useSelect';
import useDialog from '../../components/useDialog';
import { selectAccount } from '../../redux/slices/account';
import { selectTransactions } from '../../redux/slices/transactions';
import { selectUser } from '../../redux/slices/user';

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
  const user = useSelector(selectUser);
  const account = useSelector(selectAccount);
  const transactions = useSelector(selectTransactions);
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.title.includes(search);
  });

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

  const [handleOpenDialog, dialogProps, ExpenseDialog] = useDialog(
    'Create New Transaction',
    true
  );
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

  const handleReset = () => {
    setTitle('');
    setAmount('');
    setDescription('');
    setType('');
    setCategory('');
    setDate('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, amount, description, type, category, date });
  };

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
                  onClick={() => handleOpenDialog()}
                >
                  Add Transaction
                </Button>
              </Grid>
            </Grid>
            <div className={classes.toolbar}></div>
            <ExpenseTable transactions={filteredTransactions} />
          </Paper>
          <ExpenseDialog {...dialogProps} customClose={handleReset}>
            <form
              method="post"
              className={classes.form}
              onSubmit={handleSubmit}
            >
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
                  <SubmitButton>Submit</SubmitButton>
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

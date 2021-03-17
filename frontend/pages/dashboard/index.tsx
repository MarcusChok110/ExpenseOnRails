import {
  Box,
  Divider,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Forbidden from "../../components/Forbidden";
import { selectUser } from "../../redux/slices/user";
import { selectAccount } from "../../redux/slices/account";
import { selectTransactions } from "../../redux/slices/transactions";
import { Doughnut, Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2),
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const account = useSelector(selectAccount);
  const transactions = useSelector(selectTransactions);
  const theme = useTheme();

  const paletteColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.text.primary,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.error.light,
    theme.palette.warning.light,
    theme.palette.info.light,
    theme.palette.success.light,
    theme.palette.text.secondary,
    theme.palette.primary.dark,
    theme.palette.secondary.dark,
    theme.palette.error.dark,
    theme.palette.warning.dark,
    theme.palette.info.dark,
    theme.palette.success.dark,
  ];

  const totalExpenses = transactions.reduce((acc, current) => {
    return acc + (current.type === "expense" ? current.amount : 0);
  }, 0);

  const totalRevenues = transactions.reduce((acc, current) => {
    return acc + (current.type === "revenue" ? current.amount : 0);
  }, 0);

  const totalData = {
    labels: ["Expenses", "Revenues"],
    datasets: [
      {
        data: [totalExpenses, totalRevenues],
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.success.main,
        ],
      },
    ],
  };

  const breakdownExpenses = account.categories.map((value) => {
    return transactions.reduce((acc, current) => {
      return (
        acc +
        (current.type === "expense" && current.category === value
          ? current.amount
          : 0)
      );
    }, 0);
  });

  const breakdownRevenues = account.categories.map((value) => {
    return transactions.reduce((acc, current) => {
      return (
        acc +
        (current.type === "revenue" && current.category === value
          ? current.amount
          : 0)
      );
    }, 0);
  });

  const breakdownExpensesData = {
    labels: account.categories,
    datasets: [
      {
        data: breakdownExpenses,
        backgroundColor: paletteColors,
      },
    ],
  };

  const breakdownRevenuesData = {
    labels: account.categories,
    datasets: [
      {
        data: breakdownRevenues,
        backgroundColor: paletteColors,
      },
    ],
  };

  const transactionsData = transactions
    .map((value) => ({
      x: new Date(value.date),
      y: value.type === "revenue" ? value.amount : -value.amount,
    }))
    .sort((a, b) => (a.x < b.x ? -1 : 1));

  const lineData = {
    datasets: [
      {
        label: "Transactions",
        fill: false,
        backgroundColor: theme.palette.info.light + "80",
        borderColor: theme.palette.info.main,
        data: transactionsData,
      },
    ],
  };

  const lineOptions = {
    scales: {
      xAxes: [
        {
          title: "Date",
          type: "time",
          bounds: "data",
          distribution: "linear",
        },
      ],
    },
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h2">Dashboard</Typography>
      </Box>
      {user.loggedIn ? (
        <>
          <Divider className={classes.divider} />
          <Typography variant={"h4"}>Total Expenses and Revenues</Typography>
          <Doughnut data={totalData} />
          <Divider className={classes.divider} />
          <Typography variant={"h4"}>
            Breakdown of Expenses in Categories
          </Typography>
          <Doughnut data={breakdownExpensesData} />
          <Divider className={classes.divider} />
          <Typography variant={"h4"}>
            Breakdown of Revenues in Categories
          </Typography>
          <Doughnut data={breakdownRevenuesData} />
          <Divider className={classes.divider} />
          <Typography variant={"h4"}>Trend Line of Transactions</Typography>
          <Line data={lineData} options={lineOptions} />
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default Dashboard;

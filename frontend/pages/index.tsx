import Typography from "@material-ui/core/Typography";
import React from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";

const Home: React.FC = () => {
  return (
    <>
      <Typography variant="h2">What is Expense on Rails?</Typography>
      <Box margin={2}>
        <Typography variant="body1">
          "Expense on Rails" is not a Ruby on Rails application, but rather a
          Next.js / Express web application aimed to help <strong>track</strong>{" "}
          your expenses! Get it? Tracks — Rails? ...Moving on, it is designed to
          be simple a web interface to manage simple transactions in your daily
          life.
        </Typography>
      </Box>
      <Typography variant={"h5"}>What are the different pages?</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={"Home"}
            secondary={"The page you are on now."}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Account"}
            secondary={
              "Where you can manage your budget and user specific details."
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Transactions"}
            secondary={"Where you can manage your revenue and expenses."}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Dashboard"}
            secondary={"Where you can view graphs and trends in your spending."}
          />
        </ListItem>
      </List>
      <Typography variant={"h5"}>Great! So how do I start?</Typography>
      <Box margin={2}>
        <Typography variant="body1">
          Head over to the Register page on the left to create an account! If
          you already have an account, all you need to do is Login on the top
          right and you're good to start tracking!
        </Typography>
      </Box>
    </>
  );
};

export default Home;

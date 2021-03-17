import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Forbidden from "../../components/Forbidden";
import { accountActions, selectAccount } from "../../redux/slices/account";
import { selectUser } from "../../redux/slices/user";
import { useAppDispatch } from "../../redux/store";
import { Add, DeleteOutlined, ExpandMore } from "@material-ui/icons";
import ActionButton from "../../components/Form/ActionButton";
import useInput from "../../components/Form/useInput";
import useDialog from "../../components/useDialog";
import SubmitButton from "../../components/Form/SubmitButton";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

const Account: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const account = useSelector(selectAccount);

  const [
    categoryValue,
    categoryInputProps,
    CategoryInput,
    ,
    setCategory,
  ] = useInput("Category");

  const [openDialog, dialogProps, CategoryDialog, closeDialog] = useDialog(
    "Create New Category",
    true
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeDialog();
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    const newCategories = [...account.categories, categoryValue];
    const newAccount = { ...account, categories: newCategories };
    dispatch(
      accountActions.saveAccountChanges({
        jwt,
        _id: user.account,
        state: newAccount,
      })
    );
    setCategory("");
  };

  const handleDelete = (category: string) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    const newCategories = account.categories.filter(
      (value) => value !== category
    );

    const newAccount = { ...account, categories: newCategories };
    dispatch(
      accountActions.saveAccountChanges({
        jwt,
        _id: user.account,
        state: newAccount,
      })
    );
  };

  return (
    <>
      <Typography variant="h2">Account</Typography>
      {user.loggedIn ? (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant={"h6"}>Categories</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <List className={classes.root}>
                {account.categories.map((value, index) => (
                  <ListItem key={index}>
                    <Grid container justify={"space-between"}>
                      <Grid item>
                        <ListItemText primary={value} />
                      </Grid>
                      <Grid item>
                        <ActionButton
                          onClick={() => handleDelete(value)}
                          color={"secondary"}
                        >
                          <DeleteOutlined />
                        </ActionButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem button onClick={() => openDialog()}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary={"Add new category"} />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <CategoryDialog {...dialogProps} customClose={() => setCategory("")}>
            <form onSubmit={handleSubmit}>
              <CategoryInput {...categoryInputProps} />
              <SubmitButton>Submit</SubmitButton>
            </form>
          </CategoryDialog>
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default Account;

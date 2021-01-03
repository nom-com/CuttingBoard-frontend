import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteButton from "@material-ui/icons/Delete";
import { useStoreContext } from "../utils/GlobalState";
import { SET_SHOPPING_LIST, LOADING } from "../utils/actions";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingListService from "../services/shoppinglist.service";

export default function CheckboxList() {
  const [state, dispatch] = useStoreContext();

  const dummyShoppingListData = [
    {
      id: 0,
      ingredientName: "Garlic",
      checked: false,
    },
    {
      id: 2,
      ingredientName: "Parmesan",
      checked: true,
    },
    {
      id: 3,
      ingredientName: "Salt",
      checked: false,
    },
  ];

  const getShoppingList = () => {
    const shoppingListLocalStorage = ShoppingListService.getCurrentList();

    if (!shoppingListLocalStorage) {
      dispatch({ type: LOADING, loading: true });
      ShoppingListService.getShoppingList()
        .then((res) => {
          console.log(res);
          dispatch({
            type: SET_SHOPPING_LIST,
            shoppingList: dummyShoppingListData,
          });
          ShoppingListService.setCurrentList(dummyShoppingListData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch({ type: LOADING, loading: true });
      dispatch({
        type: SET_SHOPPING_LIST,
        shoppingList: shoppingListLocalStorage,
      });
    }
  };

  // WILL BE AN API CALL
  const removeFromList = (id) => {
    // ShoppingListService.deleteShoppingListById(id).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });

    const shorterList = state.shoppingList.filter((item) => item.id !== id);
    dispatch({
      type: SET_SHOPPING_LIST,
      shoppingList: shorterList,
    });
    ShoppingListService.setCurrentList(shorterList);
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const handleToggle = (value) => () => {
    value.checked = !value.checked;
    const updateShoppingList = state.shoppingList.map((item) =>
      item.id === value.id ? value : item
    );

    dispatch({
      type: SET_SHOPPING_LIST,
      shoppingList: updateShoppingList,
    });
    ShoppingListService.setCurrentList(updateShoppingList);
  };

  return (
    <React.Fragment>
      {state.loading ? (
        <Grid container item direction="row" justify="center">
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : (
        <Grid container item direction="row" justify="center">
          {state.shoppingList.length > 0 ? (
            <Grid item xs={12}>
              <Fade in={!state.loading}>
                <List>
                  {state.shoppingList.map((value, index) => (
                    <ListItem
                      key={value.id}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggle(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={value.checked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": `checkbox-list-label-${value.id}`,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={`checkbox-list-label-${value.id}`}
                        primary={`${value.ingredientName}`}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Delete from list">
                          <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => removeFromList(value.id)}
                          >
                            <DeleteButton />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fade>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item>
                <Typography variant="subtitle1">
                  No items found in your shopping list
                </Typography>
                {/* TO BE DELETED */}
                <button onClick={() => getShoppingList()}>
                  POPULATE DUMMY DATA
                </button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
}

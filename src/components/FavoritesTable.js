import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TrashIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { SET_FAVORITES, LOADING } from "../utils/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import RecipeService from "../services/recipe.service";

const FavoritesTable = () => {
  const [state, dispatch] = useStoreContext();

  // const favoriteRecipes = [
  //   {
  //     id: 0,
  //     recipe: {
  //       id: 2,
  //       imageLocation: "https://via.placeholder.com/100",
  //       title: "f",
  //       description: "f",
  //       publicRecipe: false,
  //       ingredients: [],
  //       instructions: [],
  //       category: {
  //         id: 2,
  //         category: "Another Category",
  //       },
  //     },
  //   },
  //   {
  //     id: 2,
  //     recipe: {
  //       id: 2,
  //       imageLocation: "https://via.placeholder.com/100",
  //       title: "f",
  //       description: "f",
  //       publicRecipe: false,
  //       ingredients: [],
  //       instructions: [],
  //       category: {
  //         id: 2,
  //         category: "Another Category",
  //       },
  //     },
  //   },
  //   {
  //     id: 3,
  //     recipe: {
  //       id: 2,
  //       imageLocation: "https://via.placeholder.com/100",
  //       title: "f",
  //       description: "f",
  //       publicRecipe: false,
  //       ingredients: [],
  //       instructions: [],
  //       category: {
  //         id: 2,
  //         category: "Another Category",
  //       },
  //     },
  //   },
  // ];

  //
  const setFavorites = () => {
    dispatch({ type: LOADING, loading: true });
    RecipeService.getFavoriteRecipes()
      .then((res) => {
        // console.log(res);
        dispatch({
          type: SET_FAVORITES,
          favorites: res.data,
        });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({ type: LOADING, loading: false });
      });
  };

  // WILL BE AN API CALL
  const removeFavorite = (id) => {
    dispatch({ type: LOADING, loading: true });
    RecipeService.deleteFavoriteRecipe(id)
      .then((res) => {
        // console.log(res);
        setFavorites();
      })
      .catch((err) => {
        // console.log(err);
        // console.log("DELETE REQUEST, something went wrong");
        dispatch({ type: LOADING, loading: false });
      });
    // const shorterFavs = state.favorites.filter((fav) => fav.id !== id);
    // dispatch({
    //   type: SET_FAVORITES,
    //   favorites: shorterFavs,
    // });
  };

  useEffect(() => {
    setFavorites();
  }, []);

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
          {state.favorites.length > 0 ? (
            <Grid item xs={12}>
              <Fade in={!state.loading}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Public/Private</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.favorites.map((favorite) => (
                        <TableRow key={favorite.id}>
                          <TableCell component="th" scope="row">
                            <Tooltip title="View favorite">
                              <Link to={`/recipe/${favorite.recipe.id}`}>
                                <img
                                  style={{ maxWidth: 100 }}
                                  src={
                                    "http://images.generictech.org/" +
                                    favorite.recipe.imageLocation
                                  }
                                  alt="placeholder"
                                />
                              </Link>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{favorite.recipe.title}</TableCell>
                          <TableCell>
                            {favorite.recipe.category.category}
                          </TableCell>
                          <TableCell>
                            {favorite.recipe.publicRecipe
                              ? "public"
                              : "private"}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Remove from Favorites">
                              <IconButton
                                onClick={() => removeFavorite(favorite.id)}
                              >
                                <TrashIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fade>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item>
                <Typography variant="subtitle1">
                  no favorite recipes found
                </Typography>
                {/* TO BE DELETED */}
                <button onClick={() => setFavorites()}>
                  POPULATE DUMMY DATA
                </button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default FavoritesTable;

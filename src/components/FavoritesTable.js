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

const FavoritesTable = () => {
  const [state, dispatch] = useStoreContext();

  const favoriteRecipes = [
    {
      id: 0,
      img: "https://via.placeholder.com/100",
      title: "test",
      category: "soup",
      public: true,
    },
    {
      id: 2,
      img: "https://via.placeholder.com/100",
      title: "test",
      category: "pasta",
      public: false,
    },
    {
      id: 3,
      img: "https://via.placeholder.com/100",
      title: "test",
      category: "dessert",
      public: true,
    },
  ];

  //
  const setFavorites = () => {
    dispatch({ type: LOADING, loading: true });
    setTimeout(function () {
      dispatch({
        type: SET_FAVORITES,
        favorites: favoriteRecipes,
      });
    }, 1500);
  };

  // WILL BE AN API CALL
  const removeFavorite = id => {
    const shorterFavs = state.favorites.filter(fav => fav.id !== id);
    dispatch({
      type: SET_FAVORITES,
      favorites: shorterFavs,
    });
  };

  useEffect(() => {
    setFavorites();
  }, []);

  return (
    <React.Fragment>
      {state.loading ? (
        <Grid container item direction='row' justify='center'>
          <Grid item>
            <CircularProgress color='secondary' />
          </Grid>
        </Grid>
      ) : (
        <Grid container item direction='row' justify='center'>
          {state.favorites.length > 0 ? (
            <Grid item xs={12}>
              <Fade in={!state.loading}>
                <TableContainer component={Paper}>
                  <Table aria-label='simple table'>
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
                      {state.favorites.map(recipe => (
                        <TableRow key={recipe.id}>
                          <TableCell component='th' scope='row'>
                            <Tooltip title='View Recipe'>
                              <Link to={`/recipe/${recipe.id}`}>
                                <img src={recipe.img} alt='placeholder' />
                              </Link>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{recipe.title}</TableCell>
                          <TableCell>{recipe.category}</TableCell>
                          <TableCell>
                            {recipe.public ? "public" : "private"}
                          </TableCell>
                          <TableCell>
                            <Tooltip title='Remove from Favorites'>
                              <IconButton
                                onClick={() => removeFavorite(recipe.id)}>
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
                <Typography variant='subtitle1'>
                  no favorite recipes found
                </Typography>
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

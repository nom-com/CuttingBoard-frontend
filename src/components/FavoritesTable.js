import React from "react";
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
import { Link } from "react-router-dom";
// import EditIcon from "@material-ui/icons/Edit";
// import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const FavoritesTable = () => {
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

  return (
    <React.Fragment>
      {favoriteRecipes.length > 0 ? (
        <Grid container item direction='row' justify='center'>
          <Grid item xs={12}>
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
                  {favoriteRecipes.map(recipe => (
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
                            onClick={() => {
                              console.log(recipe.id);
                              //   setShowModal(true);
                              //   setDeleteCat(cat.uid);
                            }}>
                            <TrashIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Typography variant='subtitle1'>no favorite recipes found</Typography>
      )}
    </React.Fragment>
  );
};

export default FavoritesTable;

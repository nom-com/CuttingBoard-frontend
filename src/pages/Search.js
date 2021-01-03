import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import RecipeService from "../services/recipe.service";
import { Button, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import CategoryService from "../services/category.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeGlanceCard from "../components/RecipeGlanceCard";

const Search = () => {
  const [state, dispatch] = useStoreContext();
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [recipeCategory, setRecipeCategory] = useState([]);
  const [recipeArr, setRecipeArr] = useState([]);

  const handleSearchTextChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchText(search);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCategoryId(categoryId);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    RecipeService.getRecipeByCategoryId(categoryId)
      .then((res) => {
        console.log(res);
        setRecipeArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    RecipeService.getRecipeBySearch(searchText)
      .then((res) => {
        console.log(res);
        setRecipeArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getCategories = () => {
    CategoryService.getAllCategories()
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          let categoryArr = res.data.map((categoryObj) => {
            return {
              value: categoryObj.category,
              label: capitalize(categoryObj.category),
              id: categoryObj.id,
            };
          });
          setRecipeCategory(categoryArr);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="page-body-content">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        component="nav"
        p={5}
      >
        <Grid item xs={7}>
          <TextField
            type="search"
            variant="outlined"
            margin="normal"
            label="Search a recipe"
            value={searchText}
            onChange={handleSearchTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Button onClick={handleSearchSubmit} variant="outlined" type="submit">
            Search
          </Button>
        </Grid>
        <Grid item xs={7}>
          <TextField
            select
            id="category"
            name="category"
            label="Select a Category"
            margin="dense"
            variant="outlined"
            onChange={handleCategoryChange}
            value={categoryId}
            fullWidth
          >
            {recipeCategory.map((option) => (
              <MenuItem key={option.value} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <Button
            onClick={handleCategorySubmit}
            variant="outlined"
            type="submit"
          >
            Search
          </Button>
        </Grid>
        {state.loading ? (
          <Grid container item direction="row" justify="center">
            <Grid item>
              <CircularProgress color="secondary" />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            p={5}
          >
            {recipeArr.length > 0 ? (
              recipeArr.map((recipeObj) => (
                <Grid item>
                  <RecipeGlanceCard recipeDetail={recipeObj} />
                </Grid>
              ))
            ) : (
              <div>No Recipes Found.</div>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Search;

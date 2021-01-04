import RecipeGlanceCard from "../components/RecipeGlanceCard";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useStoreContext } from "../utils/GlobalState";
import { SET_RECOMMENDED_RECIPES, LOADING } from "../utils/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeService from "../services/recipe.service";
import { Divider, Paper, Typography } from "@material-ui/core";

const RecipeGlanceFrame = () => {
  const [state, dispatch] = useStoreContext();

  const setRecommended = () => {
    RecipeService.getAllRecommendedRecipes()
      .then(res => {
        console.log(res.data);
        res.status === 200 &&
          dispatch({
            type: SET_RECOMMENDED_RECIPES,
            recipes: res.data,
          });
        //console.log(RecipeService.getCurrentRecipe());
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setRecommended();
  }, []);

  return (
    <Paper style={{ padding: 20 , marginTop: 20}}>
      {state.loading ? (
        <Grid container item direction='row' justify='center'>
          <Grid item>
            <CircularProgress color='secondary' />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          p={5}>
          <Grid item xs={12}>
            <Typography variant='h2' align='center'>
              Recommended Recipes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
          </Grid>
          {state.recommendedRecipes.length > 0 ? (
            state.recommendedRecipes.map(recipeObj => (
              <Grid item key={recipeObj.id} xs={4}>
                <RecipeGlanceCard recipeDetail={recipeObj} />
              </Grid>
            ))
          ) : (
            <div>No Recipes Found.</div>
          )}
        </Grid>
      )}
    </Paper>
  );
};

export default RecipeGlanceFrame;

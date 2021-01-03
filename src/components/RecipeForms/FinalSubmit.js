import React from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useStoreContext } from "../../utils/GlobalState";
import RecipeService from "../../services/recipe.service";
import DebugData from "../DebugData";
import { UNSET_INGREDIENTS, UNSET_INSTRUCTIONS, UNSET_RECIPE_DETAIL } from "../../utils/actions";
import { Delete } from "@material-ui/icons";

const FinalSubmitRecipeForm = ({navigateOnSubmit}) => {
  const debug = true;
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();

    RecipeService.postRecipe({
      imageLocation: state.recipeDetail.imageLocation,
      title: state.recipeDetail.title,
      description: state.recipeDetail.description,
      publicRecipe: state.recipeDetail.publicRecipe,
      ingredients: state.ingredients,
      instructions: state.instructions,
      category: { id: state.recipeDetail.category },
    })
      .then(res => {
        console.log(res.status);
      })
      .catch(err => console.log(err));
  };

  const handleClearForm = () => {
    dispatch({
      type: UNSET_RECIPE_DETAIL
    })
    dispatch({type: UNSET_INGREDIENTS})
    dispatch({type: UNSET_INSTRUCTIONS})
    navigateOnSubmit("right")
  }

  return (
    <form noValidate autoComplete='off'>
      <Paper
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: 30,
          padding: 20,
        }}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          margin={4}>
          <Grid item>
            <Typography variant='h4'>Ready to Submit?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
          </Grid>
          <Grid item container direction="column" justify="flex-start">
          {debug && (
                <DebugData values={{
                  imageLocation: state.recipeDetail.imageLocation,
                  title: state.recipeDetail.title,
                  description: state.recipeDetail.description,
                  publicRecipe: state.recipeDetail.publicRecipe,
                  ingredients: state.ingredients,
                  instructions: state.instructions,
                  category: { id: state.recipeDetail.category },
                }} errors={{}} />
              )}
          </Grid>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='flex-end'>
            <Button
              onClick={handleClearForm}
              variant='outlined'
              endIcon={<Delete/>}>
              Clear Form
            </Button>
            <Button
              onClick={handleSubmit}
              variant='outlined'
              endIcon={<SendIcon />}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default FinalSubmitRecipeForm;

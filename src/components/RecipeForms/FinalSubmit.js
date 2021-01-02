import React from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useStoreContext } from "../../utils/GlobalState";
import RecipeService from "../../services/recipe.service";

const FinalSubmitRecipeForm = () => {
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
      category: {id: state.recipeDetail.category},
    })
      .then(res => {
        console.log(res.status);
      })
      .catch(err => console.log(err));
  };
  return (
    <Paper>
      <form
        noValidate
        autoComplete='off'
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: 30,
          padding: 20,
        }}>
        How's it look?
        <Button onClick={handleSubmit} endIcon={<SendIcon />}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default FinalSubmitRecipeForm;

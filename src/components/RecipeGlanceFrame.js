import RecipeGlanceCard from "../components/RecipeGlanceCard";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { useStoreContext } from "../utils/GlobalState";
import { SET_RECOMMENDED_RECIPES, LOADING } from "../utils/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const dummyRecipeArray = [{
    id: 12,
    imageLocation: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
    title: "The Perfect Souffle",
    description: "Souffle is just a matter of time. The time gap from the oven to the table. There is a famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, I will make the soufflé.",
    createdBy: "Nom.com Selects",
    creationDate: "12/25/2020",
    category: "French Cuisine",
    instructions: ["Give Up", "Order Fast Food", "????", "Profit"],
    ingredients: [{"ingredient": "Butter", "amount": "2 tbsp(30mL)"}, {"ingredient": "Flour", "amount": "2 tbsp(30mL)"}, {"ingredient": "Salt", "amount": "1/2 tsp(2.5mL)"}, {"ingredient": "Milk", "amount": "3/4 cup (175mL)"}, {"ingredient": "Egg Yolk(s)", "amount": "4"}, {"ingredient": "Egg White(s)", "amount": "2", }, {"ingredient": "Cream of Tartar", "amount": "1/4 tsp(1.25mL)"}]
  }, 
  {
    id: 12,
    imageLocation: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
    title: "The Perfect Souffle",
    description: "Souffle is just a matter of time. The time gap from the oven to the table. There is a famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, I will make the soufflé.",
    createdBy: "Nom.com Selects",
    creationDate: "12/25/2020",
    category: "French Cuisine",
    instructions: ["Give Up", "Order Fast Food", "????", "Profit"],
    ingredients: [{"ingredient": "Butter", "amount": "2 tbsp(30mL)"}, {"ingredient": "Flour", "amount": "2 tbsp(30mL)"}, {"ingredient": "Salt", "amount": "1/2 tsp(2.5mL)"}, {"ingredient": "Milk", "amount": "3/4 cup (175mL)"}, {"ingredient": "Egg Yolk(s)", "amount": "4"}, {"ingredient": "Egg White(s)", "amount": "2", }, {"ingredient": "Cream of Tartar", "amount": "1/4 tsp(1.25mL)"}]
  },
  {
    id: 12,
    imageLocation: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
    title: "The Perfect Souffle",
    description: "Souffle is just a matter of time. The time gap from the oven to the table. There is a famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, I will make the soufflé.",
    createdBy: "Nom.com Selects",
    creationDate: "12/25/2020",
    category: "French Cuisine",
    instructions: ["Give Up", "Order Fast Food", "????", "Profit"],
    ingredients: [{"ingredient": "Butter", "amount": "2 tbsp(30mL)"}, {"ingredient": "Flour", "amount": "2 tbsp(30mL)"}, {"ingredient": "Salt", "amount": "1/2 tsp(2.5mL)"}, {"ingredient": "Milk", "amount": "3/4 cup (175mL)"}, {"ingredient": "Egg Yolk(s)", "amount": "4"}, {"ingredient": "Egg White(s)", "amount": "2", }, {"ingredient": "Cream of Tartar", "amount": "1/4 tsp(1.25mL)"}]
  }];

const RecipeGlanceFrame = () => {

    
  const [state, dispatch] = useStoreContext();

  const setRecommended = () => {
    dispatch({ type: LOADING, loading: true });
    setTimeout(function () {
      dispatch({
        type: SET_RECOMMENDED_RECIPES,
        recipes: dummyRecipeArray,
      });
    }, 1490);
  };

  useEffect(() => {
    setRecommended();
  }, []);

    return (
        <div>
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
            justify='flex-start'
            alignItems='center'
            p={5}>{
                state.recommendedRecipes.length > 0 ? state.recommendedRecipes.map(recipeObj => (
                    <Grid item>
                        <RecipeGlanceCard recipeDetail={recipeObj}/>
                    </Grid>
                )) : (
                    <div>
                        No Recipes Found.
                    </div>
                )
            }
            </Grid>)}
        </div>
    );
};

export default RecipeGlanceFrame;
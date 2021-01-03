import RecipeGlanceCard from "../components/RecipeGlanceCard";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { useStoreContext } from "../utils/GlobalState";
import { SET_RECOMMENDED_RECIPES, LOADING } from "../utils/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeService from "../services/recipe.service";

const dummyRecipeArray = [{
  id: 6,
  imageLocation: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-homemade-pita-0144-portrait-pf-1567692673.jpg",
  title: "Pita",
  description: "Round pita disks",
  publicRecipe: true,
  ingredients: [
      {
          id: 16,
          amount: {
              id: 17,
              amount: "1 clove crushed",
              ingredient: {
                  id: 1,
                  ingredient: "Garlic"
              }
          }
      },
      {
          id: 15,
          amount: {
              id: 16,
              amount: "2 tbsp",
              ingredient: {
                  id: 2,
                  ingredient: "Salt"
              }
          }
      },
      {
          id: 14,
          amount: {
              id: 15,
              amount: "4 cups",
              ingredient: {
                  id: 3,
                  ingredient: "Flour"
              }
          }
      }
  ],
  instructions: [
      {
          id: 8,
          step: {
              id: 6,
              step: "knead until smooth"
          },
          stepOrder: 1
      },
      {
          id: 9,
          step: {
              id: 7,
              step: "let rest for 45-90 min"
          },
          stepOrder: 2
      },
      {
          id: 10,
          step: {
              id: 8,
              step: "punch down dough"
          },
          stepOrder: 3
      },
      {
          id: 11,
          step: {
              id: 9,
              step: "spread dough out and cut into circles, place each on a greased cookie sheet"
          },
          stepOrder: 4
      },
      {
          id: 12,
          step: {
              id: 10,
              step: "bake at 375 for 27-30 min"
          },
          stepOrder: 5
      }
  ],
  category: {
      id: 1,
      category: "Bread"
  }
},
{
  id: 7,
  imageLocation: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-homemade-pita-0144-portrait-pf-1567692673.jpg",
  title: "Pita",
  description: "Round pita disks",
  publicRecipe: true,
  ingredients: [
      {
          id: 16,
          amount: {
              id: 17,
              amount: "1 clove crushed",
              ingredient: {
                  id: 1,
                  ingredient: "Garlic"
              }
          }
      },
      {
          id: 15,
          amount: {
              id: 16,
              amount: "2 tbsp",
              ingredient: {
                  id: 2,
                  ingredient: "Salt"
              }
          }
      },
      {
          id: 14,
          amount: {
              id: 15,
              amount: "4 cups",
              ingredient: {
                  id: 3,
                  ingredient: "Flour"
              }
          }
      }
  ],
  instructions: [
      {
          id: 8,
          step: {
              id: 6,
              step: "knead until smooth"
          },
          stepOrder: 1
      },
      {
          id: 9,
          step: {
              id: 7,
              step: "let rest for 45-90 min"
          },
          stepOrder: 2
      },
      {
          id: 10,
          step: {
              id: 8,
              step: "punch down dough"
          },
          stepOrder: 3
      },
      {
          id: 11,
          step: {
              id: 9,
              step: "spread dough out and cut into circles, place each on a greased cookie sheet"
          },
          stepOrder: 4
      },
      {
          id: 12,
          step: {
              id: 10,
              step: "bake at 375 for 27-30 min"
          },
          stepOrder: 5
      }
  ],
  category: {
      id: 1,
      category: "Bread"
  }
},
{
  id: 9,
  imageLocation: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-homemade-pita-0144-portrait-pf-1567692673.jpg",
  title: "Pita",
  description: "Round pita disks",
  publicRecipe: true,
  ingredients: [
      {
          id: 16,
          amount: {
              id: 17,
              amount: "1 clove crushed",
              ingredient: {
                  id: 1,
                  ingredient: "Garlic"
              }
          }
      },
      {
          id: 15,
          amount: {
              id: 16,
              amount: "2 tbsp",
              ingredient: {
                  id: 2,
                  ingredient: "Salt"
              }
          }
      },
      {
          id: 14,
          amount: {
              id: 15,
              amount: "4 cups",
              ingredient: {
                  id: 3,
                  ingredient: "Flour"
              }
          }
      }
  ],
  instructions: [
      {
          id: 8,
          step: {
              id: 6,
              step: "knead until smooth"
          },
          stepOrder: 1
      },
      {
          id: 9,
          step: {
              id: 7,
              step: "let rest for 45-90 min"
          },
          stepOrder: 2
      },
      {
          id: 10,
          step: {
              id: 8,
              step: "punch down dough"
          },
          stepOrder: 3
      },
      {
          id: 11,
          step: {
              id: 9,
              step: "spread dough out and cut into circles, place each on a greased cookie sheet"
          },
          stepOrder: 4
      },
      {
          id: 12,
          step: {
              id: 10,
              step: "bake at 375 for 27-30 min"
          },
          stepOrder: 5
      }
  ],
  category: {
      id: 1,
      category: "Bread"
  }
}];

const RecipeGlanceFrame = () => {

    
  const [state, dispatch] = useStoreContext();

  const setRecommended = () => {
    RecipeService.getAllRecommendedRecipes()
      .then(res => {
        console.log(res.data);
        res.status === 200 && dispatch({
          type: SET_RECOMMENDED_RECIPES,
          recipes: res.data
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
                    <Grid item key={recipeObj.id}>
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
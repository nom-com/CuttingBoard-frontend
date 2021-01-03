import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import RecipeService from "../services/recipe.service";
import { SET_CURRENT_RECIPE, SET_FAVORITES, LOADING } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import Button from "@material-ui/core/Button";
import StarBorderIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";

// const correctDummyRecipeObj = {
//     id: 6,
//     imageLocation: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-homemade-pita-0144-portrait-pf-1567692673.jpg",
//     title: "Pita",
//     description: "Round pita disks",
//     publicRecipe: true,
//     ingredients: [
//         {
//             id: 16,
//             amount: {
//                 id: 17,
//                 amount: "1 clove crushed",
//                 ingredient: {
//                     id: 1,
//                     ingredient: "Garlic"
//                 }
//             }
//         },
//         {
//             id: 15,
//             amount: {
//                 id: 16,
//                 amount: "2 tbsp",
//                 ingredient: {
//                     id: 2,
//                     ingredient: "Salt"
//                 }
//             }
//         },
//         {
//             id: 14,
//             amount: {
//                 id: 15,
//                 amount: "4 cups",
//                 ingredient: {
//                     id: 3,
//                     ingredient: "Flour"
//                 }
//             }
//         }
//     ],
//     instructions: [
//         {
//             id: 8,
//             step: {
//                 id: 6,
//                 step: "knead until smooth"
//             },
//             stepOrder: 1
//         },
//         {
//             id: 9,
//             step: {
//                 id: 7,
//                 step: "let rest for 45-90 min"
//             },
//             stepOrder: 2
//         },
//         {
//             id: 10,
//             step: {
//                 id: 8,
//                 step: "punch down dough"
//             },
//             stepOrder: 3
//         },
//         {
//             id: 11,
//             step: {
//                 id: 9,
//                 step: "spread dough out and cut into circles, place each on a greased cookie sheet"
//             },
//             stepOrder: 4
//         },
//         {
//             id: 12,
//             step: {
//                 id: 10,
//                 step: "bake at 375 for 27-30 min"
//             },
//             stepOrder: 5
//         }
//     ],
//     category: {
//         id: 1,
//         category: "Bread"
//     }
// }

//Displays a chosen Recipe with id matching www.url.com/recipe/{id}
const Recipe = (props) => {
  //Contains all Relevant Data for Recipe Display
  const [state, dispatch] = useStoreContext();

  //Contains Bool for whether Recipe is one of your favorites or not
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(0);

  const getFavoriteId = () => {
    if (state.favorites.length > 0) {
      for (let i=0;i<state.favorites.length;i++)
      {
        if (state.favorites[i].recipe.id === state.currentRecipe.id){
          console.log("setIsFavorite Before: " + isFavorite);
          setFavoriteId(state.favorites[i].id);
          setIsFavorite(true);
          console.log("setIsFavorite After: " + isFavorite);
        }
      }
    }
    else {
      setIsFavorite(false);
    }
  }
  

  //Loads the list of user's favorites
  const setFavorites = () => {
    dispatch({ type: LOADING, loading: true });
    RecipeService.getFavoriteRecipes()
      .then((res) => {
        console.log(res);
        dispatch({
          type: SET_FAVORITES,
          favorites: res.data,
        });
        getFavoriteId();
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: LOADING, loading: false });
      });
  };

  //Loads the RecipeData for Display
  const handleLoadRecipe = (recipeId) => {
    RecipeService.getRecipeById(recipeId)
      .then(res => {
        console.log(res.data);
        res.status === 200 && dispatch({
          type: SET_CURRENT_RECIPE,
          recipe: res.data
        });
        //Set the State's list of Favorites so we can check if this recipe is a favorite already
        setFavorites();
        //console.log(RecipeService.getCurrentRecipe());
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Adds Favorite to your Favorites
  const handleAddFavorite = (recipeId) => {
    console.log("Recipe ID: " + recipeId);
    RecipeService.postFavoriteRecipe(recipeId)
      .then(res => {
        console.log(res.data);
        //Sets local state flag to true for Button Display
        res.status === 201 && setIsFavorite(true);
        setFavoriteId(res.data.id);
        console.log("isFavorite: " + isFavorite);
      })
      .catch(err => {
        console.log("Recipe is already a favorite or server cannot be reached.");
        dispatch({ type: LOADING, loading: false });
      });
  };

  //Removes Favorite from your Favorites
  const handleRemoveFavorite = (recipeId) => {
    dispatch({ type: LOADING, loading: true });
    console.log(recipeId);
    RecipeService.deleteFavoriteRecipe(recipeId)
      .then((res) => {
        console.log(res);
        setIsFavorite(false);
        dispatch({ type: LOADING, loading: false });
      })
      .catch((err) => {
        console.log(err);
        console.log("DELETE REQUEST, something went wrong");
        dispatch({ type: LOADING, loading: false });
      });
  };


  //  useEffect to API get by ID etc...
  useEffect(() => {
    //Get {id} from URL
    const recipeId = props.match.params.id;

    //Load the Recipe from Back-end
    handleLoadRecipe(recipeId);

    //Check to see if current recipe is in our favorites

  }, [] /*Empty Array Ensures Side Effects only occur once*/
  );

  //When finished, pull apart created JSON obj and display each component
  return (
    <div className='page-body-content'>
      <Paper>
        {console.log(state.currentRecipe)}
        {state.currentRecipe ?
          <React.Fragment>
            <h1>{state.currentRecipe.title}</h1>
            <h3>Recipe #{state.currentRecipe.id}</h3>
            <strong>Category:</strong> {state.currentRecipe.category.category}
            <br /><img style={{ width: 30 + '%' }} src={"http://images.generictech.org/" + state.currentRecipe.imageLocation} />
            <br />
            {!state.loading ? 
              <React.Fragment>
                {isFavorite ? (
                  <Button onClick={() =>   handleRemoveFavorite(favoriteId)} startIcon={<StarIcon />}> Unfavorite</Button>
                ) : (
                  <Button onClick={() =>  handleAddFavorite(state.currentRecipe.id)}startIcon={<StarBorderIcon />}> Favorite</Button>
                )}
              </React.Fragment>
              : <div>Loading</div>
            }
            {state.currentRecipe.description &&
            <React.Fragment>
              <h1>Description:</h1>
              {state.currentRecipe.description}
            </React.Fragment>
            }
            <div id="ingredients-list">
              <h1>Ingredients</h1>
              <ul>
                {state.currentRecipe.ingredients.map(ingredient => (
                  <li key={ingredient.amount.ingredient.ingredient}>
                    {ingredient.amount.amount} {ingredient.amount.ingredient.ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div id="instructions-list">
              <h1>Instructions</h1>
              <ol>
                {state.currentRecipe.instructions.map(instruction => (
                  <li key={instruction.stepOrder}>
                    {instruction.step.step}
                  </li>
                ))}
              </ol>
              <br /><br />
            </div>
          </React.Fragment>
          : <div>
            No Recipes Found.
          </div>
        }
      </Paper>
    </div>
  );
};

export default Recipe;
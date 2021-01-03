import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import RecipeService from "../services/recipe.service";
import {SET_CURRENT_RECIPE} from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

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
  const [recipeData, setRecipeData] = useState({id: null, imageLocation: "", title: "", description: "", publicRecipe: true, ingredients: [], instructions: [], category: {}});
  const [state, dispatch] = useStoreContext();

  //  useEffect to API get by ID etc...
  useEffect(() => {
    //Get {id} from URL
    const recipeId = props.match.params.id;

    //Make call to backend
    const handleLoadRecipe = () => {
      RecipeService.getRecipeById(recipeId)
        .then(res => {
          console.log(res);
          res.status === 200 && dispatch({
            type: SET_CURRENT_RECIPE,
            currentRecipe: res.data
          });
          console.log(RecipeService.getCurrentRecipe());
          setRecipeData(res.data);
        })
        .catch(err => {
            console.log(err);
          });
    };
    //TEMPORARY: Set Dummy Data
    //setRecipeData(correctDummyRecipeObj);

  }, [] /*Empty Array Ensures Side Effects only occur once, might needs props for dependency*/
  );

  //When finished, pull apart created JSON obj and display each component
  return (
    <div className='page-body-content' onLoad={useEffect}>
      <Paper>
        <h1>{recipeData.title}</h1>
        <h3>Recipe #{recipeData.id}</h3>
        <strong>Category:</strong> {recipeData.category.category}
        <br/><img style={{width: 30 + '%'}} src={recipeData.imageLocation}/>
        <h1>Description:</h1>
        {recipeData.description}
        <div id="ingredients-list">
        <h1>Ingredients</h1>
          <ul>
          {recipeData.ingredients.map(ingredient => (
            <li key={ingredient.amount.ingredient.ingredient}>
              {ingredient.amount.amount} {ingredient.amount.ingredient.ingredient}
            </li>
          ))}
          </ul>
        </div>
        <div id="instructions-list">
        <h1>Instructions</h1>
          <ol>
          {recipeData.instructions.map(instruction => (
            <li key={instruction.stepOrder}>
              {instruction.step.step}
            </li>
          ))}
          </ol>
          <br/><br/>
        </div>
      </Paper>
    </div>
  );
};

export default Recipe;
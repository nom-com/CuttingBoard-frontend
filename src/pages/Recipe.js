import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";

const dummyRecipeObj = {
  id: 12,
  imageLocation: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
  title: "The Perfect Souffle",
  description: "Souffle is just a matter of time. The time gap from the oven to the table. There is a famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, I will make the soufflé.",
  createdBy: "Nom.com Selects",
  creationDate: "12/25/2020",
  category: "French Cuisine",
  instructions: ["Give Up", "Order Fast Food", "????", "Profit"],
  ingredients: [{"ingredient": "Butter", "amount": "2 tbsp(30mL)"}, {"ingredient": "Flour", "amount": "2 tbsp(30mL)"}, {"ingredient": "Salt", "amount": "1/2 tsp(2.5mL)"}, {"ingredient": "Milk", "amount": "3/4 cup (175mL)"}, {"ingredient": "Egg Yolk(s)", "amount": "4"}, {"ingredient": "Egg White(s)", "amount": "2", }, {"ingredient": "Cream of Tartar", "amount": "1/4 tsp(1.25mL)"}]
};

//Displays a chosen Recipe with id matching www.url.com/recipe/{id}
const Recipe = (props) => {
  //Contains all Relevant Data for Recipe Display
  const [recipeData, setRecipeData] = useState({id: null, imageLocation: "", title: "", description: "", createdBy: "", creationDate: "", category: "", instructions: [], ingredients: []});
  
  //  useEffect to API get by ID etc...
  useEffect(() => {
    //API Call using matching parameter
    //setRecipeData(doGetRecipe(props.match.params.id));

    //TEMPORARY: Set Dummy Data
    setRecipeData(dummyRecipeObj);

  }, [props] /*Empty Array Ensures Side Effects only occur once, might needs props for dependency*/
  );

  //When finished, pull apart created JSON obj and display each component
  return (
    <div className='page-body-content' onLoad={useEffect}>
      <Paper>
        <h1>{recipeData.title}</h1>
        <h3>Recipe #{recipeData.id}</h3>
        <strong>Created by:</strong> {recipeData.createdBy}
        <br/>{recipeData.creationDate}
        <br/><strong>Category:</strong> {recipeData.category}
        <br/><img src={recipeData.imageLocation}/>
        <h1>Description:</h1>
        {recipeData.description}
        <div id="ingredients-list">
        <h1>Ingredients</h1>
          <ul>
          {recipeData.ingredients.map(ingredient => (
            <li key={ingredient.ingredient}>
              {ingredient.amount} {ingredient.ingredient}
            </li>
          ))}
          </ul>
        </div>
        <div id="instructions-list">
        <h1>Instructions</h1>
          <ol>
            {recipeData.instructions.map(instruction => (
            <li>
              {(instruction)}
            </li>
          ))}
          </ol>
        </div>
      </Paper>
    </div>
  );
};

export default Recipe;
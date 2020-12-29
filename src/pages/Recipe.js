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
  instructions: ["Give Up", "Order Fast Food", "????", "Profit"]
};

//Displays a chosen Recipe with id matching www.url.com/recipe/{id}
const Recipe = (props) => {
  //Contains all Relevant Data for Recipe Display
  const [recipeData, setRecipeData] = useState({id: null, imageLocation: "", title: "", description: "", createdBy: "", creationDate: "", category: "", instructions: []});
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
        <h1>Instructions</h1>
        <div>
          <ol>
          {recipeData.instructions.map(instruction => (
            <li>
              {instruction}
            </li>
          ))}
          </ol>
        </div>
      </Paper>
    </div>
  );
};

export default Recipe;
import React from "react";
import BaseRecipe from "../components/RecipeForms/BaseRecipe";
import RecipeIngredients from "../components/RecipeForms/RecipeIngredients";
import RecipeInstructions from "../components/RecipeForms/RecipeInstructions";

const CreateEdit = () => {
  return (
    <div className='page-body-content'>
      <h1>CreateEdit</h1>
      {/* <BaseRecipe
        editForm
        title={"test title"}
        imageLocation={
          "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chicken_makhani.jpg"
        }
        description={"test description"}
        isPublic={false}
        category={"soup"}
      /> */}
      <BaseRecipe/>
      <RecipeIngredients/>
      <RecipeInstructions/>
    </div>
  );
};

export default CreateEdit;

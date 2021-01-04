import React, { useState } from "react";
import BaseRecipe from "../components/RecipeForms/BaseRecipe";
import FinalSubmitRecipeForm from "../components/RecipeForms/FinalSubmit";
import RecipeIngredients from "../components/RecipeForms/RecipeIngredients";
import RecipeInstructions from "../components/RecipeForms/RecipeInstructions";

const CreateEdit = () => {
  const [index, setIndex] = useState(0);

  const navigateOnSubmit = direction => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + 4) % 4;
    setIndex(newIndex);
  };

  const renderRecipeForm = () => {
    switch (index) {
      case 0:
        return <BaseRecipe navigateOnSubmit={navigateOnSubmit} />;
      case 1:
        return <RecipeIngredients navigateOnSubmit={navigateOnSubmit} />;
      case 2:
        return <RecipeInstructions navigateOnSubmit={navigateOnSubmit} />;
      case 3:
        return <FinalSubmitRecipeForm navigateOnSubmit={navigateOnSubmit} />;
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  return <div className='page-body-content'>{renderRecipeForm()}</div>;
};

export default CreateEdit;

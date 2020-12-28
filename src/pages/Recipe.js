import React from "react";

const dummyRecipeObj = {};

const Recipe = (props) => {

  //  useEffect to API get by ID etc...
  return (
    <div className='page-body-content'>
      <h1>Recipe ID: {props.match.params.id}</h1>
    </div>
  );
};

export default Recipe;
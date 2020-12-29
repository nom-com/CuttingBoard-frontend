import React, { useEffect } from "react";

const dummyRecipeObj = {
  id: 1,
  image_location: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
  title: "The Perfect Souffle",
  description: "Souffle is just a matter of time. The time gap from the oven to the table. So, there is famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, but I will make the soufflé.",
  created_by: "Nom.com Selects",
  creation_date: "12/28/2020",
  category: "French Cuisine",
  instructions: ["Step 1: Give Up", "Step 2: Order Fast Food", "Step 3: ????", "Step 4: Profit"]
};

//Displays a chosen Recipe with id matching www.url.com/recipe/{id}
const Recipe = (props) => {
  //Update via ERD Diagram to contain all relevant fields
  //const [recipeData, setRecipeData] = useState({username: "", password: ""});
  //  useEffect to API get by ID etc...
  useEffect(() => {
    //Code we want to run upon load
    
  }, [] /*Empty Array Ensures Side Effects only occur once*/
  );

  //When finished, pull apart created JSON obj and display each component
  return (
    <div className='page-body-content'>
      <h1>Recipe ID: {props.match.params.id}</h1>
    </div>
  );
};

export default Recipe;
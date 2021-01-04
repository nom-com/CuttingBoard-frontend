import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import ShoppingListService from "../services/shoppinglist.service";

const AddToShopList = props => {

  const handleAddToList = ingredientId => {
    ShoppingListService.postShoppingList({ ingredient: { id: ingredientId } })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <Tooltip title='Add to Shopping List'>
      <IconButton onClick={() => handleAddToList(props.ingredientId)}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AddToShopList;

import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IngredientsList from "../components/IngredientsList";

const ShoppingList = () => {
  return (
    <div className='page-body-content'>
      <Container maxWidth='md'>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          item>
          <Grid item xs={6}>
            <Typography variant='h2' component='h1' align='center'>
              shopping list
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
          </Grid>
          <Grid item md={5} sm={7} xs={12}>
            <IngredientsList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ShoppingList;

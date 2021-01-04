import React from "react";
import FavoritesTable from "../components/FavoritesTable";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const Favorites = () => {
  return (
    <div className='page-body-content'>
      <Container maxWidth='md'>
        <Paper style={{ padding: 20 }}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            item>
            <Grid item>
              <Typography variant='h2' component='h1'>
                favorites manager
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider style={{ marginTop: 10, marginBottom: 20 }} />
            </Grid>
            <Grid item xs={12}>
              <FavoritesTable />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Favorites;

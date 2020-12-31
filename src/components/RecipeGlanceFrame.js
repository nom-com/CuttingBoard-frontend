import RecipeGlanceCard from "../components/RecipeGlanceCard";
import React from "react";
import Grid from "@material-ui/core/Grid";

const RecipeGlanceFrame = () => {
    return (
        <div>
            <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
            p={5}>
            <Grid item>
                <RecipeGlanceCard/>
            </Grid>
            <Grid item>
                <RecipeGlanceCard/>
            </Grid>
            <Grid item>
                <RecipeGlanceCard/>
            </Grid>
            </Grid>
        </div>
    );
};

export default RecipeGlanceFrame;
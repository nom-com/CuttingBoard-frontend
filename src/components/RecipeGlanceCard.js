import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeGlanceCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.recipeDetail.category.category[0]}
            {props.recipeDetail.category.category[1]}
            {props.recipeDetail.category.category[2]}
          </Avatar>
        }
        title={props.recipeDetail.title}
        subheader={props.recipeDetail.category.category}
      />
      <Link to={`/recipe/${props.recipeDetail.id}`}>
        <CardMedia
          className={classes.media}
          image={
            "http://images.generictech.org/" + props.recipeDetail.imageLocation
          }
          title={props.recipeDetail.title}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.recipeDetail.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

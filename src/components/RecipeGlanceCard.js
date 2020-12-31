import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const dummyRecipeObj = {
    id: 12,
    imageLocation: "https://i2.wp.com/eugeniekitchen.com/wp-content/uploads/2012/12/souffle.jpg?zoom=2.625&w=205",
    title: "The Perfect Souffle",
    description: "Souffle is just a matter of time. The time gap from the oven to the table. There is a famous French saying: Le soufflé n’attend pas, on attend le soufflé. Meaning le soufflé doesn’t wait, we (the guests) wait. But today I will not wait for le soufflé, I will make the soufflé.",
    createdBy: "Nom.com Selects",
    creationDate: "12/25/2020",
    category: "French Cuisine",
    instructions: ["Give Up", "Order Fast Food", "????", "Profit"],
    ingredients: [{"ingredient": "Butter", "amount": "2 tbsp(30mL)"}, {"ingredient": "Flour", "amount": "2 tbsp(30mL)"}, {"ingredient": "Salt", "amount": "1/2 tsp(2.5mL)"}, {"ingredient": "Milk", "amount": "3/4 cup (175mL)"}, {"ingredient": "Egg Yolk(s)", "amount": "4"}, {"ingredient": "Egg White(s)", "amount": "2", }, {"ingredient": "Cream of Tartar", "amount": "1/4 tsp(1.25mL)"}]
  };

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeGlanceCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

    //Contains all Relevant Data for Recipe Display
    const [recipeData, setRecipeData] = useState({id: null, imageLocation: "", title: "", description: "", createdBy: "", creationDate: "", category: "", instructions: [], ingredients: []});
  
    //  useEffect to API get by ID etc...
    useEffect(() => {
      //API Call using matching parameter
      //setRecipeData(doGetRecipe(props.match.params.id));
  
      //TEMPORARY: Set Dummy Data
      setRecipeData(dummyRecipeObj);
  
    }, [props] /*Empty Array Ensures Side Effects only occur once, might needs props for dependency*/
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {recipeData.createdBy[0]}{recipeData.createdBy[1]}{recipeData.createdBy[2]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipeData.title}
        subheader={recipeData.creationDate}
      />
      <CardMedia
        className={classes.media}
        /*image="/static/images/cards/paella.jpg"*/
        image={recipeData.imageLocation}
        title={recipeData.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {recipeData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
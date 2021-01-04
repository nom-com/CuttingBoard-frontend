import React, { useEffect, useState } from "react";
import { Divider, Button, TextField } from "@material-ui/core";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_DB_INGREDIENTS, SET_INGREDIENTS } from "../../utils/actions";
import IngredientService from "../../services/ingredient.service";
import DebugData from "../DebugData";
import AddNewIngredient from "./AddNewIngredient";

const validationSchema = Yup.object().shape({
  ingredients: Yup.array().of(
    Yup.object()
      .shape({
        ingredientName: Yup.string().required("Ingredient is required"),
        ingredientAmount: Yup.string().required("Amount is required"),
        ingredientId: Yup.number(),
      })
      .test(
        "unique",
        "Duplicate ingredient in list",
        function validateUnique(currentIngredient) {
          const otherIngredients = this.parent.filter(
            ingredient => ingredient !== currentIngredient
          );
          const isDuplicate = otherIngredients.some(
            ingredient =>
              ingredient.ingredientName === currentIngredient.ingredientName
          );
          return isDuplicate
            ? this.createError({ path: `${this.path}.ingredientName` })
            : true;
        }
      )
  ),
});


const RecipeIngredients = ({ editForm, navigateOnSubmit }) => {
  const [state, dispatch] = useStoreContext();

  const debug = false;

  const ingredientSubmit = values => {
    const parsedIngredients = values.ingredients.map(ingredient => {
      return {
        amount: {
          amount: ingredient.ingredientAmount,
          ingredient: {
            id: ingredient.ingredientId,
          },
        },
      };
    });
    dispatch({
      type: SET_INGREDIENTS,
      ingredients: parsedIngredients,
    });
    navigateOnSubmit("right");
  };

  const getIngredients = () => {
    IngredientService.getAllIngredients()
      .then(res => {
        if (res.data.length > 0) {
          const parsedIngredients = res.data.map(ingredientObj => {
            return {
              id: ingredientObj.id,
              ingredientName: ingredientObj.ingredient,
            };
          });

          dispatch({
            type: SET_DB_INGREDIENTS,
            dbIngredients: [...[{ id: 0, ingredientName: "" }], ...parsedIngredients]
          })
        }
      })
      .then(err => console.log(err));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className='page-body-content'>
      <Formik
        initialValues={{
          ingredients: [
            {
              ingredientName: "",
              ingredientAmount: "",
              ingredientId: 0,
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={ingredientSubmit}>
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
        }) => (
          <Form noValidate autoComplete='off'>
            <Paper
              style={{
                maxWidth: 600,
                margin: "auto",
                marginTop: 30,
                padding: 20,
              }}>
              <FieldArray name='ingredients'>
                {({ push, remove }) => (
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    margin={4}>
                    <Grid item>
                      <Typography variant='h4'>
                        {editForm ? "Edit " : "Add "}Ingredients
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                    </Grid>
                    {values.ingredients.map((p, index) => {
                      const ingredientName = `ingredients[${index}].ingredientName`;
                      const touchedName = getIn(touched, ingredientName);
                      const errorName = getIn(errors, ingredientName);

                      const ingredientAmount = `ingredients[${index}].ingredientAmount`;
                      const touchedAmount = getIn(touched, ingredientAmount);
                      const errorAmount = getIn(errors, ingredientAmount);

                      const ingredientId = `ingredients[${index}].ingredientId`;

                      return (
                        <Grid
                          container
                          direction='row'
                          justify='center'
                          alignItems='center'
                          spacing={2}
                          item
                          xs={12}
                          key={`key-${p}-${index}`}>
                          <Grid item sm={6} xs={12}>
                            <Autocomplete
                              name={ingredientName}
                              value={p.ingredientName}
                              options={state.dbIngredients}
                              getOptionSelected={(option, value) =>
                                option.ingredientName === value
                              }
                              onOpen={handleBlur}
                              getOptionLabel={option => {
                                if (typeof option === "string") {
                                  return option;
                                }
                                if (option.ingredientName) {
                                  return option.ingredientName;
                                }
                                return option.ingredientName;
                              }}
                              onChange={(event, newValue) => {
                                setFieldValue(
                                  ingredientName,
                                  newValue !== null
                                    ? newValue.ingredientName
                                    : ""
                                );
                                setFieldValue(
                                  ingredientId,
                                  newValue !== null ? newValue.id : 0
                                );
                              }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  margin='dense'
                                  label='Ingredient Name'
                                  size='small'
                                  error={Boolean(touchedName && errorName)}
                                  helperText={
                                    touchedName && errorName ? errorName : " "
                                  }
                                  fullWidth
                                  variant='outlined'
                                />
                              )}
                            />
                          </Grid>
                          <Grid item sm={1} />
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              margin='dense'
                              variant='outlined'
                              label='Amount'
                              name={ingredientAmount}
                              value={p.ingredientAmount}
                              required
                              helperText={
                                touchedAmount && errorAmount ? errorAmount : " "
                              }
                              error={Boolean(touchedAmount && errorAmount)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              aria-label='delete'
                              disabled={index === 0}
                              onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid
                      container
                      direction='row'
                      item
                      justify='flex-end'
                      alignItems='flex-end'>
                      <Button
                        type='button'
                        variant='outlined'
                        onClick={() =>
                          push({
                            id: Math.random(),
                            ingredientName: "",
                            ingredientAmount: "",
                          })
                        }>
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </FieldArray>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='flex-end'>
                <Button
                  type='submit'
                  variant='outlined'
                  // disabled={!isValid || values.ingredients.length === 0}
                  endIcon={<NavigateNextIcon />}>
                  next
                </Button>
              </Grid>
              {debug && (
                <DebugData values={state.ingredients} errors={errors} />
              )}
            </Paper>
          </Form>
        )}
      </Formik>
      <AddNewIngredient />
    </div>
  );
};

export default RecipeIngredients;

import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IngredientService from "../../services/ingredient.service";
import { useStoreContext } from "../../utils/GlobalState";
import DebugData from "../DebugData";
import { SET_DB_INGREDIENTS } from "../../utils/actions";

const validationSchema = Yup.object().shape({
  ingredient: Yup.string()
    .min(5, "Ingredient must contain at least 5 characters")
    .required("Enter a recipe ingredient"),
});

const AddNewIngredient = ({ ingredient, editForm }) => {
  const [state, dispatch] = useStoreContext();

  const debug = false;

  const ingredientSubmit = (values, { setSubmitting, setFieldError }) => {
    // console.log(values);

    IngredientService.postIngredient(values)
      .then(res => {
        // console.log(res);
        res.status === 201 &&
          IngredientService.getAllIngredients().then(res => {
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
          });
      })
      .catch(err => {
        console.log(err);
      });
    setSubmitting(false);
  };

  return (
    <div className='page-body-content'>
      <Formik
        initialValues={{
          ingredient: ingredient || "",
        }}
        initialTouched={{
          ingredient: false,
        }}
        initialErrors={{
          ingredient: false,
        }}
        initialStatus={{
          ingredient: false,
        }}
        validationSchema={validationSchema}
        onSubmit={ingredientSubmit}>
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form noValidate autoComplete='off'>
            <Paper
              style={{
                maxWidth: 600,
                margin: "auto",
                marginTop: 30,
                padding: 20,
              }}>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'>
                <Grid item>
                  <Typography variant='h6'>
                    Don't see an ingredient in our database?
                  </Typography>
                  <Typography variant='subtitle1'>
                    feel free to add it below...
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin='dense'
                    size='small'
                    error={touched.ingredient && Boolean(errors.ingredient)}
                    id='ingredient'
                    label='Ingredient'
                    value={values.ingredient}
                    placeholder='Sage'
                    helperText={
                      touched.ingredient && errors.ingredient
                        ? errors.ingredient
                        : " "
                    }
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                </Grid>
                <Grid container item justify='flex-end' alignItems='flex-end'>
                  <Button
                    type='submit'
                    variant='outlined'
                    disabled={isSubmitting}
                    endIcon={<NavigateNextIcon />}>
                    Next
                  </Button>
                </Grid>
              </Grid>
              {debug && (
                <DebugData values={state.ingredients} errors={errors} />
              )}
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewIngredient;

import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_RECIPE_DETAIL } from "../../utils/actions";
import CategoryService from "../../services/category.service";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must contain at least 5 characters")
    .required("Enter a recipe title"),
  imageLocation: Yup.string(),
  description: Yup.string().required("Required"),
  isPublic: Yup.boolean(),
  category: Yup.string().required("Select a recipe category"),
});

const RecipeForm = props => {
  const [state, dispatch] = useStoreContext();
  const [recipeCategory, setRecipeCategory] = useState([]);

  const debug = true;
  const {
    editForm,
    title,
    imageLocation,
    description,
    isPublic,
    category,
  } = props;

  const recipeSubmit = (values, { setSubmitting }) => {
    dispatch({
      type: SET_RECIPE_DETAIL,
      recipeDetail: values,
    });
    setSubmitting(false);
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const getCategories = () => {
    CategoryService.getAllCategories().then(res => {
      console.log(res);
      if (res.data.length > 0){
        let categoryArr = res.data.map((categoryObj) => {
          return {
            value: categoryObj.category,
            label: capitalize(categoryObj.category)
          }
        })
        setRecipeCategory(categoryArr)
      }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='page-body-content'>
      <Paper>
        <Formik
          initialValues={{
            title: title || "",
            imageLocation: imageLocation || "",
            description: description || "",
            isPublic: isPublic || false,
            category: category || "",
          }}
          initialTouched={{
            title: false,
            imageLocation: false,
            description: false,
            isPublic: false,
            category: false,
          }}
          initialErrors={{
            title: false,
            imageLocation: false,
            description: false,
            isPublic: false,
            category: false,
          }}
          initialStatus={{
            title: false,
            imageLocation: false,
            description: false,
            isPublic: false,
            category: false,
          }}
          validationSchema={validationSchema}
          onSubmit={recipeSubmit}>
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form
              noValidate
              autoComplete='off'
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
                  <Typography variant='h2'>
                    {editForm ? "Edit Recipe" : "Create Recipe"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin='dense'
                    size='small'
                    error={touched.title && Boolean(errors.title)}
                    id='title'
                    label='Title'
                    value={values.title}
                    placeholder='Brown Butter Chicken'
                    helperText={
                      touched.title && errors.title ? errors.title : " "
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
                  <TextField
                    select
                    id='category'
                    name='category'
                    label='Select a Category'
                    margin='dense'
                    variant='outlined'
                    error={touched.category && Boolean(errors.category)}
                    onChange={handleChange}
                    value={values.category}
                    helperText={
                      touched.category && errors.category
                        ? errors.category
                        : " "
                    }
                    fullWidth>
                    {recipeCategory.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin='dense'
                    size='small'
                    error={
                      touched.imageLocation && Boolean(errors.imageLocation)
                    }
                    id='imageLocation'
                    label='Image URL'
                    value={values.imageLocation}
                    helperText={
                      touched.imageLocation && errors.imageLocation
                        ? errors.imageLocation
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
                  <TextField
                    margin='dense'
                    size='small'
                    error={touched.description && Boolean(errors.description)}
                    id='description'
                    label='Description'
                    multiline
                    rows={4}
                    placeholder='A delicious and savory take on the classic...'
                    value={values.description}
                    helperText={
                      touched.description && errors.description
                        ? errors.description
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.isPublic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='isPublic'
                        inputProps={{ "aria-label": "make public or private" }}
                      />
                    }
                    label={
                      values.isPublic ? "Recipe is public" : "Recipe is private"
                    }
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
                <>
                  <pre style={{ textAlign: "left" }}>
                    <strong>Values</strong>
                    <br />
                    {JSON.stringify(state.recipeDetail, null, 2)}
                  </pre>
                  <pre style={{ textAlign: "left" }}>
                    <strong>Errors</strong>
                    <br />
                    {JSON.stringify(errors, null, 2)}
                  </pre>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default RecipeForm;

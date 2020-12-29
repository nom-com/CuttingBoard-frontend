import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import API from "../../utils/API";

const recipeSubmit = (
  values,
  { setSubmitting, resetForm, setFieldError, setStatus }
) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    // resetForm();
    setSubmitting(false);
  }, 1000);
};

const RecipeForm = props => {
  const {
    editForm,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const recipeCategory = [
    {
      value: "soup",
      label: "Soup",
    },
    {
      value: "pasta",
      label: "Pasta",
    },
    {
      value: "dessert",
      label: "Dessert",
    },
  ];

  return (
    <div className='page-body-content'>
      <Paper>
        <form
          id='recipe-form'
          style={{
            maxWidth: 600,
            margin: "auto",
            marginTop: 30,
            padding: 20,
          }}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}>
          <Grid container direction='row' justify='center' alignItems='center'>
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
                helperText={touched.title && errors.title ? errors.title : " "}
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
                  touched.category && errors.category ? errors.category : " "
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
                error={touched.imageLocation && Boolean(errors.imageLocation)}
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
                endIcon={<NavigateNextIcon/>}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

const BaseRecipe = withFormik({
  mapPropsToValues: ({
    title,
    imageLocation,
    description,
    isPublic,
    category,
  }) => {
    return {
      title: title || "",
      imageLocation: imageLocation || "",
      description: description || "",
      isPublic: isPublic || false,
      category: category || "",
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must contain at least 5 characters")
      .required("Enter a recipe title"),
    imageLocation: Yup.string(),
    description: Yup.string().required("Required"),
    isPublic: Yup.boolean(),
    category: Yup.string().required("Select a recipe category"),
  }),
  handleSubmit: recipeSubmit,
})(RecipeForm);

export default BaseRecipe;

import React from "react";
import { Divider, Button, TextField } from "@material-ui/core";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const instructionSubmit = values => {
  console.log("onSubmit", JSON.stringify(values, null, 2));
};

const validationSchema = Yup.object().shape({
  instructions: Yup.array().of(
    Yup.object().shape({
      instruction: Yup.string().required("Instruction is required"),
    })
  ),
});

const debug = false;

const RecipeInstructions = ({ editForm }) => {
  return (
    <div className='page-body-content'>
      <Paper>
        <Formik
          initialValues={{
            instructions: [
              {
                id: Math.random(),
                instruction: "",
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={instructionSubmit}>
          {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
            <Form
              noValidate
              autoComplete='off'
              style={{
                maxWidth: 600,
                margin: "auto",
                marginTop: 30,
                padding: 20,
              }}>
              <FieldArray name='instructions'>
                {({ push, remove }) => (
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    margin={4}>
                    <Grid item>
                      <Typography variant='h2'>
                        {editForm ? "Edit " : "Add "}Instructions
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                    </Grid>
                    {values.instructions.map((p, index) => {
                      const instruction = `instructions[${index}].instruction`;
                      const touchedInstruction = getIn(touched, instruction);
                      const errorInstruction = getIn(errors, instruction);

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
                          <Grid item xs={1}>
                            <Typography variant='body1'>
                              {index + 1}.
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              margin='dense'
                              variant='outlined'
                              label='Instruction'
                              name={instruction}
                              value={p.instruction}
                              required
                              helperText={
                                touchedInstruction && errorInstruction
                                  ? errorInstruction
                                  : " "
                              }
                              error={Boolean(
                                touchedInstruction && errorInstruction
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              aria-label='delete'
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
                            instruction: "",
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
                //   disabled={!isValid || values.instructions.length === 0}
                  endIcon={<NavigateNextIcon />}>
                  next
                </Button>
              </Grid>
              {debug && (
                <>
                  <pre style={{ textAlign: "left" }}>
                    <strong>Values</strong>
                    <br />
                    {JSON.stringify(values, null, 2)}
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

export default RecipeInstructions;

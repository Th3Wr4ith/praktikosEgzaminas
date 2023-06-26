import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import "dayjs/locale/lt";
import { incomeValidationSchema } from "../validations/validations";

function AddIncomeForm({ handleSubmit, isLoading, success }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordionChange = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>ADD INCOMES</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Add an income
          </Typography>
          <Formik
            initialValues={{ name: "", amount: "", date: null }}
            validationSchema={incomeValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              dirty,
              isValid,
              setFieldValue,
              values,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      autoComplete="off"
                      fullWidth
                      required
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="amount"
                      label="Amount"
                      autoComplete="off"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      error={touched.amount && Boolean(errors.amount)}
                      helperText={touched.amount && errors.amount}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const regex = /^\d{0,7}(?:\.\d{1,2})?$/;
                        const isValid = regex.test(e.target.value);
                        if (isValid) {
                          setFieldValue("amount", e.target.value);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="lt"
                      >
                        <Field
                          as={DatePicker}
                          name="date"
                          label="Date *"
                          value={values.date}
                          disableFuture={true}
                          onChange={(value) => setFieldValue("date", value)}
                          renderInput={(params) => <TextField {...params} />}
                          onBlur={() => setFieldTouched("date", true)}
                          required
                          error={touched.date}
                          helperText={touched.date}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button> */}
                    <LoadingButton
                      loading={isLoading}
                      loadingPosition="start"
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      color="primary"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={3}>
                    {success && (
                      <Alert severity="success">Added successfully</Alert>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

export default AddIncomeForm;

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
    Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import { categoriesValidationSchema } from "../validations/validations";

function AddCategoriesForm({ handleSubmit, isLoading, success }) {
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
                <Typography>ADD CATEGORY</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Add category name
                    </Typography>
                    <Formik
                        initialValues={{ name: "" }}
                        validationSchema={categoriesValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            dirty,
                            isValid,
                            setFieldValue,
                            values,
                            errors,
                            touched,
                        }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl style={{width: "100%"}}>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                labelId="demo-simple-select-label"
                                                id="name"
                                                label="Category name"
                                                required
                                                onChange={(event) => {
                                                    setFieldValue("name", event.target.value);
                                                }}
                                                error={touched.name && Boolean(errors.name)}
                                            >
                                            </Field>
                                            <FormHelperText sx={{ color: "red" }}>
                                                {touched.name && errors.name}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
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

export default AddCategoriesForm;

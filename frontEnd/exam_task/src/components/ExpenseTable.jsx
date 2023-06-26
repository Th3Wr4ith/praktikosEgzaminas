import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

import dayjs from "dayjs";
import "dayjs/locale/lt";
import { expenseValidationSchema } from "../validations/validations";

function expensesTable({ expenses, handleDelete, categories }) {
  // const expenseValidationSchema = (expenses) => {
  //   const fields = {};
  //   Object.keys(expenses).map((key) => {
  //     fields[`${key}.amount`] = Yup.string()
  //       .matches(
  //         /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //         "Phone number is not valid"
  //       )
  //       .typeError("Amount must be a number")
  //       .required("Amount is required")
  //       .nullable(false);
  //     fields[`${key}.date`] = Yup.date().required("Date is required");
  //     fields[`${key}.name`] = Yup.string().required("Name is required");
  //     fields[`${key}.category`] = Yup.string().required("Category is required");
  //   });
  //   return Yup.object().shape(fields);
  // };
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(-1);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleConfirm = async (id, editedValue) => {
    setEditingId(null);
    try {
      await axios.put(
        `http://localhost:8080/api/v1/expenses/${id}`,
        editedValue
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDeleteAndSetState = (id) => {
    handleDelete(id);
    setConfirmDeleteIndex(-1);
  };

  return (
    <TableContainer component={Paper}>
      <Formik
        enableReinitialize
        initialValues={expenses}
        onSubmit={handleConfirm}
        //need to make a validation for example that it will validate where the field name is 0.name, because it maps the values and gives the name depending on the key
        validationSchema={expenseValidationSchema}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Table sx={{ minWidth: 650 }} aria-label="expenses table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(values).map((key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {editingId === key ? (
                        <>
                          <Field
                            as={TextField}
                            fullWidth
                            name={`${key}.amount`}
                            value={values[key].amount}
                            onChange={(e) =>
                              setFieldValue(`${key}.amount`, e.target.value)
                            }
                            //this returns always false.
                            error={
                              touched[`${key}.amount`] &&
                              Boolean(errors[`${key}.amount`])
                            }
                            helperText={
                              touched[`${key}.amount`] &&
                              errors[`${key}.amount`]
                            }
                          />
                        </>
                      ) : (
                        values[key].amount
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === key ? (
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="lt"
                        >
                          <Field
                            as={DatePicker}
                            name={`${key}.date`}
                            fullWidth
                            disableFuture={true}
                            format="YYYY-MM-DD"
                            value={dayjs(values[key].date, "YYYY-MM-DD")}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(newValue) =>
                              setFieldValue(
                                `${key}.date`,
                                dayjs(newValue).format("YYYY-MM-DD")
                              )
                            }
                          />
                        </LocalizationProvider>
                      ) : (
                        values[key].date
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === key ? (
                        <Field
                          as={TextField}
                          fullWidth
                          name={`${key}.name`}
                          value={values[key].name}
                          error={
                            touched[`${key}.name`] &&
                            Boolean(errors[`${key}.name`])
                          }
                          helperText={
                            touched[`${key}.name`] && errors[`${key}.name`]
                          }
                          onChange={(e) =>
                            setFieldValue(`${key}.name`, e.target.value)
                          }
                        />
                      ) : (
                        values[key].name
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {editingId === key ? (
                        <FormControl fullWidth required>
                          <InputLabel
                            id={`${key}-category-label`}
                            error={touched.category && Boolean(errors.category)}
                            required
                          >
                            Category
                          </InputLabel>
                          <Field
                            as={Select}
                            name={`${key}.categoryName`}
                            labelId={`${key}-category-label`}
                            id={`${key}-category`}
                            label="Category"
                            value={values[key]?.categoryName || ""}
                            onChange={(event) => {
                              setFieldValue(`${key}.categoryName`, event.target.value);
                            }}
                            error={
                              touched[key]?.category &&
                              Boolean(errors[key]?.category)
                            }
                          >
                            {categories.map((category) => (
                              <MenuItem
                                key={category.name}
                                value={category.name}
                              >
                                {category.name}
                              </MenuItem>
                            ))}
                          </Field>
                          <FormHelperText sx={{ color: "red" }}>
                            {touched[key]?.category && errors[key]?.category}
                          </FormHelperText>
                        </FormControl>
                      ) : (
                        values[key].categoryName
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {editingId === key ? (
                        <>
                          <IconButton
                            aria-label="save"
                            onClick={() =>
                              handleConfirm(expenses[key].id, values[key])
                            }
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            aria-label="cancel"
                            onClick={handleCancel}
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(key)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {confirmDeleteIndex === parseInt(key) ? (
                        <>
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteAndSetState(expenses[key].id)
                            }
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            aria-label="cancel"
                            onClick={() => setConfirmDeleteIndex(-1)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          onClick={() => setConfirmDeleteIndex(parseInt(key))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Form>
        )}
      </Formik>
    </TableContainer>
  );
}
export default expensesTable;

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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/lt";
import { incomeValidationSchema } from "../validations/validations";
function IncomeTable({ income, handleDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(-1);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleConfirm = async (id, editedValue) => {
    setEditingId(null);
    try {
      await axios.put(
        `http://localhost:8080/api/v1/incomes/${id}`,
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
        initialValues={income}
        onSubmit={handleConfirm}
        validationSchema={incomeValidationSchema}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Table sx={{ minWidth: 650 }} aria-label="income table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(values).map((key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {editingId === key ? (
                        <Field
                          as={TextField}
                          fullWidth
                          disableFuture={true}
                          name={`${key}.amount`}
                          value={values[key].amount}
                          error={touched.amount && Boolean(errors.amount)}
                          helperText={touched.amount && errors.amount}
                        />
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
                            value={dayjs(values[key].date, "YYYY-MM-DD")}
                            onChange={(newValue) =>
                              setFieldValue(
                                `${key}.date`,
                                dayjs(newValue).format("YYYY-MM-DD")
                              )
                            }
                            renderInput={(params) => <TextField {...params} />}
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
                        />
                      ) : (
                        values[key].name
                      )}
                    </TableCell>

                    <TableCell align="right">
                      {editingId === key ? (
                        <>
                          <IconButton
                            aria-label="save"
                            type="submit"
                            onClick={() =>
                              handleConfirm(income[key].id, values[key])
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
                              handleDeleteAndSetState(income[key].id)
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
export default IncomeTable;

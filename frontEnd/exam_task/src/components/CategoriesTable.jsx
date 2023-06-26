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
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { categoriesValidationSchema } from "../validations/validations";

function CategoriesTable({ categories, handleDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(-1);

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleConfirm = async (id, editedValue) => {
        setEditingId(null);
        try {
            await axios.put(
                `http://localhost:8080/api/v1/categories/${id}`,
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
                initialValues={categories}
                onSubmit={handleConfirm}
                //need to make a validation for example that it will validate where the field name is 0.name, because it maps the values and gives the name depending on the key
                validationSchema={categoriesValidationSchema}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <Table sx={{ minWidth: 650 }} aria-label="categories table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bold'}}>Category name</TableCell>
                                    <TableCell align="right" style={{fontWeight: 'bold'}}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(values).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {editingId === key ? (
                                                <FormControl fullWidth>
                                                    <InputLabel
                                                        id={`${key}.name`}
                                                        error={touched.name && Boolean(errors.name)}
                                                    >
                                                    </InputLabel>
                                                    <Field
                                                        as={TextField}
                                                        name={`${key}.name`}
                                                        labelId={`${key}.name`}
                                                        id={`${key}.name`}
                                                        label="Category name"
                                                        required
                                                        value={values[key]?.name || ""}
                                                        onChange={(event) => {
                                                            setFieldValue(
                                                                `${key}.name`,
                                                                event.target.value
                                                            );
                                                        }}
                                                        error={
                                                            touched[key]?.name &&
                                                            Boolean(errors[key]?.name)
                                                        }
                                                    >
                                                        {categories.map((name) => (
                                                            <MenuItem
                                                                key={name.value}
                                                                value={name.value}
                                                            >
                                                                {name.value}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                    <FormHelperText sx={{ color: "red" }}>
                                                        {touched[key]?.name && errors[key]?.name}
                                                    </FormHelperText>
                                                </FormControl>
                                            ) : (
                                                values[key].name
                                            )}
                                        </TableCell>

                                        <TableCell align="right">
                                            {editingId === key ? (
                                                <>
                                                    <IconButton
                                                        aria-label="save"
                                                        onClick={() =>
                                                            handleConfirm(categories[key].id, values[key])
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
                                                            handleDeleteAndSetState(categories[key].id)
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
export default CategoriesTable;

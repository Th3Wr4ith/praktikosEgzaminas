import * as Yup from "yup";

const mechanicsValidationSchema = Yup.object().shape({
  amount: Yup.string()
    .matches(/^\d{0,7}(?:\.\d{1,2})?$/, "Invalid amount")
    .test(
      "positive",
      "Amount must be positive",
      (value) => parseFloat(value) > 0
    )
    .required("Amount is required"),
  date: Yup.date("Date is Required")
    .typeError("Date is required")
    .nullable(false)
    .required("Date is required"),
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-žA-Ž ]+$/, "Name can only contain Latin letters and spaces"),
  category: Yup.string().required("The category is required"),
});

const carShopsValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .matches(/^[a-žA-Ž ]+$/, "Name can only contain Latin letters and spaces"),
});

export {
  mechanicsValidationSchema,
  carShopsValidationSchema,
};

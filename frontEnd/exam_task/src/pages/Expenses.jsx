import { useEffect, useState } from "react";
import axios from "axios";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

function Expenses() {
  const [expenses, setExpenses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    fetchExpenses();
    fetchCategories();
    return () => setIsMounted(false);
  }, []);
  //TODO: move these calls to a service
  const fetchExpensesOnDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // set loading state back to false regardless of success or error
    }
  };

 const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/categories");
      setCategories(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/expenses");
      if (isMounted && response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const newExpense = {
      name: values.name,
      amount: parseFloat(values.amount),
      date: values.date.toISOString().substr(0, 10),
      categoryName: values.category,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/expenses",
        newExpense
      );
      resetForm();
      fetchExpenses();
    }
    catch (error) {
      console.log("Error adding expense:", error);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/api/v1/expenses/${id}`;
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      fetchExpensesOnDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddExpenseForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        success={showAlert}
        categories={categories}
      />
      <ExpenseTable expenses={expenses} handleDelete={handleDelete} categories={categories} />
    </>
  );
}

export default Expenses;

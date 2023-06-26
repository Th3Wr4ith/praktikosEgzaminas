import AddIncomeForm from "../components/AddIncomeForm";
import IncomeTable from "../components/IncomeTable";
import { useEffect, useState } from "react";
import axios from "axios";

function Incomes() {
  const [incomes, setIncomes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchIncomes();
    return () => setIsMounted(false);
  }, []);

  //TODO: move these calls to a service
  const fetchIncomes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/incomes");
      if (isMounted && response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
      setIncomes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIncomesOnDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/incomes");
      setIncomes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(incomes);

  const handleSubmit = async (values, { resetForm }) => {
    const newIncome = {
      amount: parseFloat(values.amount),
      date: values.date.toISOString().substr(0, 10),
      name: values.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/incomes",
        newIncome
      );
      if (response.status === 200) {
        resetForm();
        fetchIncomes();
      } else {
        console.log("Error adding income: unexpected status code");
      }
    } catch (error) {
      console.log("Error adding income:", error);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/api/v1/incomes/${id}`;
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      fetchIncomesOnDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddIncomeForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        success={showAlert}
      />
      <IncomeTable income={incomes} handleDelete={handleDelete} />
    </>
  );
}

export default Incomes;

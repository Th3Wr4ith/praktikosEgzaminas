import { useEffect, useState } from "react";
import axios from "axios";
import AddMechanicForm from "../components/AddMechanicForm";
import MechanicsTable from "../components/MechanicTable";

function Mechanic() {
  const [mechanic, setMechanic] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [carShop, setCarShop] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    fetchMechanic();
    fetchCarShop();
    return () => setIsMounted(false);
  }, []);

  const fetchMechanicOnDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/mechanics");
      setMechanic(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCarShop = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/carshops");
      setCarShop(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };

  const fetchMechanic = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/mechanics");
      if (isMounted && response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
      setMechanic(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const newMechanic = {
      name: values.name,
      surname: values.surname,
      specialty: values.specialty,
      city: values.city,
      carShopName: values.carShop,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/mechanics",
        newExpense
      );
      resetForm();
      fetchMechanic();
    }
    catch (error) {
      console.log("Error adding mechanic:", error);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/api/v1/mechanics/${id}`;
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      fetchMechanicOnDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddMechanicForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        success={showAlert}
        carShop={carShop}
      />
      <MechanicsTable mechanic={mechanic} handleDelete={handleDelete} carShop={carShop} />
    </>
  );
}

export default Mechanic;

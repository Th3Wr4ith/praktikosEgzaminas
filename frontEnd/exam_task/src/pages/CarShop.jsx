import { useEffect, useState } from "react";
import axios from "axios";
import AddCarShopForm from "../components/AddCarShopForm";
import CarShopTable from "../components/CarShopTable";

function CarShop() {
    const [carShop, setCarShop] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchCarShop();
        return () => setIsMounted(false);
    }, []);

    const fetchCarShopOnDelete = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/carshops");
            setCarShop(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCarShop = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/carshops");
            if (isMounted && response.status === 200) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
            setCarShop(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);
        const newCarShop = {
            name: values.name,
            address: values.address,
            manager: values.manager,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/carshops",
                newCategory
            );
            resetForm();
            fetchCarShop();

        } catch (error) {
            console.log("Error adding category:", error);
        }
    };

    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/v1/carshops/${id}`;
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            fetchCarShopOnDelete();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AddCarShopForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                success={showAlert}
            />
            <CarShopTable carShop={carShop} handleDelete={handleDelete} />
        </>
    );
}

export default CarShop;

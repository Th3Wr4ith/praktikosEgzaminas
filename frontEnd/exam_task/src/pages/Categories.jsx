import { useEffect, useState } from "react";
import axios from "axios";
import AddCategoriesForm from "../components/AddCategoriesForm";
import CategoriesTable from "../components/CategoriesTable";

function Categories() {
    const [categories, setCategories] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchCategories();
        return () => setIsMounted(false);
    }, []);
    //TODO: move these calls to a service
    const fetchCategoriesOnDelete = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // set loading state back to false regardless of success or error
        }
    };

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/categories");
            if (isMounted && response.status === 200) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);
        const newCategory = {
            name: values.name
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/categories",
                newCategory
            );
            resetForm();
            fetchCategories();

        } catch (error) {
            console.log("Error adding category:", error);
        }
    };

    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/v1/categories/${id}`;
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            fetchCategoriesOnDelete();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AddCategoriesForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                success={showAlert}
            />
            <CategoriesTable categories={categories} handleDelete={handleDelete} />
        </>
    );
}

export default Categories;

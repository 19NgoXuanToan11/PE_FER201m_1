import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddEdit.css";

const URL = "https://64b228c238e74e386d54b964.mockapi.io/pe";

const initialState = {
    name: "",
    price: "",
    description: "",
    rating: "",
    category: "",
    bestseller: false,
    image: null,
};

const error_init = {
    name_err: "",
    price_err: "",
    description_err: "",
    rating_err: "",
    category_err: "",
    bestseller_err: "",
    image_err: "",
};

const FormAddEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const { name, price, description, rating, category } = state;
    const [errors, setErrors] = useState(error_init);

    const getOneProduct = async (id) => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    };

    useEffect(() => {
        if (id) getOneProduct(id);
        console.log(id);
    }, [id]);

    const updateProduct = async (id, data) => {
        const res = await axios.put(`${URL}/${id}`, data);
        console.log("1111");
        if (res.status === 200) {
            toast.success(`Updated Product with ID: ${id} successfully ~`);
            navigate("/dashboard");
        }
    };

    const addNewProduct = async (data) => {
        const res = await axios.post(`${URL}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New Product has been added successfully ~");
            navigate("/dashboard");
        }
    };

    // validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (name.trim() === "") {
            errors.name_err = "Name is Required";
            isValid = false;
        }

        if (isNaN(price) || parseInt(price) < 1 || price === "") {
            errors.price_err =
                "Price must be a positive number and more than 0";
            isValid = false;
        }
        
        if (description.trim() === "") {
            errors.description_err = "Description is required";
            isValid = false;
        }
        
        if (isNaN(rating) || parseInt(rating) < 1 || rating === "") {
            errors.rating_err =
                "Rating must be a positive number and more than 0";
            isValid = false;
        }
        
        if (category.trim() === "") {
            errors.description_err = "Category is required";
            isValid = false;
        }

        setErrors(errors);
        
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) updateProduct(id, state);
            else addNewProduct(state);
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    };

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    };

    return (
        <div className="container">
            <div className="form">
                <h2>{id ? "Update Form" : "Add New Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleInputChange}
                        />
                        {errors.name_err && (
                            <span className="error">{errors.name_err}</span>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={state.price}
                            onChange={handleInputChange}
                        />
                        {errors.price_err && (
                            <span className="error">{errors.price_err}</span>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input
                            type="text"
                            name="description"
                            value={state.description}
                            onChange={handleInputChange}
                        />
                        {errors.description_err && (
                            <span className="error">
                                {errors.description_err}
                            </span>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="rating">Rating: </label>
                        <input
                            type="number"
                            name="rating"
                            value={state.rating}
                            onChange={handleInputChange}
                        />
                        {errors.rating_err && (
                            <span className="error">{errors.rating_err}</span>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="category">Category: </label>
                        <input
                            type="text"
                            name="category"
                            value={state.category}
                            onChange={handleInputChange}
                        />
                        {errors.category_err && (
                            <span className="error">{errors.category_err}</span>
                        )}
                    </div>
                    
                    <button type="submit" className="form-button">
                        {id ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormAddEdit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const URL = "https://64b228c238e74e386d54b964.mockapi.io/pe";

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await axios.get(`${URL}`);
        setProducts(res.data);
    };

    const isLogin = localStorage.getItem("isLogin");

    useEffect(() => {
        getProducts();
    }, [isLogin]);

    const handleDelete = async (id) => {
        if (
            window.confirm(
                `Are you sure that you want to delete Product with ID: ${id}`
            )
        ) {
            const res = await axios.delete(`${URL}/${id}`);
            if (res.status === 200) {
                getProducts();
                toast.success("Deleted Successfully ~");
            } else {
                toast.error("Delete: Error!");
            }
        }
    };

    return (
        <div className="staff-table">
            <div className="btn-add">
                <Link to={"/add/"}>
                    <button className="add-staff-btn">ADD NEW PRODUCT</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.map((product) => {
                            // if (product.bestseller === true)
                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        <img src={product.image} />
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.rating}</td>
                                    <td>{product.category}</td>
                                    {isLogin && (
                                        <td>
                                            <Link to={`/update/${product.id}`}>
                                                <button>Update</button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

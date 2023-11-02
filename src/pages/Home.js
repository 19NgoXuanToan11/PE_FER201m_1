import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const URL = "https://64b228c238e74e386d54b964.mockapi.io/pe";

const Home = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetchData();
        console.log(products);
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}`);
            setProducts(response.data);
            console.log(products);
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    return (
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
                        if (product.bestseller === true)
                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.id}
                                        />
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.rating}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Link to={`/detail/${product.id}`}>
                                            <button>Detail</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                    })}
            </tbody>
        </table>
    );
};

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Produits = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let apiUrl = "http://localhost:8095/productsearchsort?";
            let queryParams = [];

            if (searchTerm) {
                queryParams.push(`productName=${searchTerm}`);
            }

            if (categoryFilter) {
                queryParams.push(`type=${categoryFilter}`);
            }

            if (sortBy) {
                queryParams.push(`sortBy=${sortBy}`);
            }

            if (queryParams.length > 0) {
                apiUrl += queryParams.join("&");
            }

            try {
                const response = await axios.get(apiUrl, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                });
                console.log(apiUrl);
                setProducts(response.data.results.bindings);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [searchTerm, sortBy, categoryFilter]);

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Products</h4>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Product Name"
                    />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="Price">Price</option>
                        <option value="Quantity">Quantity</option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">Filter by Category</option>
                        <option value="Mobility">Mobility</option>
                        <option value="Electronics">Electronics</option>
                    </select>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name.value}</td>
                                        <td>{item.price.value}</td>
                                        <td>{item.quantity.value}</td>
                                        <td className="truncate-text">{item.description.value}</td>
                                        <td>{item.type.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Produits;
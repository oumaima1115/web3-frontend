import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Produits = () => {
    const [Produits, setProduits] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async (searchTerm = "") => {
        let apiUrl = "http://localhost:8095/product";
        if (searchTerm) {
            apiUrl = `http://localhost:8095/productsearch?productName=${searchTerm}`;
        }

        try {
            const response = await axios.get(apiUrl, {
                headers: { "Access-Control-Allow-Origin": "*" }
            });
            setProduits(response.data.results.bindings);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error state here
        }
    };

    useEffect(() => {
        fetchData(searchTerm);
    }, [searchTerm]);

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Produits</h4>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Product Name"
                    />
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
                                {Produits?.map((item, index) => (
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
    )
}

export default Produits;

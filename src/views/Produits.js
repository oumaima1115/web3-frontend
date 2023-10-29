import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Chaud = () => {
    const [Chaud, setChaud] = useState(null);
    const [Froid, setFroid] = useState(null);
    const [Cuisson, setCuisson] = useState(null);
    const [SoinMaison, setSoinMaison] = useState(null);


    async function fetchData() {
        console.log("aaaaaaa");

        axios
            .get(`http://localhost:8095/post`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setChaud(res.data.results.bindings);
            });


        axios
            .get(`http://localhost:8095/froid`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setFroid(res.data.results.bindings);
            });


        axios
            .get(`http://localhost:8095/cuisson`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setCuisson(res.data.results.bindings);
            });

        axios
            .get(`http://localhost:8095/soinmaison`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setSoinMaison(res.data.results.bindings);
            });


    }

    useEffect(() => {
        fetchData();

    }, []);







    return (
        <div>
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Chaud</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>

                                </tr>
                                </thead>
                                <tbody>
                                {Chaud?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date.value}</td>
                                        <td>{item.description.value}</td>






                                    </tr>



                                ))}
                                </tbody>

                            </table>


                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Froid</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>

                                </tr>
                                </thead>
                                <tbody>
                                {Froid?.map((item) => (
                                    <tr>
                                        <td>{item.idProduct.value}</td>
                                        <td>{item.name.value}</td>
                                        <td>{item.description.value}</td>
                                        <td>{item.price.value}</td>


                                    </tr>


                                ))}
                                </tbody>

                            </table>


                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Soin Maison</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>

                                </tr>
                                </thead>
                                <tbody>
                                {SoinMaison?.map((item) => (
                                    <tr>
                                        <td>{item.idProduct.value}</td>
                                        <td>{item.name.value}</td>
                                        <td>{item.description.value}</td>
                                        <td>{item.price.value}</td>


                                    </tr>


                                ))}
                                </tbody>

                            </table>


                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Cuisson</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>

                                </tr>
                                </thead>
                                <tbody>
                                {Cuisson?.map((item) => (
                                    <tr>
                                        <td>{item.idProduct.value}</td>
                                        <td>{item.name.value}</td>
                                        <td>{item.description.value}</td>
                                        <td>{item.price.value}</td>


                                    </tr>


                                ))}
                                </tbody>

                            </table>


                        </div>
                    </div>
                </div>


            </div>

        </div>

    )
}

export default Chaud;

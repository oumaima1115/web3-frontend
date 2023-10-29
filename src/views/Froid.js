import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Froid = () => {
    const [Froid, setFroid] = useState(null);
    const [Animal, setAnimal] = useState(null);
    const [Liquide, setLiquide] = useState(null);


    async function fetchData() {
        console.log("aaaaaaa");

        axios
            .get(`http://localhost:8095/froid`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setFroid(res.data.results.bindings);
            });


        axios
            .get(`http://localhost:8095/animal`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setAnimal(res.data.results.bindings);
            });


        axios
            .get(`http://localhost:8095/liquide`, {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((res) => {
                console.log(res.data.results.bindings);
                setLiquide(res.data.results.bindings);
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
                        <h4 class="card-title">Les Froids</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>

                                </tr>
                                </thead>
                                <tbody>
                                {Froid?.map((item) => (
                                    <tr>
                                        <td>{item.idProduct.value}</td>
                                        <td>{item.name.value}</td>






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

export default Froid;

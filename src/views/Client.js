import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


const Client = () => {

  const [Ingredient, setIngredient] = useState(null);


  async function fetchData() {
    console.log("aaaaaaa");

    axios
      .get(`http://localhost:8095/clients`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        console.log(res.data.results.bindings);
        setIngredient(res.data.results.bindings);
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
            <h4 class="card-title">Liste des Clients</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>idClient</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>phone</th>
                 
                  </tr>
                </thead>
                <tbody>
                {Ingredient?.map((item) => (
                  <tr>
                    <td>{item.idClient.value}</td>
                    <td>{item.firstName.value}</td>
                    <td>{item.lastName.value}</td>
                    <td>{item.phone.value}</td>


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

export default Client
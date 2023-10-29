import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const National = () => {
  const [national, setNational] = useState(null);

  async function fetchData() {

    axios
        .get(`http://localhost:8095/national`, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          setNational(res.data.results.bindings);
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
            <h4 class="card-title">Les National</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                {national?.map((item) => (
                  <tr>
                    <td>{item.idMarque.value}</td>
                    <td>{item.title.value}</td>


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

export default National;

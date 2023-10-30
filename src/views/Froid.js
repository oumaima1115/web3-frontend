import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Froid = () => {
    const [Jobs, setJobs] = useState(null);
    const [Animal, setAnimal] = useState(null);
    const [Liquide, setLiquide] = useState(null);
    const [search, setSearch] = useState(null);
    const [orderBy, setOrderBy] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [isRadioChecked, setIsRadioChecked] = useState(false);
    const [regex, setRegex] = useState(null);


    useEffect(() => {
        getData();

    }, []);

    const getData = async (search,regex) => {
        console.log(regex);
        console.log(search);
        try {
            if (regex && isRadioChecked===true) {
                const res = axios.get(`http://localhost:8095/jobsSearch?regexParam=${regex}`)
                    .then((res) => {
                        console.log(res.data);
                        setJobs(res.data);
                    });
            } else if (search&&isRadioChecked===false) {
                const res = axios.get(`http://localhost:8095/jobsSearch?domain=${search}`)
                    .then((res) => {
                        setJobs(res.data);
                        console.log(res);
                    });
            } else if (orderBy && orderType) {
                const res = axios.get(`http://localhost:8095/jobsSearch?orderBy=${orderBy}&orderType=${orderType}`)
                    .then((res) => {
                        console.log(res.data);
                        setJobs(res.data);
                    });
            } else {
                const res = axios.get(`http://localhost:8095/jobsSearch`)
                    .then((res) => {
                        console.log(res.data);
                        setJobs(res.data);
                    });
            }
        } catch {
            console.log("error");
        }
    };


    const handleClick = () => {
        getData(search,regex);
        console.log(orderBy);
      }
    const handleRadioChange = (event) => {
        setIsRadioChecked(event.target.checked);
        console.log(isRadioChecked);
      }  
      






    return (
        <div>
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Les Froids</h4>
                        {/* //search input */}
                        <div class="input-group col-xs-4">
                        <input
                                type="text"
                                class="form-control"
                                placeholder="Search..."
                                name="search"
                                onChange={(e) => {
                                     setRegex(e.target.value) ; setSearch(e.target.value);
                                    console.log("regex:", e.target.value);
                                }}
                            />

                            <button onClick={()=>handleClick()} ><span class="input-group-btn">search</span></button>
                            <div>
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={isRadioChecked}
                                    onChange={handleRadioChange}
                                    />
                                    Radio Input
                                </label> 
                             </div>          
                            <select onChange={(e) => setOrderBy(e.target.value)}>
                                <option value="address">Title</option>
                                <option value="description">Description</option>
                            </select>    

                            <select onChange={(e) => {setOrderType(e.target.value);
                                 }  
                            }>
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                        </div>          
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>

                                </tr>
                                </thead>
                                <tbody>
                                {Jobs?.map((item,index) => (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>

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

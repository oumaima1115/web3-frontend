import React, { useEffect, useState } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchData() {
    axios
      .get("http://localhost:8095/events", {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        console.log("Events List: ", res.data);
        // Filter events based on eventType
        const onlineEvents = res.data.results.bindings.filter(
          (item) => item.eventType.value === "Online Event"
        );
        setEvents(onlineEvents);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = events
    ? events.filter(
        (event) =>
          event.title.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.date.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.address.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.capacity.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Events</h4>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title.value}</td>
                      <td>{item.description.value}</td>
                      <td>{item.date.value}</td>
                      <td>{item.address.value}</td>
                      <td>{item.capacity.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

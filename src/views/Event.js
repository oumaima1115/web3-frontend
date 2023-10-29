import React, { useEffect, useState } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);

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
        setFilteredEvents(onlineEvents); // Initially set filteredEvents to all events
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Function to filter events by title
  const filterByTitle = () => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, show all events
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Events</h4>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={filterByTitle}>Search</button>
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
                  {filteredEvents &&
                    filteredEvents.map((item, index) => (
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

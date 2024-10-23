import React, { useState, useEffect } from "react";
import axios from "axios";
import EventList from "./EventList"; // Assuming you have EventList component for listing events
import CreateEvent from "./CreateEvent";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticket_available: 0,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  // Create Event Handler
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/events", newEvent);
      setEvents([...events, response.data]);
      // Clear form after successful creation
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        ticket_available: 0,
      });
    } catch (error) {
      console.error("Failed to create event");
    }
  };

  // Edit Event Handler
  const handleEditEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(`/events/${id}`, updatedEvent);
      const updatedEvents = events.map((event) =>
        event.id === id ? response.data : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Updated event");
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/events/${id}`);
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to delete event");
    }
  };

  // Handle form input changes for the new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <CreateEvent />
      <EventList
        events={events}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default AdminDashboard;
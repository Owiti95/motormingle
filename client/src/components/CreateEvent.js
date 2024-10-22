import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/admin/dashboard/event", {
        title,
        description,
        date_of_event: dateOfEvent,
        location,
        image_url: imageUrl,
      });

      setSuccess("Event created successfully!");
      // Clear the form after successful submission
      setTitle("");
      setDescription("");
      setDateOfEvent("");
      setLocation("");
      setImageUrl("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create event.");
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Event:
          <input
            type="date"
            value={dateOfEvent}
            onChange={(e) => setDateOfEvent(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;

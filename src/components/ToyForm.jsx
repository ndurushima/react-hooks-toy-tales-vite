import React, { useState } from "react";

function ToyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({ ...formData, likes: 0 });
    setFormData({ name: "", image: "" });      
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
          value={formData.image}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"

        />
      </form>
    </div>
  );
}

export default ToyForm;

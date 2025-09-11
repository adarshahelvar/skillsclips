import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    demoUrl: "",
    fullUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in!");
      return;
    }

    try {
      const res = await API.post("/projects", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Project added successfully!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add project");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <input name="title" placeholder="Project Title" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="demoUrl" placeholder="Demo Video URL" onChange={handleChange} />
      <input name="fullUrl" placeholder="Full Video URL" onChange={handleChange} />
      <button type="submit">Add Project</button>
    </form>
  );
}

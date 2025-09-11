import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth(); // use the login method from context

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      console.log("Login response:", res.data); // Debug: see backend response

      if (res.data.token) {
        login(res.data.user, res.data.token); // updates context + localStorage
        alert("Login successful!");
      } else {
        alert(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

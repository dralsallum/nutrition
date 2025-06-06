import axios from "axios";
import { useState } from "react";

const Practice = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const res = await axios.post("http://localhost:8000/api/book", {
        userName: info.userName,
        password: info.password,
      });

      console.log("Success:", res.data);
      setMessage("Book created successfully!");

      // Clear form after successful submission
      setInfo({ userName: "", password: "" });
    } catch (err) {
      console.error("Error:", err);

      // Better error handling
      if (err.response) {
        // Server responded with error status
        setMessage(
          `Error: ${
            err.response.data.error ||
            err.response.data.message ||
            "Server error"
          }`
        );
      } else if (err.request) {
        // Request was made but no response received
        setMessage(
          "Error: No response from server. Check if your backend is running."
        );
      } else {
        // Something else happened
        setMessage(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key) => (e) => {
    setInfo((prev) => ({ ...prev, [key]: e.target.value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Book Entry</h2>

      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: message.includes("Error") ? "#ffe6e6" : "#e6ffe6",
            border: `1px solid ${
              message.includes("Error") ? "#ff0000" : "#00ff00"
            }`,
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="user_name">Enter name: </label>
          <input
            id="user_name"
            type="text"
            name="user_name_field"
            value={info.userName}
            onChange={handleChange("userName")}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="user_password">Enter password: </label>
          <input
            id="user_password"
            type="password"
            name="password_field"
            value={info.password}
            onChange={handleChange("password")}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Practice;

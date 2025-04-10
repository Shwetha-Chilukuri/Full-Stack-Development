import { useState } from "react";
import api from "../api";

export default function TaskForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await api.post(
      "/tasks",
      {
        title,
        description,
        dueDate,
        priority,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    onAdd(); // refresh task list
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}

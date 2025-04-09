import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Partial<Task>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error: any) {
      alert("Session expired or unauthorized");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/tasks/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditId(null);
      } else {
        await axios.post("/tasks", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({});
      fetchTasks();
    } catch (error: any) {
      alert(error.response?.data?.message || "Error saving task");
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate?.slice(0, 10), // format for input
    });
    setEditId(task._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error: any) {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate || ""}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <select
          name="status"
          value={form.status || "pending"}
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 mb-2 rounded shadow-sm">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </p>
            <p className="text-sm">Status: {task.status}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

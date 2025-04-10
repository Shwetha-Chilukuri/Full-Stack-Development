import { useEffect, useState } from "react";
import api from "../api";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (id: string, completed: boolean) => {
    const token = localStorage.getItem("token");
    await api.put(
      `/tasks/${id}`,
      { completed: !completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    if (confirm("Delete this task?")) {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    }
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <p>
            <strong>{task.title}</strong> - {task.priority} - due{" "}
            {task.dueDate.slice(0, 10)}
          </p>
          <p>{task.description}</p>
          <button onClick={() => toggleComplete(task._id, task.completed)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

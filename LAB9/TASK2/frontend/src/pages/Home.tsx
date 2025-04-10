import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h1>TODO Dashboard</h1>
      <TaskForm onAdd={() => window.location.reload()} />
      <TaskList />
    </div>
  );
}

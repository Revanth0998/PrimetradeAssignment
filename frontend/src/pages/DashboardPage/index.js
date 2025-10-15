import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "./index.css";

const API_BASE = "http://localhost:5000";

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const token = localStorage.getItem("jwtToken");

  const fetchTasks = useCallback(() => {
    if (!token) return;
    setLoadingTasks(true);
    axios
      .get(`${API_BASE}/tasks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTasks(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoadingTasks(false));
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError("No authentication token found. Please login.");
      setLoadingProfile(false);
      return;
    }

    setLoadingProfile(true);
    axios
      .get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setError("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please login again.");
          localStorage.removeItem("jwtToken");
          window.location.href = "/login";
        } else {
          setError("Failed to load profile");
        }
      })
      .finally(() => setLoadingProfile(false));

    fetchTasks();
  }, [token, fetchTasks]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    axios
      .post(
        `${API_BASE}/tasks`,
        { title: newTaskTitle, description: "", status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setNewTaskTitle("");
        setError("");
        fetchTasks();
      })
      .catch(() => setError("Failed to add task"));
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`${API_BASE}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setError("");
        fetchTasks();
      })
      .catch(() => setError("Failed to delete task"));
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setError("");
  };

  const handleUpdateTask = () => {
    if (!editTitle.trim()) {
      setError("Updated task title cannot be empty");
      return;
    }
    axios
      .put(
        `${API_BASE}/tasks/${editingTask}`,
        { title: editTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditingTask(null);
        setEditTitle("");
        setError("");
        fetchTasks();
      })
      .catch(() => setError("Failed to update task"));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setError("");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container dashboard-container mt-4">
        <h2>
          Welcome, {loadingProfile ? "Loading..." : profile ? profile.name : "User"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <input
            type="text"
            placeholder="Search tasks..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loadingTasks}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Add new task..."
            className="form-control"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={loadingTasks}
          />
          <button
            className="btn btn-primary"
            onClick={handleAddTask}
            disabled={loadingTasks}
          >
            Add
          </button>
        </div>

        {loadingTasks ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="list-group">
            {filteredTasks.length === 0 && (
              <li className="list-group-item">No matching tasks found.</li>
            )}
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="list-group-item d-flex align-items-center"
              >
                {editingTask === task.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control me-2"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={handleUpdateTask}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-grow-1">{task.title}</span>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

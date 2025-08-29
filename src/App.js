import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add / Update Task
  const addTask = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  // Task Complete toggle
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Task Delete
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Task Edit
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <h1>✅ To-Do App</h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(index)}>{t.text}</span>
            <button onClick={() => editTask(index)}>✏️ Edit</button>
            <button onClick={() => deleteTask(index)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

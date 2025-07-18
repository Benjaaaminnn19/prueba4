import React, { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing tasks:", error);
        localStorage.removeItem("tasks");
      }
    }
    setIsLoaded(true);
  }, []);

  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      text: input.trim(),
      completed: false
    }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Todo List</h1>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          style={{ flex: 1, padding: 8, marginRight: 8 }}
        />
        <button onClick={handleAddTask}>Añadir</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
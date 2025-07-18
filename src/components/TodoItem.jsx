import React from "react";

export const TodoItem = ({ task, onToggle, onDelete }) => {
  return (
    <li
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        cursor: "pointer",
        margin: "8px 0",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span onClick={() => onToggle(task.id)}>
        {task.text}
      </span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        style={{ marginLeft: "10px" }}
      >
        Eliminar
      </button>
    </li>
  );
};
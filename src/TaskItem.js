import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

function TaskItem({ task, deleteTask, toggleTaskCompletion, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (newText.trim() !== "") {
      editTask(task.id, newText); // Call editTask function with the updated text
      setIsEditing(false);
    }
  };

  return (
    <li className="task-li">
    <div className="task-container">
      {/* Show input field if editing, otherwise show task text */}
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder={task.text} // Show current text as placeholder
          className="edit-input"
          autoFocus // Automatically focus input when editing starts
        />
      ) : (
        <span
          id="task"
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.text}
        </span>
      )}
    </div>
  
    <div className="task-buttons">
      {/* Checkbox to toggle task completion */}
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        title="Mark this task as done."
      />
  
      {/* Toggle edit/save button */}
      <FontAwesomeIcon
        id="edit"
        icon={isEditing ? faSave : faEdit}
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
        title="Edit this task."
      />
  
      <FontAwesomeIcon 
      id="delete" 
      icon={faTrash} 
      onClick={() => deleteTask(task.id)}
      title="Delete this task." />
    </div>
  </li>
  
  );
}

export default TaskItem;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TaskItem({ task, deleteTask, toggleTaskCompletion }) {
  const handleCheckboxChange = () => {
    toggleTaskCompletion(task.id); // Toggle the completed status when the checkbox is clicked
  };
  return (
    <li id="task-li">
       <span id="task" style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
       
       <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange} // Call checkhandleCheckboxChange when checked
      />

      <FontAwesomeIcon
        id="delete"
        icon={faTrash}
        onClick={() => deleteTask(task.id)}
      />
    </li>
  );
}

export default TaskItem;

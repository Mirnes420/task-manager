import React, { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTaskCompletion, editTask, deleteDone, deleteAllTasks }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-container task-card">
      {/* Buttons inside .task-card */}
      <div className={`task-actions ${tasks.length > 1 ? 'show' : ''}`}>
        <input
          id="search-bar"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button 
        className="delete-done-btn" 
        onClick={deleteDone}
        title="Delete only completed tasks.">
          Delete completed tasks
        </button>
        <button 
        className="delete-all-btn" 
        onClick={deleteAllTasks}
        title="Delete all tasks.">
          Delete all tasks
        </button>
      </div>
  
      {/* Task list */}
      <ul id="task">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
    </div>
  );
}  

export default TaskList;

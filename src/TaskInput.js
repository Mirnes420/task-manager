import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({
        id: Date.now(), // Add a unique ID for each task
        text: text.trim(),
        completed: false,
      });
      setText(""); // Clear the input
    }
  };

  return (
    <form id="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tell us your next task?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}

export default TaskInput;

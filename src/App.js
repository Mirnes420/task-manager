import "./App.css";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useState, useEffect } from "react";
import BackgroundImage from "./Background"; 
import RandomQuote from "./RandomQuote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  });

  const [bgImage, setBgImage] = useState(null); // Add state for background image

  // Fetch random image logic
  const fetchRandomImage = () => {
    const imageList = [
      "/imgs/bg1.jpg",
      "/imgs/bg2.jpg",
      "/imgs/bg3.jpg",
      "/imgs/bg4.jpg",
      "/imgs/bg5.jpg",
      "/imgs/bg6.jpg",
      "/imgs/bg7.jpg",
      "/imgs/bg8.jpg",
      "/imgs/bg9.jpg",
      "/imgs/bg10.jpg",
      "/imgs/bg11.jpg",
      "/imgs/bg12.jpg",
      "/imgs/bg13.jpg",
      "/imgs/bg14.jpg",
      "/imgs/bg15.jpg",
      "/imgs/bg16.jpg",
    ];
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    setBgImage(randomImage);
  };

  // Logic for tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks((prevTasks) => [...prevTasks, task]);
  const deleteTask = (id) => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  const deleteAllTasks = () => setTasks([]); // Clear all tasks
  
  const deleteDone = () => {
    const hasCompletedTasks = tasks.some(task => task.completed); // Check if any task is completed
    if (hasCompletedTasks) {
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    } else {
      alert("No completed tasks to delete!"); // Show an alert if no tasks are checked
    }
  };

  const editTask = (taskId, newText) =>
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task)));
  
  const toggleTaskCompletion = (id) =>
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );

  return (
    <div className="App">
      <BackgroundImage bgImage={bgImage} setBgImage={setBgImage} /> {/* Pass background state and function */}
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
        deleteDone={deleteDone}  // Pass deleteDone
        deleteAllTasks={deleteAllTasks}  // Pass deleteAllTasks
      />
      <TaskInput addTask={addTask} />

        <FontAwesomeIcon 
        icon={faRandom} 
        onClick={fetchRandomImage} 
        className="random-bg-btn"
        title="Click to set a random background image"
/> {/* Use FontAwesomeIcon component */}

      <div className="quote-container">
        <RandomQuote />
      </div>
    </div>
  );
};

export default App;

import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useState, useEffect } from 'react';


  // aditional features
  
 // Images for a random background
function App() {
  const bgImages = [
    '/imgs/bg1.jpg',
    '/imgs/bg2.jpg',
    '/imgs/bg3.jpg',
    '/imgs/bg4.jpg',
    '/imgs/bg5.jpg',
    '/imgs/bg6.jpg',
    '/imgs/bg7.jpg',
    '/imgs/bg8.jpg',
    '/imgs/bg9.jpg',
    '/imgs/bg10.jpg',
    '/imgs/bg11.jpg',
    '/imgs/bg12.jpg',
    '/imgs/bg13.jpg',
    '/imgs/bg14.jpg',
    '/imgs/bg15.jpg',
    '/imgs/bg16.jpg',
  ];

   // Random quotes for motivation
  const quotes = [
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "You are never too old to set another goal or to dream a new dream.",
    "Believe in yourself and all that you are.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "Act as if what you do makes a difference. It does.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "Opportunities don't happen. You create them.",
    "It always seems impossible until it's done."
  ];

  // Pick a random background image and quote only once when the component mounts
  const [randomBgImage] = useState(() => {
    return bgImages[Math.floor(Math.random() * bgImages.length)];
  });

  const [randomQuote] = useState(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  });


  // Task state

  // Initialize state with tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${randomBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
     
     <TaskInput addTask={addTask}/>
      {tasks.length > 0 && (
        
    <TaskList
      tasks={tasks}
      deleteTask={deleteTask}
      toggleTaskCompletion={toggleTaskCompletion}
    />
  )}
   
      <div className="quote-container">
        <h2 className="motivational-quote">"{randomQuote}"</h2>
      </div>
    </div>
  );
}

export default App;

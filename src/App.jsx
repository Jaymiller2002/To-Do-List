import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Import custom CSS file for styling

// Title component - Renders the title of the todo list
const Title = () => {
  // Renders the title of the todo list
  return <h1 className="title">Todo's</h1>;
};

// Main App component
function App() {
  // State variables
  const [todos, setTodos] = useState([]); // Array to store todos
  const [todoText, setTodoText] = useState(''); // Text input for new todo
  const [view, setView] = useState('all'); // Filter for todo view (all, active, completed)

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')); // Retrieve todos from local storage
    if (storedTodos) {
      setTodos(storedTodos); // Set todos state with stored todos
    }
  }, []);

  // Save todos to local storage whenever the todo list changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Store todos in local storage
  }, [todos]);

  // Handle input change event
  const handleInputChange = (e) => {
    setTodoText(e.target.value); // Update todo text state with input value
  };

  // Handle add todo button click event
  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]); // Add new todo to todos array
      setTodoText(''); // Clear input field after adding todo
    }
  };

  // Handle remove todo button click event
  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); // Remove todo at specified index
    setTodos(newTodos); // Update todos state with modified todos array
  };

  // Handle toggle todo checkbox click event
  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed; // Toggle completion status of todo
    setTodos(newTodos); // Update todos state with modified todos array
  };

  // Filter todos based on view
  const filteredTodos = todos.filter((todo) => {
    if (view === 'active') {
      return !todo.completed; // Filter active todos
    } else if (view === 'completed') {
      return todo.completed; // Filter completed todos
    }
    return true; // Show all todos
  });

  // JSX rendering
  return (
    <div className="container">
      {/* Render the title */}
      <Title />
      <div className="todo-container">
        {/* Todo input field */}
        <div className="todo-input">
          <input type="text" placeholder='What Needs To Be Done?' value={todoText} onChange={handleInputChange} className="input-field" />
          <button onClick={handleAddTodo} className="add-button">Add</button>
        </div>
        {/* Todo list */}
        <div className="todo-list">
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index} className={todo.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(index)}
                />
                <span>{todo.text}</span>
                <button onClick={() => handleRemoveTodo(index)} className="remove-button">X</button>
              </li>
            ))}
          </ul>
        </div>
        {/* View buttons */}
        <div className="view-buttons">
          <button onClick={() => setView('all')} className={view === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setView('active')} className={view === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setView('completed')} className={view === 'completed' ? 'active' : ''}>Completed</button>
        </div>
        {/* Items left counter */}
        <div className="items-left">Items left: {filteredTodos.length}</div>
      </div>
    </div>
  );
}

export default App;
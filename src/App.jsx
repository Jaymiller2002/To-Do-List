import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Title component - Renders the title of the todo list
const Title = () => {
  return <h1 style={{textAlign: "center", color: "white"}}>Todo's</h1>;
};

// Main App component
function App() {
  // State variables
  const [todos, setTodos] = useState([]); // Todos array
  const [todoText, setTodoText] = useState(''); // Text for new todo
  const [view, setView] = useState('all'); // View filter (all, active, completed)

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever the todo list changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handle input change event
  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  // Handle add todo button click event
  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  // Handle remove todo button click event
  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Handle toggle todo checkbox click event
  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Filter todos based on view
  const filteredTodos = todos.filter((todo) => {
    if (view === 'active') {
      return !todo.completed;
    } else if (view === 'completed') {
      return todo.completed;
    }
    return true; // 'all' view
  });

  // JSX rendering
  return (
    <div className="p-5">
      {/* Render the title */}
      <Title />
      <div className="todo-container">
        {/* Todo input field */}
        <div className="todo-input">
          <input type="text" placeholder='What Needs To Be Done?' value={todoText} onChange={handleInputChange} className="input-field" />
          <button onClick={handleAddTodo}>Add</button>
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
                <button onClick={() => handleRemoveTodo(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        {/* View buttons */}
        <div>
          <button onClick={() => setView('all')} className="all">All</button>
          <button onClick={() => setView('active')} className="all">Active</button>
          <button onClick={() => setView('completed')} className="all">Completed</button>
        </div>
        {/* Items left counter */}
        <div className="Left">Items left: {filteredTodos.length}</div>
      </div>
    </div>
  );
}

export default App;
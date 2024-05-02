import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Title = () => {
  return <h1 style={{textAlign: "center", color: "white"}}>Todo's</h1>;
};

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [view, setView] = useState('all');

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

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (view === 'active') {
      return !todo.completed;
    } else if (view === 'completed') {
      return todo.completed;
    }
    return true; // 'all' view
  });

  return (
    <div className="p-5">
      <Title />
      <div className="todo-container">
        <div className="todo-input">
          <input type="text" placeholder='What Needs To Be Done?' value={todoText} onChange={handleInputChange} className="input-field" />
          <button onClick={handleAddTodo}>Add</button>
        </div>
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
        <div>
          <button onClick={() => setView('all')} className="all">All</button>
          <button onClick={() => setView('active')} className="all">Active</button>
          <button onClick={() => setView('completed')} className="all">Completed</button>
        </div>
        <div className="Left">Items left: {filteredTodos.length}</div>
      </div>
    </div>
  );
}

export default App;
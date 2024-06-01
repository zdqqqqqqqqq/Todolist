import React, { useState } from 'react';
import './todoList.css';
import { Helmet } from 'react-helmet';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input || !date) {
      alert("请填写待办事项和日期！");
      return;
    }
    const newTodo = { text: input, completed: false, dueDate: date };
    setTodos([...todos, newTodo]);
    setInput('');
    setDate('');
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <Helmet>
        <title>Todo List</title>
      </Helmet>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: new Date(todo.dueDate) < new Date() ? 'red' : 'black' }}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleTodo(index)}
                checked={todo.completed}
              />
              <span className="task-text">{todo.text}</span>
            </label>
            <span className="todo-date">Due: {formatDate(todo.dueDate)}</span>
            <button className="delete-button" onClick={() => deleteTodo(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCard from './components/TodoCard';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/todos/');
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (newTodo) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/todos/', newTodo);
      setTodos([...todos, data]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle completed
  const toggleCompleted = async (id, currentValue) => {
    try {
      const { data } = await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, {
        completed: !currentValue,
      });
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Update todo (title/description)
  const updateTodo = async (id, updatedFields) => {
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/todos/${id}/`,
        updatedFields
      );
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      await Promise.all(
        completedTodos.map(todo => axios.delete(`http://127.0.0.1:8000/api/todos/${todo.id}/`))
      );
      setTodos(todos.filter(todo => !todo.completed));
    } catch (err) {
      console.error("Error clearing completed todos:", err);
    }
  };

  // Apply filter
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>

        {todos.some(todo => todo.completed) && (
          <button onClick={clearCompleted} className="danger">Clear Completed</button>
        )}
      </div>

      <div className="cards-container">
        {filteredTodos.length ? (
          filteredTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleCompleted}
              onDelete={deleteTodo}
              onUpdate={updateTodo}   /* ✅ pass update handler */
            />
          ))
        ) : (
          <p>No todos found</p>
        )}
      </div>
    </div>
  );
}

export default App;

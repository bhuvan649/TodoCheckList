import React, { useState, useEffect, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false); // ✅ To avoid overwriting the file
  const scrollAreaRef = useRef(null);
const updateTodo = (id, newText) => {
  setTodos((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    )
  );
};

  // ✅ Load from backend ONCE
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setHasLoaded(true); // ✅ mark as loaded
      })
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  // ✅ Save only AFTER initial load
  useEffect(() => {
    if (!hasLoaded) return;
    fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos),
    }).catch((err) => console.error("Failed to save tasks:", err));
  }, [todos, hasLoaded]);

  const addTodo = (text, dueDateTime) => {
    const newTodo = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
      dueDateTime,
      completed: false,
      notified: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const isDue = new Date(todo.dueDateTime) <= now;
          if (isDue && !todo.completed && !todo.notified) {
            if (Notification.permission === 'granted') {
              new Notification('⏰ Task Due!', { body: todo.text });
            }
            return { ...todo, notified: true };
          }
          return todo;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="w-full max-w-3xl flex flex-col h-[calc(100vh-100px)]">
      <TodoForm addTodo={addTodo} />
      <div
        ref={scrollAreaRef}
        className="mt-4 overflow-y-auto flex-1 px-1 sm:px-3"
      >
        {todos.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;

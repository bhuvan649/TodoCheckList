import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !dueDateTime) return;
    addTodo(text, dueDateTime);
    setText('');
    setDueDateTime('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md w-full"
    >
      <input
        type="text"
        placeholder="Enter task..."
        className="flex-1 p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="datetime-local"
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        value={dueDateTime}
        onChange={(e) => setDueDateTime(e.target.value)}
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-3 rounded transition w-full sm:w-auto"
      >
        ➕ Add Task
      </button>
    </form>
  );
};

export default TodoForm;

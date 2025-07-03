import React, { useState } from 'react';

const TodoItem = ({ todo, removeTodo, toggleComplete, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className={`bg-gray-700 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 ${todo.completed ? 'opacity-50 line-through' : ''}`}>
      <div className="flex items-start gap-3 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 accent-green-500 mt-1"
        />
        <div className="flex-1">
          {isEditing ? (
            <input
              className="bg-gray-600 text-white p-2 rounded w-full"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-bold text-white">{todo.text}</h2>
          )}

          <p className="text-sm text-gray-400 mt-1">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-yellow-400">
            Due: {new Date(todo.dueDateTime).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            ✅ Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            ✏️ Edit
          </button>
        )}

        <button
          onClick={() => removeTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

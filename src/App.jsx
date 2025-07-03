import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-start px-4 pt-6">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        📝 <span>Todo Checklist</span>
      </h1>
      <TodoList />
    </div>
  );
}

export default App;

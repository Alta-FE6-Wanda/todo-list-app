import React from 'react';
import ToDoList from '../components/ToDoList';
import '../styles/App.css';

function App() {
  return (
    <>
      <div className="todo-app">
        <ToDoList />
      </div>
    </>
  );
}

export default App;

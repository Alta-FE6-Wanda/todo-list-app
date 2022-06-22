import React from 'react';
import ToDoForm from '../components/ToDoForm';
import ToDoList from '../components/ToDoList';
import Header from '../components/Header';
import '../styles/App.css';

function App() {
  return (
    <>
      <Header />
      <div className="todo-app">
        <ToDoList />
      </div>
    </>
  );
}

export default App;

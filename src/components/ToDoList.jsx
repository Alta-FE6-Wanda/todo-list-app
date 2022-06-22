import React, { useState } from 'react'
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';

function ToDoList() {
    const [todos, setTodos] = useState([]);

    const addToDo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
          return;
        }
    
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
      };

    const removeToDo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removeArr);
    }

    const completeToDo = (id) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    return (
      <div>
        <h1>TO DO LIST</h1>
        <ToDoForm onSubmit={addToDo}/>
        <ToDo 
        todos={todos} 
        completeTodo={completeToDo}
        removeTodo={removeToDo}
        updatedTodo={updateTodo}
        />
      </div>
    );
  
}

export default ToDoList;
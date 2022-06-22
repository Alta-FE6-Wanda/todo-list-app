import React, { useState } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import Header from '../components/Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [todoSearch, setTodoSearch] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        setTimeout(() => {
            getToDo();
        })
    }, [])

    const getToDo = () => {
        console.log('getToDo');
        let axios = require('axios');

        let config = {
            method: 'get',
            url: 'https://api.todoist.com/rest/v1/tasks?project_id=2293681357',
            headers: {
                'Authorization': 'Bearer 65f18cd0c9e7b8e7fabd885718f318f8737c450a',
                'Cookie': 'csrf=8c8fdccf350d4d67906bf4dc5751b66e'
            }
        };

        axios(config)
            .then(function (response) {
                let temp = [];
                const structure = {
                    id: 0,
                    text: '',
                }
                response.data.map((item) => {
                    let temp_structure = { ...structure };
                    temp_structure.id = item.id;
                    temp_structure.text = item.content;
                    temp.push(temp_structure);
                })
                setTodos(temp);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const addToDo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        let axios = require('axios');
        let data = JSON.stringify({
            "content": todo.text,
            "project_id": 2293681357
        });

        let config = {
            method: 'post',
            url: 'https://api.todoist.com/rest/v1/tasks',
            headers: {
                'Authorization': 'Bearer 65f18cd0c9e7b8e7fabd885718f318f8737c450a',
                'Content-Type': 'application/json',
                'Cookie': 'csrf=8c8fdccf350d4d67906bf4dc5751b66e'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        let axios = require('axios');
        let data = JSON.stringify({
            "content": newValue.text
        });

        let config = {
            method: 'post',
            url: `https://api.todoist.com/rest/v1/tasks/${todoId}`,
            headers: {
                'Authorization': 'Bearer 65f18cd0c9e7b8e7fabd885718f318f8737c450a',
                'Content-Type': 'application/json',
                'Cookie': 'csrf=8c8fdccf350d4d67906bf4dc5751b66e'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });


        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeToDo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id);

        let axios = require('axios');

        let config = {
            method: 'delete',
            url: `https://api.todoist.com/rest/v1/tasks/${id}?project_id=2293681357`,
            headers: {
                'Authorization': 'Bearer 65f18cd0c9e7b8e7fabd885718f318f8737c450a',
                'Cookie': 'csrf=8c8fdccf350d4d67906bf4dc5751b66e'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });


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

    const onChangeHandler = e => {
        setSearch(e.target.value)
        console.log('Search result', search)
        let result = [];
        todos.map((item) => {
            if (!search) {
                result = todos;
            } else if (item.text.includes(search)) {
                result.push(item);
            }
        })
        setTodoSearch(result);
    }

    const addNewHandler = () => {
        setAddNew(!addNew);
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-9'>
                        <input
                            placeholder='Search'
                            type='text'
                            value={search}
                            onChange={onChangeHandler}
                            className='todo-input'
                        />
                    </div>
                    <div className='col-3'>
                        <SearchIcon className='search-icon' onClick={() => setSearch(search)} />
                        
                    </div>
                </div>
            </div>
            <h1 className='title'>TO DO LIST <AddCircleIcon className='hideIcon' onClick={addNewHandler} /></h1>
            {
                addNew ? <ToDoForm onSubmit={addToDo} /> : null
            }
            <ToDo
                // todos={todos}
                todos={search ? todoSearch : todos}
                completeTodo={completeToDo}
                removeTodo={removeToDo}
                updatedTodo={updateTodo}
            />
        </div>
    );

}

export default ToDoList;
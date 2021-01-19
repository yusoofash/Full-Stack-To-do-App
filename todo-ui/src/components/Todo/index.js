import { useState, useEffect } from 'react';
import Task from '../Task';
import CreateTask from '../CreateTask';
import axios from '../../services/axios';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const endpoint = '/api/todo';

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                const newTasks = res.data.map(obj => ({
                    _id: obj._id,
                    title: obj.text,
                }))
                setTasks(newTasks);
            })
            .catch(alert);
    }, []);

    const addTask = title => {
        const newTasks = [...tasks];

        axios.post(`${endpoint}`, {
            text: title
        })
            .then((res) => {
                newTasks.unshift({
                    _id: res.data._id,
                    title: res.data.text
                });

                setTasks(newTasks);
            })
            .catch(alert);
    };

    const updateTask = (index, title) => {
        if (!title) {
            // delete
            removeTask(index);
        } else {
            // update
            const newTasks = tasks.map((task) => {
                if (task._id === index) {
                    return { ...task, title };
                }
                return task;
            });
    
            axios.put(`${endpoint}/${index}`, {
                text: title
            })
                .then(() => {
                    setTasks(newTasks);
                })
                .catch(alert);
        }
    };

    const removeTask = index => {
        const newTasks = tasks.filter(task => task._id !== index);

        axios.delete(`${endpoint}/${index}`)
            .then(() => {
                setTasks(newTasks);
            })
            .catch(alert);
    };

    return (
        <div className="card m-auto" style={{ maxWidth: '700px' }}>
            <header className="card-header bg-primary">
                <h4 className="card-title text-center text-white mb-0">Todo App</h4>
            </header>
            <div className="card-body">
                <CreateTask
                    addTask={addTask}
                />
                <div className="task-list">
                    {tasks.map((task) => (
                        <Task
                            removeTask={removeTask}
                            updateTask={updateTask}
                            task={task}
                            index={task._id}
                            key={task._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Todo;
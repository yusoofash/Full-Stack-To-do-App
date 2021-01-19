import './style.css';
import { useState, useRef, useEffect } from 'react';

const Task = ({ task, removeTask, index, updateTask }) => {
    const [isEditMode, setEditMode] = useState(false);
    const [value, setValue] = useState(task.title);
    const currentEditTodo = useRef(null);

    useEffect(() => {
        if (isEditMode) { // focus on input for edit
            currentEditTodo.current.focus();
        }
    }, [isEditMode]);

    const onEdit = () => {
        setEditMode(false);
        updateTask(index, value);
    };

    const capitalizeFirstWord = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div
            className="task d-flex justify-content-between"
        >
            {!isEditMode && <div className="task-title p-2 flex-grow-1">
                {capitalizeFirstWord(task.title)}
            </div>}
            {isEditMode && <form className="py-2 flex-grow-1" onSubmit={onEdit}>
                <input className="form-control"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    ref={currentEditTodo}
                />
            </form>}
            <div className="d-inline-flex">
                {!isEditMode && <button type="button" className="btn btn-link px-2"
                    onClick={() => setEditMode(true)}>
                    <i className="fa fa-edit text-warning"></i>
                </button>}
                {isEditMode && <button type="button" className="btn btn-link px-2"
                    onClick={onEdit}>
                    <i className="fa fa-check text-success"></i>
                </button>}
                <button type="button" className="btn btn-link px-2"
                    onClick={() => removeTask(index)}>
                    <i className="fa fa-times-circle text-danger"></i>
                </button>
            </div>
        </div>
    );
}

export default Task;

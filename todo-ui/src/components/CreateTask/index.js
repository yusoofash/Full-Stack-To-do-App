import { useState } from 'react';

const CreateTask = ({ addTask }) => {
    const [value, setValue] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        if (!value) return;

        addTask(value);
        setValue('');
    }

    return (
        <form className="form-group d-flex" onSubmit={onSubmit}>
            <input className="form-control"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter Task" />
            <button type="submit" className="btn btn-primary ml-2">Add</button>
        </form>
    );
};

export default CreateTask;

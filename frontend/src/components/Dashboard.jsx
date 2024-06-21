import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error))

        fetch(`${BASE_URL}/tasks`)
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error))
    }, [])

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>{user.userName}</Link>
                    </li>
                ))}
            </ul>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
            <Link to='/add-task'>Add Task</Link>
        </div>
    )
}

export default Dashboard

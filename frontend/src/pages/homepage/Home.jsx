import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
    const navigate = useNavigate()
    return (
        <section className='homepage-container'>
            <h1>Task Management System Homepage</h1>
            <div className='links-container'>
                <p>Not yet in a group?</p>
                <button
                    type='button'
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
                <p>Already a group member?</p>
                <button
                    type='button'
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </button>
            </div>
        </section>
    )
}

export default Home

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import './Login.css'

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

function Login({ setUser }) {
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (isError === true) {
            setTimeout(() => {
                setIsError((isError) => !isError)
            }, 3000)
        }
    }, [isError])

    const formSchema = Yup.object().shape({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values, null, 2),
                })

                const data = await response.json()

                if (response.status === 200) {
                    // console.log(response)
                    setUser(data)
                    Cookies.set('userId', data.id, {
                        path: '/',
                    })
                    navigate('/dashboard')
                } else {
                    // alert(data.message)
                    setIsError((isError) => !isError)
                }
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <section className='login-container'>
            <h2>Log In</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-data'>
                    <label htmlFor='userName'>Username</label>
                    <input
                        type='text'
                        id='userName'
                        name='userName'
                        placeholder='Username'
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                        <p>{formik.errors.userName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p>{formik.errors.password}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <div className={`error-message ${isError ? 'show' : ''}`}>
                <p>Invalid username or password</p>
            </div>
        </section>
    )
}

export default Login

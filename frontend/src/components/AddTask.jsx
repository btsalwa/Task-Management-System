import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

const AddTask = () => {
    const navigate = useNavigate()

    const formSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        start_date: Yup.date().required('Start date is required'),
        end_date: Yup.date().required('End date is required'),
        status: Yup.string().required('Status is required'),
        user_id: Yup.number().required('User ID is required'),
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            status: '',
            user_id: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${BASE_URL}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })

                if (response.ok) {
                    const data = await response.json()
                    alert('Task added successfully!')
                    console.log('New task:', data)
                    navigate('/dashboard')
                } else {
                    const data = await response.json()
                    console.error('Backend error:', data)
                    throw new Error(data.error || 'Failed to add task')
                }
            } catch (error) {
                console.error('Error adding task:', error)
                alert('Failed to add task. Please try again.')
            }
        },
    })

    return (
        <section className='signup-container'>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-data'>
                <label>Title</label>
                <input
                    type="hidden"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
            <div className='form-data'>
                <label>Description</label>
                <textarea
                    name='description'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.errors.description && (
                    <div>{formik.errors.description}</div>
                )}
            </div>
            <div className='form-data'>
                <label>Start Date</label>
                <input
                    type='date'
                    name='start_date'
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                />
                {formik.errors.start_date && (
                    <div>{formik.errors.start_date}</div>
                )}
            </div>
            <div className='form-data'>
                <label>End Date</label>
                <input
                    type='date'
                    name='end_date'
                    onChange={formik.handleChange}
                    value={formik.values.end_date}
                />
                {formik.errors.end_date && <div>{formik.errors.end_date}</div>}
            </div>
            <div className='form-data'>
                <label>Status</label>
                <input
                    type='text'
                    name='status'
                    onChange={formik.handleChange}
                    value={formik.values.status}
                />
                {formik.errors.status && <div>{formik.errors.status}</div>}
            </div>
            <div className='form-data'>
                <label>User ID</label>
                <input
                    type='number'
                    name='user_id'
                    onChange={formik.handleChange}
                    value={formik.values.user_id}
                />
                {formik.errors.user_id && <div>{formik.errors.user_id}</div>}
            </div>
            <button type="submit">Add Task</button>
            <button onClick={() => navigate('/dashboard')}className='bckdashboard'>Back to Dashboard</button>
        </form>
        </section>
        
    );
};

export default AddTask

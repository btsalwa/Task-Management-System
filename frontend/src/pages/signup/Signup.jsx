import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Signup.css'

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

function Signup() {
    const navigate = useNavigate()

    const formSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        phone: Yup.string().required('Required'),
        password: Yup.string()
            .min(4, 'Password length should be more than 4')
            .max(8, 'Password length should be less than 8')
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values, null, 2),
                })

                // const data = await response.json()
                if (response.status === 201) {
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <section className='signup-container'>
            <h2>Sign Up Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-data'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
                        <p>{formik.errors.firstName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                        <p>{formik.errors.lastName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='userName'>Username</label>
                    <input
                        type='text'
                        id='userName'
                        name='userName'
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                        <p>{formik.errors.userName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p>{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                        <p>{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        name='password'
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
        </section>
    )
}

export default Signup

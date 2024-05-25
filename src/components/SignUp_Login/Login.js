import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login} from '../../services/api';

import './Login.css';

function Login() {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be less than 100 characters')
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            role: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await login(values);
            console.log('User logged in successfully:', response);
            resetForm();
            navigate('/home');
          } catch (error) {
            console.error('Error logging in:', error);
          } finally {
            setSubmitting(false);
          }
        }
    });

    return (
        <div className="login-container">
            <div className="left-content">
                <img src="FitnessLogo.jpg" alt="Logo" className="logo" />
            </div>
            <div className="right-content">
                <div className="login-form">
                    <h2>Welcome Back! Login here!</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Member">Member</option>
                                <option value="Trainer">Trainer</option>
                                <option value="Administrator">Administrator</option>
                            </select>
                            {formik.touched.role && formik.errors.role ? (
                                <div className="error">{formik.errors.role}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <p>Don't have an account? <a href="/" className="signup-link">SignUp Here!</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/api'; 

import './SignUp.css';

function SignUp() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(50, 'First name must be less than 50 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .max(50, 'Last name must be less than 50 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be less than 100 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            role: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await signUp(values);
                console.log('User signed up successfully:', response);
                resetForm();
                navigate('/login');
            } catch (error) {
                console.error('Error signing up:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="signup-container">
            <div className="left-content">
                <img src="FitnessLogo.jpg" alt="Logo" className="logo" />
            </div>
            <div className="right-content">
                <div className="signup-form">
                    <h2>No Account? Sign Up here!</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="error">{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="error">{formik.errors.lastName}</div>
                            ) : null}
                        </div>
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
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="error">{formik.errors.phoneNumber}</div>
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
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="error">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                    <p>Already have an account? <a href="/login" className="login-link">Login Here!</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

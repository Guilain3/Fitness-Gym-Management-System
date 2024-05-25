// src/components/Homepage/Trainers/SaveTrainer.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveTrainer } from '../../../services/api'; // Make sure this is the correct path
import TrainerHeader from './TrainerHeader'; // Assuming you have a similar header component for Trainers
import './SaveTrainer.css';

const SaveTrainer = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    specialization: Yup.string().required('Specialization is required'),
    experienceYears: Yup.string().required('Experience years are required'),
    salary: Yup.number().required('Salary is required').positive('Salary must be a positive number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      specialization: '',
      experienceYears: '',
      salary: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await saveTrainer(values);
        console.log('Trainer information saved successfully!', response);
        setSuccessMessage('Trainer information saved successfully!');
        setErrorMessage('');
        resetForm();
      } catch (error) {
        console.error('Error saving trainer:', error);
        setErrorMessage('Failed to save trainer information.');
        setSuccessMessage('');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <TrainerHeader />
      <div className="save-trainer-container">
        <h2>Save Trainer Information</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="error">{formik.errors.phoneNumber}</div> : null}
          </div>
          <div className="form-group">
            <label>Specialization:</label>
            <input type="text" name="specialization" value={formik.values.specialization} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.specialization && formik.errors.specialization ? <div className="error">{formik.errors.specialization}</div> : null}
          </div>
          <div className="form-group">
            <label>Experience Years:</label>
            <input type="text" name="experienceYears" value={formik.values.experienceYears} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.experienceYears && formik.errors.experienceYears ? <div className="error">{formik.errors.experienceYears}</div> : null}
          </div>
          <div className="form-group">
            <label>Salary:</label>
            <input type="number" name="salary" value={formik.values.salary} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.salary && formik.errors.salary ? <div className="error">{formik.errors.salary}</div> : null}
          </div>
          <button type="submit" disabled={formik.isSubmitting}>Save Trainer</button>
        </form>
      </div>
    </div>
  );
}

export default SaveTrainer;

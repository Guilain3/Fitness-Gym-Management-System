import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MemberHeader from './MemberHeader';
import { fetchMemberByEmail, updateMember } from '../../../services/api';

const UpdateMemberForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    joinDate: Yup.date().required('Join date is required'),
    trainer: Yup.string().required('Trainer is required')
    // Add validation for other fields as needed
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      joinDate: '',
      trainer: ''
      // Initialize other fields here
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check if member exists
        const member = await fetchMemberByEmail(values.email);
        if (!member) {
          setErrorMessage('Member with this email does not exist. Please register them first.');
          setSubmitting(false);
          return;
        }

        // Member exists, update their information
        const updatedMemberData = {
          email: values.email,
          name: values.name,
          phoneNumber: values.phoneNumber,
          joinDate: values.joinDate,
          trainer: values.trainer
          // Include other updated fields here
        };
        await updateMember(updatedMemberData);
        setSuccessMessage('Member information updated successfully!');
      } catch (error) {
        console.error('Error updating member:', error.message);
        setErrorMessage('Failed to update member information.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <MemberHeader />
      <div className="save-member-container">
      <h2>Update Member Information</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="error">{formik.errors.phoneNumber}</div> : null}
        </div>
        <div className="form-group">
          <label>Join Date:</label>
          <input type="date" name="joinDate" value={formik.values.joinDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.joinDate && formik.errors.joinDate ? <div className="error">{formik.errors.joinDate}</div> : null}
        </div>
        <div className="form-group">
          <label>Trainer:</label>
          <input type="text" name="trainer" value={formik.values.trainer} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.trainer && formik.errors.trainer ? <div className="error">{formik.errors.trainer}</div> : null}
        </div>
        {/* Add fields for other member information to be updated */}
        <button type="submit" disabled={formik.isSubmitting}>Update Member</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
    </div>
  );
};

export default UpdateMemberForm;

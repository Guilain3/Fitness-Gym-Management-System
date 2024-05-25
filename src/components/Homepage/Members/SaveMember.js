import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveMember, fetchTrainers } from '../../../services/api'; // Ensure fetchTrainers is correctly implemented
import MemberHeader from './MemberHeader';
import './SaveMember.css';

const SaveMember = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const response = await fetchTrainers();
        setTrainers(response);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    loadTrainers();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    joinDate: Yup.date().required('Join date is required'),
    trainer: Yup.string().required('Trainer is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      joinDate: '',
      trainer: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const selectedTrainer = trainers.find(trainer => trainer.name === values.trainer);
      if (!selectedTrainer) {
        setSuccessMessage('Invalid trainer name.');
        setSubmitting(false);
        return;
      }

      const memberData = {
        member: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          joinDate: values.joinDate,
        },
        trainerName: selectedTrainer.name
      };

      try {
        const response = await saveMember(memberData);
        console.log('Member information saved successfully!', response);
        setSuccessMessage('Member information saved successfully!');
        resetForm();
      } catch (error) {
        console.error('Error saving Member:', error);
        setSuccessMessage('Failed to save member information.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <MemberHeader />
      <div className="save-member-container">
        <h2>Save Member Information</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
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
            <label>Join Date:</label>
            <input type="date" name="joinDate" value={formik.values.joinDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.joinDate && formik.errors.joinDate ? <div className="error">{formik.errors.joinDate}</div> : null}
          </div>
          <div className="form-group">
            <label>Trainer:</label>
            <input type="text" name="trainer" value={formik.values.trainer} onChange={formik.handleChange} onBlur={formik.handleBlur} list="trainer-list" />
            <datalist id="trainer-list">
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.name} />
              ))}
            </datalist>
            {formik.touched.trainer && formik.errors.trainer ? <div className="error">{formik.errors.trainer}</div> : null}
          </div>
          <button type="submit" disabled={formik.isSubmitting}>Save Member</button>
        </form>
      </div>
    </div>
  );
}

export default SaveMember;

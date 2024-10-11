import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./form.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


const states = [
    { value: '', label: 'Select your state' },
    { value: 'HR', label: 'Haryana' },
    { value: 'RJ', label: 'Rajesthan' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'BH', label: 'Bihar' },
    { value: 'HM', label: 'Himachal' },
];


const PersonalInfoStep = ({setProgress, setTitle, setIsValid, isValid }) => {
    setTitle('Personal Information')
    setProgress(33)

    const [inputValue, setInputValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        companyWebsite: "",
        state: "",
        zipCode: "",
    })

    const dispatch = useDispatch();
    const navigate=useNavigate('')
    const personalInfo = useSelector((state) => state.personalInfo);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required')
            .min(3, 'First name must be greater than 2 characters'),
        lastName: Yup.string().required('Last name is required')
            .min(3, 'Last name must be greater than 2 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        companyName: Yup.string().required('Company name is required'),
        companyWebsite: Yup.string().url('Invalid URL format').required('Company website is required'),
        state: Yup.string().required('State is required'),
        zipCode: Yup.string().required('Zip code is required'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    return (
        <Formik
            initialValues={personalInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(setPersonalInfo(values));
                isValid && navigate('/comapnyInfo');
            }}
        >

            {({ errors }) => {
                setIsValid(Object.keys(errors).length === 0);
                return (
                    <Form>
                        <div className='form-display'>
                            <label htmlFor="state">First Name:</label>
                            <Field
                                name="firstName"
                                placeholder="Enter your First Name"
                                value={inputValue.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="firstName" component="div" style={{ color: 'red'}} />
                        <div className='form-display'>
                            <label htmlFor="state">Last Name:</label>
                            <Field
                                name="lastName"
                                value={inputValue.lastName}
                                placeholder="Enter your Last Name"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
                        <div className='form-display'>
                            <label htmlFor="state">Email:</label>
                            <Field
                                name="email"
                                value={inputValue.email}
                                placeholder="Enter your Email Address"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

                        <div className='form-display'>
                            <label htmlFor="state">Company Name:</label>
                            <Field
                                name="companyName"
                                value={inputValue.companyName}
                                placeholder="Enter your Company Name"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="companyName" component="div" style={{ color: 'red' }} />

                        <div className='form-display'>
                            <label htmlFor="state">Company Website:</label>
                            <Field
                                name="companyWebsite"
                                value={inputValue.companyWebsite}
                                placeholder="Enter you Company Website"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="companyWebsite" component="div" style={{ color: 'red' }} />

                        <div className='form-display'>
                            <label htmlFor="state">State:</label>
                            <Field as="select" name="state" onChange={handleChange} value={inputValue.state}>
                                {states.map((state) => (
                                    <option key={state.value} value={state.value}>
                                        {state.label}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <ErrorMessage name="state" component="div" style={{ color: 'red' }} />

                        <div className='form-display'>
                            <label htmlFor="state">Zip Code:</label>
                            <Field
                                name="zipCode"
                                value={inputValue.zipCode}
                                placeholder="Enter your Zip Code"
                                onChange={handleChange}
                            />
                        </div>
                        <ErrorMessage name="zipCode" component="div" style={{ color: 'red' }} />


                        <button className='first-page-next-button' type="submit">Next</button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PersonalInfoStep;
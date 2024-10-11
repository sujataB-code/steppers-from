import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyInfo } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const options = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
];

const employees = [
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '501', label: '500+' },
];

const wfhPolicy = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

const CompanyInfoStep = ({setProgress, setTitle, isValid, setIsValid }) => {
    setProgress(66)
    setTitle('Comapny Information')

    const [inputValue, setInputValue] = useState({
        fieldcheckboxes: "",
        noemplyeescheckboxes: "",
        wfhradio: "",
    })

    const dispatch = useDispatch();
    const navigate=useNavigate('')
    const companyInfo = useSelector((state) => state.companyInfo);

   
    const validationSchema = Yup.object({
        fieldcheckboxes: Yup.string().required('fieldcheck name is required'),
        noemplyeescheckboxes: Yup.string().required('No of employees is required'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    return (
        <Formik
            initialValues={companyInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(setCompanyInfo(values));
                isValid && navigate("/PlanSelection");
            }}
        >
            {({ errors }) => {
                setIsValid(Object.keys(errors).length === 0);
                return (
                <Form>

                    <div className='form-display'>
                        <label htmlFor="noemployees">Organisation Field:</label>
                        <div className='form-company-info'>
                            {options.map((option) => (
                                <div key={option.value}>
                                    <Field
                                        type="checkbox"
                                        name="fieldcheckboxes"
                                        value={inputValue.fieldcheckboxes}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                        <ErrorMessage name="fieldcheckboxes" component="div" style={{ color: 'red'}} />
                    </div>
                    <div className='form-display'>
                        <label htmlFor="noemployees">No to Emplyees:</label>
                        <div className='form-company-info'>
                            {employees.map((option) => (
                                <div key={option.value}>
                                    <Field
                                        type="checkbox"
                                        name="noemplyeescheckboxes"
                                        value={inputValue.noemplyeescheckboxes}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ErrorMessage name="noemplyeescheckboxes" component="div" style={{ color: 'red'}} />
                    <div className='form-display'>
                        <label htmlFor="noemployees">WFH:</label>
                        <div className='form-company-info'>
                            {wfhPolicy.map((option) => (
                                <div key={option.value}>
                                    <Field
                                        type="radio"
                                        name="wfhradio"
                                        value={inputValue.wfhradio}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='display-buttons'>
                        <button className='previous-button' type="button" onClick={()=>isValid && navigate("/")}>Previous</button>
                        <button className='next-button' type="submit">Next</button>
                    </div>
                </Form>
            )}}
        </Formik>
    );
};

export default CompanyInfoStep;
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanInfo } from '../redux/actions'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const plans = [
    { type: 'monthly', option: 'gold', price: 20 },
    { type: 'monthly', option: 'titanium', price: 30 },
    { type: 'yearly', option: 'gold', price: 200 },
    { type: 'yearly', option: 'titanium', price: 300 },
];


const PlanSelectionStep = ({setProgress, setTitle, isValid, setIsValid }) => {
    setTitle('Plan Selection')
    setProgress(100)

    const [inputValue, setInputValue] = useState({
        date: "",
        users: "",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate('')
    const planInfo = useSelector((state) => state.planInfo);

    const validationSchema = Yup.object().shape({
        plan: Yup.string().required('Please select a plan'),
        users: Yup.number().min(1, 'At least 1 user').required('Number of users is required'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };
    
    return (
        <Formik
            initialValues={planInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(setPlanInfo(values));
                isValid && console.log("form submitted")
            }}
        >
             {({ values, setFieldValue, errors }) => {
                setIsValid(Object.keys(errors).length === 0);
                const selectedPlan = plans.find(plan => `${plan.type}-${plan.option}` === values.plan);
                const totalPrice = selectedPlan ? selectedPlan.price * values.users : 0;

                return (
                <Form>

                    <div className='form-display'>
                        <label htmlFor="state">Start Plan Date:</label>
                        <Field type="date" name="date" placeholder="Select the Plan Date" />
                    </div>
                    <ErrorMessage name="date" component="div" onChange={handleChange} />

                        <Field type="number" name="users" placeholder="Number of Users" onChange={handleChange} />
                        <ErrorMessage name="users" component="div" />

                        {selectedPlan && (
                            <div>
                                <p>Price per User: ${selectedPlan.price}</p>
                                <p>Total Users: {values.users}</p>
                                <p>Total Price: ${totalPrice}</p>
                            </div>
                        )}

                    <button type="button" onClick={()=>isValid && navigate("/comapnyInfo")}>Previous</button>
                    <button type="submit">Submit</button>
                </Form>
            )}}
        </Formik>
    );
};
export default PlanSelectionStep;  
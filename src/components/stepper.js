import React, { useState } from 'react';
import PersonalInfoStep from './personalInfoStep';
import CompanyInfoStep from './companyInfoStep';
import PlanSelectionStep from './planeSelectionStep';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Stepper = () => {
    const [isValid, setIsValid] = useState(true);
    const [title, setTitle] = useState('')
    const [progress, setProgress] = useState(0);

    return (
        <>
            <div className="stepper-progress">
                <div className={`circle ${progress >= 33 ? 'active' : ''}`}>1</div>
                <div className={`line ${progress >= 66 ? 'active' : ''}`}></div>
                <div className={`circle ${progress >= 66 ? 'active' : ''}`}>2</div>
                <div className={`line ${progress >= 100 ? 'active' : ''}`}></div>
                <div className={`circle ${progress >= 100 ? 'active' : ''}`}>3</div>
            </div>
            <h1 className='heading-center'>{title}</h1>
            <div className="form-container">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<PersonalInfoStep isValid={isValid} setIsValid={setIsValid} setTitle={setTitle} setProgress={setProgress} />} />
                        <Route path='/comapnyInfo' element={<CompanyInfoStep isValid={isValid} setIsValid={setIsValid} setTitle={setTitle} setProgress={setProgress} />} />
                        <Route path='/PlanSelection' element={<PlanSelectionStep isValid={isValid} setIsValid={setIsValid} setTitle={setTitle} setProgress={setProgress} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

export default Stepper;

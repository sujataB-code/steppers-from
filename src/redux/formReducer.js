import {
    SET_PERSONAL_INFO,
    SET_COMPANY_INFO,
    SET_PLAN_INFO,
} from './actionTypes';

const initialState = {
    personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companyWebsite: '',
        state: '',
        zipCode: '',
    },
    companyInfo: {
        fields: [],
        employees: '',
        wfhPolicy: '',
    },
    planInfo: {
        startDate: '',
        plan: '',
        users: 1,
    },
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERSONAL_INFO:
            return { ...state, personalInfo: action.payload };
        case SET_COMPANY_INFO:
            return { ...state, companyInfo: action.payload };
        case SET_PLAN_INFO:
            return { ...state, planInfo: action.payload };
        default:
            return state;
    }
};

export default formReducer;

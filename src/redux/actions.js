import {
    SET_PERSONAL_INFO,
    SET_COMPANY_INFO,
    SET_PLAN_INFO,
} from './actionTypes';

export const setPersonalInfo = (payload) => ({
    type: SET_PERSONAL_INFO,
    payload,
});

export const setCompanyInfo = (payload) => ({
    type: SET_COMPANY_INFO,
    payload,
});

export const setPlanInfo = (payload) => ({
    type: SET_PLAN_INFO,
    payload,
});

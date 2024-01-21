import axios from "axios";
import { API_BASE_URL, api } from "../../config/api"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)
        if (data.token) {
            localStorage.setItem("jwt", data.token);

        }
        console.log("login success", data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.token })
    }
    catch (error) {
        console.log("-----", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
}

export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data)
        if (data.token) {
            localStorage.setItem("jwt", data.token);

        }
        console.log("register", data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.token })
    }
    catch (error) {
        console.log("-----error", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
};

export const getProfileAction = (token) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        
        console.log("Profile ----", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("-----error", error)
        dispatch({ type: GET_PROFILE_FAILURE, payload: error })
    }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users/update`,
            reqData
        );
        
        console.log("Update Profile ----", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("-----error", error)
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error })
    }
};

export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/search?query=${query}`);
        
        console.log("Search user ----", data);
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data })
    }
    catch (error) {
        console.log("-----error", error)
        dispatch({ type: SEARCH_USER_FAILURE, payload: error })
    }
};

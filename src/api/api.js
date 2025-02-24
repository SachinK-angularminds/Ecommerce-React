import axios from "axios";
import { store } from "../store";

const instance = axios.create({
    baseURL: "https://api.escuelajs.co/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
    },
});

// Function to get the token from localStorage or any other storage method
const getAuthToken = () => {
    const state = store.getState();
    return state.authReducer?.authData?.access_token
};

export const getApi = async (url) => {
    try {
        const headers = {};
        if (!url.includes("login") && !url.includes("signup")) {
            const token = getAuthToken();
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await instance.get(url, { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postApi = async (url, data) => {
    try {
        const headers = {};
        if (!url.includes("login") && !url.includes("signup")) {
            const token = getAuthToken();
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await instance.post(url, data, { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const putApi = async (url, data) => {
    try {
        const headers = {};
        if (!url.includes("login") && !url.includes("signup")) {
            const token = getAuthToken();
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await instance.put(url, data, { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteApi = async (url, data) => {
    try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.delete(url, { data, headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

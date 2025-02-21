import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.escuelajs.co/',
    timeout: 1000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json"
    }
});

export const getApi = async (url) => {
    try {
        const response = await instance.get(url);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
    }
};

export const postApi = async (url, data) => {
    try {
        const response = await instance.post(url, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
    }
};

export const putApi = async (url, data) => {
    try {
        const response = await instance.put(url, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
    }
};

export const deleteApi = async (url, data) => {
    try {
        const response = await instance.delete(url, { data });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
    }
};

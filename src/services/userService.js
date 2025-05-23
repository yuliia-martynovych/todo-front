import axios from "axios";

const API_URL = "http://localhost:8000/users"

export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/user/${username}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user by username:", error);
        throw error;
    }
}
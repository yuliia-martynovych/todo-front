import axios from "axios";

const API_URL = "http://localhost:8000/tasks";

export const getAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const getTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
}

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

export const getTasksByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks by user ID:", error);
        throw error;
    }
}

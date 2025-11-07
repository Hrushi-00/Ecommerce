import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // your backend URL

export const getProducts = () => axios.get(API_URL);
export const addProduct = (data) => axios.post(API_URL, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

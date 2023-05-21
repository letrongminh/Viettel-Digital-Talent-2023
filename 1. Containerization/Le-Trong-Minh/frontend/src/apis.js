import axios from "axios";

const port = process.env.PORT_API;
const BASE_URL = `http://localhost:${port}/api/v1`;

export const getStudent = (id) => axios.get(`${BASE_URL}/students/${id}`);

export const updateStudent = (id, newStudent) =>
    axios.put(`${BASE_URL}/students/${id}`, newStudent);

export const addStudent = (student) =>
    axios.post(`${BASE_URL}/students`, student);

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/users';

export const getUsers = () => axios.get(BASE_URL);
export const addUser = (user) => axios.post(BASE_URL, user);
export const updateUser = (user) => axios.put(`${BASE_URL}/${user.id}`, user);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);

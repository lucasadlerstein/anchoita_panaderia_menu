import axios from 'axios';
// require('dotenv').config()

const clienteAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api'
});

export default clienteAxios;
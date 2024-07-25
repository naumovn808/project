import axios from 'axios';

const newInstance = axios.create({
    baseURL: 'http://localhost:5000/',
});

export default newInstance;
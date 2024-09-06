import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-chat-nodejs.vercel.app'
})
export default api;


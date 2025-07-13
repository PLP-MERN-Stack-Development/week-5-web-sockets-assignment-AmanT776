import axios from 'axios';
import {io} from 'socket.io-client';
const baseURL = 'http://localhost:7000';
const APIUrl = 'http://localhost:7000/api';

const API = axios.create({
    baseURL: APIUrl
});

API.interceptors.request.use((cfg)=>{
    const token = localStorage.getItem('token');
    if(!token) return cfg;
    cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
})

export const signup = (formData)=>API.post('/auth/signup',formData);
export const login = (formData)=>API.post('/auth/login',formData);
export const createRoom = (formData)=>API.post('/rooms/',formData);
export const getRooms = ()=>API.get('/rooms/');
export const getMessages = (roomId) => API.get(`/messages/${roomId}`);
export const socket = io(baseURL, {
  autoConnect: false,
  query: {
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName')
  }
});


export default API;
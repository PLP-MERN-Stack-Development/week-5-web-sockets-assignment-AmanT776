import React, { useState } from 'react';
import { login } from '../services/api';
import { Link,useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login(form);
            localStorage.setItem("token",res.data);
            // Decode the token to get userId and userName
            const decoded = jwtDecode(res.data);
            localStorage.setItem("userId", decoded.id);
            localStorage.setItem("userName", decoded.userName);
            navigate('/rooms');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] w-full">
                    <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition text-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span className="text-gray-600 text-sm">Don't have an account? </span>
                    <Link to="/signup" className="text-indigo-600 hover:underline text-sm">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;
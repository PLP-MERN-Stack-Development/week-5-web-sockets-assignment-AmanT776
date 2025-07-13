import React, { useState } from 'react';
import { signup } from '../services/api';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Signup = () => {
    const [form, setForm] = useState({ userName: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await signup(form);
            // Store token, userId, and userName in localStorage
            localStorage.setItem('token', res.data);
            const decoded = jwtDecode(res.data);
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userName', decoded.userName);
            alert('Signup successful!');
        } catch (err) {
            setError('Signup failed. Please check your details.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] w-full">
                    <h1 className="text-2xl font-bold mb-8 text-center">Signup</h1>
                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2" htmlFor="userName">
                            Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-medium text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
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
                        Signup
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span className="text-gray-600 text-sm">Already have an account? </span>
                    <Link to="/login" className="text-indigo-600 hover:underline text-sm">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
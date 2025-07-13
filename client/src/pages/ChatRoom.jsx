import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages } from '../services/api';
import { io } from 'socket.io-client';

const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [typingUser, setTypingUser] = useState('');
    const messagesEndRef = useRef(null);
    const typingTimeout = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Create socket after userId/userName are in localStorage
        socketRef.current = io('http://localhost:7000', {
            query: {
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName')
            }
        });
        const socket = socketRef.current;
        socket.connect();
        socket.emit('joinRoom', { roomId });
        socket.emit('getUsersInRoom', { roomId });

        socket.on('new message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        socket.on('user list', (userList) => {
            setUsers(userList);
        });
        socket.on('user joined', ({ userName }) => {
            setUsers((prev) => {
                if (!prev.find(u => u.userName === userName)) {
                    return [...prev, { userName, isOnline: true }];
                }
                return prev.map(u => u.userName === userName ? { ...u, isOnline: true } : u);
            });
        });
        socket.on('offlineUser', (userName) => {
            setUsers((prev) => prev.map(u => u.userName === userName ? { ...u, isOnline: false } : u));
        });
        socket.on('typing', (userName) => {
            setTypingUser(userName);
        });
        socket.on('stop typing', ({ userName }) => {
            setTypingUser((prev) => (prev === userName ? '' : prev));
        });

        return () => {
            socket.emit('leaveRoom', { roomId });
            socket.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await getMessages(roomId);
                setMessages(res.data);
            } catch (err) {
                setError('Failed to fetch messages');
            }
        };
        fetchMessages();
    }, [roomId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        socketRef.current.emit('send message', newMessage);
        setNewMessage('');
        socketRef.current.emit('stop typing', { userName: localStorage.getItem('userName'), roomId });
    };

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        socketRef.current.emit('typing', localStorage.getItem('userName'));
        typingTimeout.current = setTimeout(() => {
            socketRef.current.emit('stop typing', { userName: localStorage.getItem('userName'), roomId });
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col h-[80vh]">
                <h1 className="text-2xl font-bold mb-2 text-center">Chat Room</h1>
                <div className="mb-2">
                    <span className="font-semibold">Users:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                        {users.map((u, idx) => (
                            <li key={idx} className={u.isOnline ? 'text-green-600' : 'text-gray-400'}>
                                {u.userName} {u.isOnline ? '(Online)' : '(Offline)'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 overflow-y-auto mb-4">
                    {messages.map((msg, idx) => {
                        const sender = users.find(u => u.userName === msg.sender?.userName);
                        const isOnline = sender?.isOnline;
                        return (
                            <div key={idx} className="mb-2 flex items-center gap-2">
                                <span className="flex items-center gap-1 font-semibold text-indigo-600">
                                    <span>{msg.sender?.userName || 'User'}</span>
                                    <span className={isOnline ? 'inline-block w-2 h-2 rounded-full bg-green-500' : 'inline-block w-2 h-2 rounded-full bg-gray-400'} title={isOnline ? 'Online' : 'Offline'}></span>
                                </span>
                                <span className="bg-gray-200 px-3 py-1 rounded-lg ml-2 text-gray-800">{msg.content}</span>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                {typingUser && <div className="text-sm text-gray-500 mb-2">{typingUser} is typing...</div>}
                {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatRoom;

import React, { useEffect, useState } from 'react';
import { getRooms, createRoom } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchRooms = async () => {
        try {
            const res = await getRooms();
            setRooms(res.data);
        } catch (err) {
            setError('Failed to fetch rooms');
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createRoom({ name: roomName });
            setRoomName('');
            setRooms(roomName)
            
        } catch (err) {
            setError('Failed to create room');
        }
    };
    console.log(rooms)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Rooms</h1>
                <form onSubmit={handleCreateRoom} className="flex mb-6 gap-2">
                    <input
                        type="text"
                        placeholder="New room name"
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition">Create</button>
                </form>
                {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
                <ul>
                    {rooms.map(room => (
                        <li key={room._id}>
                            <button
                                onClick={() => navigate(`/room/${room._id}`)}
                                className="w-full text-left px-4 py-2 mb-2 rounded-md bg-gray-200 hover:bg-indigo-100 transition"
                            >
                                {room.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomList; 
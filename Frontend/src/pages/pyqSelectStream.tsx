import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../App.css';

const streams = [
    { id: 'COE', name: 'Computer Engineering' },
    { id: 'COBS', name: 'Computer Science and Business Systems' },
    { id: 'COPC', name: 'Computer Science' },
    { id: 'ENC', name: 'Electronics and Computers' },
    { id: 'ECE', name: 'Electronics and Communication' },
    { id: 'EIC', name: 'Electronics and Instrumentation' },
    { id: 'MECH', name: 'Mechanical Engineering' },
    { id: 'MECHTRONICS', name: 'Mechatronics' },
    { id: 'CIVIL', name: 'Civil Engineering' },
    { id: 'BIOTECH', name: 'Biotechnology' },
];

const PYQSelectStream = () => {
    const navigate = useNavigate();

    const handleStreamClick = (streamId: string) => {
        navigate(`/select-year?stream=${streamId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <section className="flex flex-col items-center py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your Stream</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                    {streams.map((stream) => (
                        <div
                            key={stream.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg hover:bg-blue-50 transition"
                            onClick={() => handleStreamClick(stream.id)}
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {stream.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PYQSelectStream;

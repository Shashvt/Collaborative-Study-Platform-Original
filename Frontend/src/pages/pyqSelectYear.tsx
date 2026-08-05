import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../App.css';
import axios from 'axios';

const years = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    name: `Year ${index + 1}`,
}));

const PYQSelectYear = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const projectNotes = async () => {
        await axios.post(
            "http://localhost:8080/api/v1/view-pyqs",
            {
                subjectCode: "CS101",
                year: 1,
            },
            {
                withCredentials: true,
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const queryParams = new URLSearchParams(location.search);
    const stream = queryParams.get('stream') || 'Unknown Stream';

    const handleSemesterClick = (yearId: number) => {
        navigate(`/select-subject?stream=${stream}&year=${yearId}`);
    };

    useEffect(() => {
        projectNotes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <Navbar />
            <section className="w-full flex flex-col items-center py-8 px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Select Your Year</h1>
                <h2 className="text-xl text-gray-600 mb-12 text-center">Selected Stream: {stream}</h2>
                <div className="grid grid-cols-2 gap-6 w-full max-w-screen-lg">
                    {years.map((year) => (
                        <div
                            key={year.id}
                            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-xl hover:bg-blue-50 transition transform hover:scale-105"
                            style={{
                                width: '300px',
                                padding: '20px',
                            }}
                            onClick={() => handleSemesterClick(year.id)}
                        >
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                {year.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PYQSelectYear;

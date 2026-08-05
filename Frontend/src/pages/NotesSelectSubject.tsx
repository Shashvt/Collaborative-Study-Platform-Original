import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import axios from 'axios';

const NotesSelectSubject = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const stream = queryParams.get('stream');

    useEffect(() => {
        if (!year || !stream) {
            setError('Year or stream is missing.');
            setLoading(false);
            return;
        }

        const fetchSubjects = async () => {
            try {
                console.log("I was here")
                const response = await axios.post(
                    `http://localhost:8080/api/v1/fetch-subjects-notes?year=${year}&stream=${stream}`, {}, {
                        withCredentials: true,
                    }
                );
                
                const data = await response.data;
                setSubjects(data.subjects); // Assuming response contains an array of subjects
                setLoading(false);
            } catch (err) {
                setError('Error fetching subjects. Try again later.');
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [year, stream]);

    const handleSubjectClick = (subjectCode: string) => {
        navigate(`/subject-content?stream=${stream}&year=${year}&subject=${subjectCode}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <section className="flex-grow py-12 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Select Subject</h2>

                {loading && <div className="text-center text-gray-700">Loading subjects...</div>}
                {error && <div className="text-center text-red-600">{error}</div>}

                {subjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-8">
                        {subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg p-8 cursor-pointer hover:shadow-xl transition duration-300 flex flex-col items-center w-full max-w-sm"
                                onClick={() => handleSubjectClick(subject)}
                            >
                                <p className="text-xl font-semibold text-gray-800">{subject}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <div className="text-center text-gray-700 mt-6">No subjects available.</div>
                )}
            </section>
        </div>
    );
};

export default NotesSelectSubject;
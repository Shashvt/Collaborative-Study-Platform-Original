import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import NotesImage from '../assets/Notes.png';
import ClassImage from '../assets/Class.png';
import Navbar from '../components/navbar';

const PYQ = () => {
    const navigate = useNavigate();

    return (
        <div className="">
            <Navbar />
            <section className="w-full bg-white justify-center items-center flex flex-col min-h-screen">
                <div className="px-12 gap-12 flex flex-col py-12">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        <div
                            className="card cursor-pointer"
                            onClick={() => navigate('/select-stream')}
                        >
                            <img src={NotesImage} alt="View PYQ" />
                            <h3 className="mt-4 text-lg font-semibold text-center">
                                View Previous Year Questions
                            </h3>
                        </div>
                        <div
                            className="card cursor-pointer"
                            onClick={() => navigate('/upload-pyq')}
                        >
                            <img src={ClassImage} alt="Upload PYQ" />
                            <h3 className="mt-4 text-lg font-semibold text-center">
                                Upload Previous Year Questions
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PYQ;

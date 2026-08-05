import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import NotesImage from '../assets/Notes.png';
import ClassImage from '../assets/Class.png';
import axios from 'axios';
import Navbar from '../components/navbar';

const Notes = () => {
    const navigate = useNavigate();

    return (
        <div className=''>
            <Navbar />
        <section className="w-[100%] bg-[#FFFFFF] justify-center items-center flex flex-col min-h-screen">
            <div className="px-12 gap-12 flex flex-col py-12">    
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="card cursor-pointer" onClick={() => navigate('/select-stream')}>
                        <img src={NotesImage} alt="View Notes" />
                        <h3>View Notes</h3>
                    </div>
                    <div className="card cursor-pointer" onClick={() => navigate('/upload-notes')}>
                        <img src={ClassImage} alt="Upload Notes" />
                        <h3>Upload Notes</h3>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Notes;
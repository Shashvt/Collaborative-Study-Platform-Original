import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import NotesImage from '../assets/Notes.png';
import ClassImage from '../assets/Class.png';
import Navbar from '../components/navbar';

const Books = () => {
    const navigate = useNavigate();

    return (
        <div className=''>
            <Navbar />
        <section className="w-[100%] bg-[#FFFFFF] justify-center items-center flex flex-col min-h-screen">
            <div className="px-12 gap-12 flex flex-col py-12">    
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="card cursor-pointer" onClick={() => navigate('/view-books')}>
                        <img src={NotesImage} alt="View Books" />
                        <h3>View Books</h3>
                    </div>
                    <div className="card cursor-pointer" onClick={() => navigate('/upload-books')}>
                        <img src={ClassImage} alt="Upload Books" />
                        <h3>Upload Books</h3>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Books;
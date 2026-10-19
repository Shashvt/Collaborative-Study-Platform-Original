import React, { useState } from 'react';
import axios from "axios";
import '../App.css';
import Navbar from '../components/navbar';

const UploadPYQ = () => {
    const [fileName, setFileName] = useState('');
    const [year, setYear] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const stream = "COE";

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('Only PDF files are allowed.');
            setFile(null);
        } else {
            setError('');
            setFile(selectedFile);
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!fileName || !year || !subjectCode || !file) {
            setError('All fields are required.');
            setSuccess('');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/previous-year-upload?filename=${encodeURIComponent(fileName)}&year=${year}&subjectCode=${encodeURIComponent(subjectCode)}&stream=${encodeURIComponent(stream)}`,
                {},
                {
                    withCredentials: true
                }
            ).then(async(res) => {
                await axios.put(res.data.upload_url, file, {
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                });
                return res;
            })

            if (response.status === 200) {
                setSuccess('File uploaded successfully!');
                setError('');
            } else {
                throw new Error('Unexpected response from server');
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            setError(error.response?.data?.message || 'Failed to upload file.');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <section className="flex justify-center items-center pt-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Previous Year Questions</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">File Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter the name of file"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input 
                                type="text" 
                                placeholder="Enter the year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject Code</label>
                            <input 
                                type="text" 
                                placeholder="Enter the subject code" 
                                value={subjectCode}
                                onChange={(e) => setSubjectCode(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload File</label>
                            <input 
                                type="file"
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UploadPYQ;
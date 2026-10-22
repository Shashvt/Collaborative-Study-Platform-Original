import React, { useState } from 'react';
import axios from "axios";
import { API_BASE_URL } from '../config/api';
import '../App.css';
import Navbar from '../components/navbar';

const UploadNotes = () => {
    const [fileName, setFileName] = useState('');
    const [year, setYear] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [stream, setStream] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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

        if (!fileName || !year || !subjectCode || !stream || !file) {
            setError('All fields are required.');
            setSuccess('');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.post(
                `${API_BASE_URL}/api/v1/file-upload?filename=${encodeURIComponent(fileName)}&year=${year}&subjectCode=${encodeURIComponent(subjectCode)}&stream=${encodeURIComponent(stream)}`,
                {},
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );

            if (!res.data?.upload_url) {
                throw new Error("No upload URL returned from server.");
            }

            await axios.put(res.data.upload_url, file, {
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            setSuccess('File uploaded successfully!');
            setError('');
            setFileName('');
            setYear('');
            setSubjectCode('');
            setStream('');
            setFile(null);
        } catch (error: any) {
            console.error('Upload error:', error);
            const serverMsg = error.response?.data?.error || error.response?.data?.message;
            if (error.response?.status === 401) {
                setError('Session expired or unauthorized. Please log out and sign in again.');
            } else if (serverMsg) {
                setError(serverMsg);
            } else if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
                setError('Network/CORS error: Please ensure AWS S3 bucket CORS allows your Vercel domain.');
            } else {
                setError(error.message || 'Failed to upload file.');
            }
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <section className="flex justify-center items-center pt-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Notes</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
                        {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

                        {/* File Name */}
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

                        {/* Year */}
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

                        {/* Stream Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stream</label>
                            <select
                                value={stream}
                                onChange={(e) => setStream(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Stream</option>
                                <option value="COE">Computer Engineering (COE)</option>
                                <option value="COBS">Computer Science and Business Systems (COBS)</option>
                                <option value="COPC">Computer Science (COPC)</option>
                                <option value="ENC">Electronics and Computers (ENC)</option>
                                <option value="ECE">Electronics and Communication (ECE)</option>
                                <option value="EIC">Electronics and Instrumentation (EIC)</option>
                                <option value="MECH">Mechanical Engineering (MECH)</option>
                                <option value="MECHTRONICS">Mechatronics (MECHTRONICS)</option>
                                <option value="CIVIL">Civil Engineering</option>
                                <option value="BIOTECH">Biotechnology</option>
                            </select>
                        </div>

                        {/* Subject Code */}
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

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload File</label>
                            <input 
                                type="file" 
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 font-semibold"
                            >
                                {loading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UploadNotes;

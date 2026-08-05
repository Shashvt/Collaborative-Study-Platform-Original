import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/navbar';
import axios from 'axios';

const UploadBooks = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [bookUserId, setBookUserId] = useState('');
    const [bookImage, setBookImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/pjpeg') {
            setError('Only JPEG Images are allowed.');
            setBookImage(null);
            console.log('Selected file type:', selectedFile?.type);
        } else {
            setError('');
            setBookImage(selectedFile);
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!bookTitle || !bookAuthor || !bookDescription || !bookPrice || !bookUserId || !bookImage) {
            setError('All fields are required.');
            setSuccess('');
            return;
        }

        const formData = new FormData();
        formData.append('file', bookImage);
    
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/upload-book`,
                {
                    "title": bookTitle,
                    "author": bookAuthor,
                    "description": bookDescription,
                    "price": Number(bookPrice),
                },{
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setSuccess('Book uploaded successfully!');
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
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Books</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book Title</label>
                            <input 
                                type="text" 
                                placeholder="Enter the name of book"
                                value={bookTitle}
                                onChange={(e) => setBookTitle(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book Author</label>
                            <input 
                                type="text" 
                                placeholder="Enter the book author" 
                                value={bookAuthor}
                                onChange={(e) => setBookAuthor(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book Description</label>
                            <input 
                                type="text" 
                                placeholder="Enter the book description" 
                                value={bookDescription}
                                onChange={(e) => setBookDescription(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book Price</label>
                            <input 
                                type="text" 
                                placeholder="Enter the price of book"
                                value={bookPrice}
                                onChange={(e) => setBookPrice(e.target.value)} 
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book UserID</label>
                            <input 
                                type="text" 
                                placeholder="Enter the book user id" 
                                value={bookUserId} 
                                onChange={(e) => setBookUserId(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Book Image</label>
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
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UploadBooks;
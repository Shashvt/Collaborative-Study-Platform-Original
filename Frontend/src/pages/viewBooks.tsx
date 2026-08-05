import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';  // Assuming Navbar is in the components folder

const ViewBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch the books from the backend API
//         axios.get('http://localhost:8080/api/v1/get-books', { withCredentials: true })
//             .then((res) => {
//                 setBooks(res.data.books);  // Assuming the response contains a 'books' array
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError('Failed to fetch books');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <p>Loading books...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen text-red-600">
//                 <p>{error}</p>
//             </div>
//         );
//     }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {/* <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">View Books</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <img src={book.coverImageUrl || 'https://via.placeholder.com/150'} alt={book.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">{book.title}</h3>
                            <p className="text-gray-600 mt-2">{book.author}</p>
                            <p className="text-gray-500 mt-2">{book.description.slice(0, 100)}...</p>
                            <a
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            >
                                View Details
                            </a>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default ViewBooks;

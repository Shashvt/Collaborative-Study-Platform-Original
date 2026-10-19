import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

interface BookItem {
    book: {
        id: string;
        title: string;
        author: string;
        description: string;
        price: number;
        image: string;
        status: string;
    };
    user_email: string;
}

const ViewBooks = () => {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/view-books', { withCredentials: true })
            .then((res) => {
                setBooks(res.data.books || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                setError('Failed to fetch books');
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="container mx-auto py-8 px-4 flex-grow">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Available Books</h1>

                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <p className="text-gray-600 text-lg">Loading books...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-16 text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && books.length === 0 && (
                    <div className="text-center text-gray-600 py-16">
                        <p className="text-lg">No books available currently.</p>
                    </div>
                )}

                {!loading && !error && books.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {books.map((item, index) => (
                            <div key={item.book.id || index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between">
                                <div>
                                    {item.book.image ? (
                                        <img 
                                            src={item.book.image} 
                                            alt={item.book.title} 
                                            className="w-full h-48 object-cover rounded-t-lg mb-4" 
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg mb-4 text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-800">{item.book.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1 font-medium">By: {item.book.author}</p>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">{item.book.description}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-lg font-bold text-green-600">₹{item.book.price}</span>
                                    {item.user_email && (
                                        <a
                                            href={`mailto:${item.user_email}?subject=Interested in buying ${encodeURIComponent(item.book.title)}`}
                                            className="bg-blue-600 text-white text-xs px-3 py-2 rounded hover:bg-blue-700 transition"
                                        >
                                            Contact Seller
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewBooks;

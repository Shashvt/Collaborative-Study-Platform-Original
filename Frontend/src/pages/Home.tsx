import { useNavigate } from 'react-router-dom';
import '../App.css';
import NotesImage from '../assets/Notes.png';
import ClassImage from '../assets/Class.png';
import BooksImage from '../assets/Books.jpeg';
import Navbar from '../components/navbar';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className=''>
            <Navbar 
            isHome={true}
            />
        <section className="w-[100%] bg-[#FFFFFF] justify-center items-center flex flex-col min-h-screen">
            <div className="px-12 gap-12 flex flex-col py-12">    
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="card" onClick={() => navigate('/notes')}>
                        <img src={NotesImage} alt="Notes" />
                        <h3>Notes</h3>
                    </div>
                    <div className="card" onClick={() => navigate('/class')}>
                        <img src={ClassImage} alt="Join/Create Class" />
                        <h3>Join/Create Class</h3>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="card" onClick={() => navigate('/books')}>
                        <img src={BooksImage} alt="Books" />
                        <h3>Books</h3>
                    </div>
                    <div className="card" onClick={() => navigate('/pyqs')}>
                        <img src={ClassImage} alt="PYQ's" />
                        <h3>PYQS</h3>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => navigate('/saved')}
                    className="self-center text-blue-700 font-semibold hover:underline"
                >
                    Open saved materials
                </button>
            </div>
        </section>
        </div>
    );
};

export default HomeScreen;

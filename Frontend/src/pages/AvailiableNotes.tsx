import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { INotes } from "../interfaces/notes";
import SaveResourceButton from "../components/SaveResourceButton";

const NotesList = () => {
  const [notes, setNotes] = useState<INotes[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get("year");
  const stream = queryParams.get("stream");
  const subjectCode = queryParams.get("subject");
  console.log(year, stream, subjectCode);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/view-notes`,
        { year: Number(year), subjectCode, stream },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const data = response.data;
      setNotes(data.notes || []);
      setLoading(false);
    } catch (err) {
      setError("Error fetching notes. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoteClick = (link: string) => {
    //i will be providing aws link for a pdf file just open it in a new tab
    window.open(link, "_blank");
  };

  if (!notes)
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <section className="py-12 flex-grow flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Notes for Subject: {subjectCode}
          </h2>
          <div className="text-center text-gray-700">Loading notes...</div>
        </section>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <section className="py-12 flex-grow flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Notes for Subject: {subjectCode}
        </h2>

        {loading && (
          <div className="text-center text-gray-700">Loading notes...</div>
        )}
        {error && <div className="text-center text-red-600">{error}</div>}

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg px-4">
            {notes.map((note: INotes) => (
              <div
                key={note.ID}
                className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 cursor-pointer hover:shadow-xl hover:bg-blue-50 transition transform hover:scale-105"
                onClick={() => handleNoteClick(note.Content)}
              >
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {note.Title}
                </h3>
                <SaveResourceButton
                  id={note.ID}
                  title={note.Title}
                  kind="notes"
                  contentUrl={note.Content}
                  subject={subjectCode || undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-700 mt-6">
              No notes available.
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default NotesList;

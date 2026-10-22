import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { IClass } from "../interfaces/class";

const JoinClass = () => {
  const [classes, setClasses] = useState<IClass[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const subjectCode = new URLSearchParams(window.location.search).get(
    "subject"
  );

  useEffect(() => {
    // Fetch classes from the backend
    const fetchClasses = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/fetch-class-subject`,
          {
            subject: subjectCode,
          },
          {
            withCredentials: true,
          }
        ); // Replace with your API endpoint
        setClasses(response.data.classrooms); // Assuming the backend sends the `classes` array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch classes.");
        setLoading(false);
      }
    };

    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">No classes found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Join a Class
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classData: IClass) => (
            <div
              key={classData.ID}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {classData.Name}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Stream:</strong> {classData.Stream}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Year:</strong> {classData.Year}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Created On:</strong>{" "}
                {new Date(classData.CreatedDate).toLocaleDateString()}
              </p>
              {classData.URL ? (
                <a
                  href={classData.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Join Class
                </a>
              ) : (
                <p className="text-gray-500 italic">No URL provided</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinClass;

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { IClass } from "../interfaces/class";

const MyClasses = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/fetch-class`,
          {
            withCredentials: true,
          }
        ); // Endpoint to fetch user classes
        setClasses(response.data.classrooms); // Assuming response is an array of classes
        setLoading(false);
      } catch (err) {
        setError("Error fetching classes. Try again later.");
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  console.log(classes);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Your Classes
          </h2>

          {loading && (
            <div className="text-center text-gray-700">Loading classes...</div>
          )}
          {error && <div className="text-center text-red-600">{error}</div>}

          {classes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-3 text-left">Class Name</th>
                    <th className="px-6 py-3 text-left">Stream</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Year</th>
                    <th className="px-6 py-3 text-left">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classItem, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4">{classItem.Name}</td>
                      <td className="px-6 py-4">{classItem.Stream}</td>
                      <td className="px-6 py-4">{classItem.Subject}</td>
                      <td className="px-6 py-4">{classItem.Year}</td>
                      <td className="px-6 py-4">
                        {new Date(classItem.CreatedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-700 mt-6">
              You have not created any classes yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyClasses;

import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

const CreateClass = () => {
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [URL, setURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateMeetLink = (link: string) => {
    const meetRegex =
      /^https:\/\/meet\.google\.com\/[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/;
    return meetRegex.test(link);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !stream || !subject || !year || !URL) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (!validateMeetLink(URL)) {
      setError("Invalid Google Meet link.");
      setSuccess("");
      return;
    }

    setError("");
    const createdDate = Date.now();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/create-class",
        {
          name,
          stream,
          subject,
          year: parseInt(year),
          URL,
          createdDate,
        },
        {
          withCredentials: true,
        }
      );

      const data = await response.data;
      console.log("Class created:", data);

      setSuccess("Class created successfully!");
      setName("");
      setStream("");
      setSubject("");
      setYear("");
      setURL("");
    } catch (err) {
      setError("Failed to create class. Try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create a Class
          </h1>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Class Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Class Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter class name"
              />
            </div>

            {/* Stream Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="stream"
                className="block text-gray-700 font-medium mb-2"
              >
                Stream
              </label>
              <select
                id="stream"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Stream</option>
                <option value="COE">Computer Engineering (COE)</option>
                <option value="COBS">
                  Computer Science and Business Systems (COBS)
                </option>
                <option value="COPC">Computer Science (COPC)</option>
                <option value="ENC">Electronics and Computers (ENC)</option>
                <option value="ECE">Electronics and Communication (ECE)</option>
                <option value="EIC">
                  Electronics and Instrumentation (EIC)
                </option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
                <option value="MECHTRONICS">Mechatronics (MECHTRONICS)</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="BIOTECH">Biotechnology</option>
              </select>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-700 font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject"
              />
            </div>

            {/* Year Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="year"
                className="block text-gray-700 font-medium mb-2"
              >
                Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Google Meet Link */}
            <div className="mb-4">
              <label
                htmlFor="URL"
                className="block text-gray-700 font-medium mb-2"
              >
                Google Meet Link
              </label>
              <input
                type="text"
                id="URL"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Google Meet link"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create Class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomeScreen from "./pages/Home";
import Authentication from "./pages/Authentication";

import Notes from "./pages/Notes";
import UploadNotes from "./pages/uploadNotes";
import NotesSelectStream from "./pages/NotesSelectStream";
import NotesSelectYear from "./pages/NotesSelectYear";
import NotesSelectSubject from "./pages/NotesSelectSubject";
import NotesList from "./pages/AvailiableNotes";

import Books from "./pages/Books";
import UploadBooks from "./pages/uploadBooks";
import ViewBooks from "./pages/viewBooks";

import Class from "./pages/Class";
import JoinClass from "./pages/joinClass";
import CreateClass from "./pages/createClass";
import MyClasses from "./pages/myClasses";
import ClassSelectSubject from "./pages/ClassSelectSubject";

import PYQ from "./pages/pyq";
import UploadPYQ from "./pages/uploadPYQ";
import PYQSelectStream from "./pages/pyqSelectStream";
import PYQSelectYear from "./pages/pyqSelectYear";
import PYQSelectSubject from "./pages/pyqSelectSubject";
import PYQList from "./pages/AvailiablePYQ";
import SavedResources from "./pages/SavedResources";

import ProtectedRoute from "./components/protectedRoute";
import { AuthContextProvider } from "./context/Auth-Context";
import { SavedResourcesProvider } from "./context/SavedResources-Context";
import PublicRoute from "./components/publicRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
       <ToastContainer
      />
      <AuthContextProvider>
        <SavedResourcesProvider>
     
        <div className="App">
          <header className="App-header">
            <Routes>
              {/* Public Route */}
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <Authentication />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomeScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <Notes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-notes"
                element={
                  <ProtectedRoute>
                    <Notes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload-notes"
                element={
                  <ProtectedRoute>
                    <UploadNotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-stream"
                element={
                  <ProtectedRoute>
                    <NotesSelectStream />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-year"
                element={
                  <ProtectedRoute>
                    <NotesSelectYear />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-subject"
                element={
                  <ProtectedRoute>
                    <NotesSelectSubject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subject-content"
                element={
                  <ProtectedRoute>
                    <NotesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books"
                element={
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload-books"
                element={
                  <ProtectedRoute>
                    <UploadBooks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-books"
                element={
                  <ProtectedRoute>
                    <ViewBooks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class"
                element={
                  <ProtectedRoute>
                    <Class />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/join-class"
                element={
                  <ProtectedRoute>
                    <JoinClass />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-class"
                element={
                  <ProtectedRoute>
                    <CreateClass />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-classes"
                element={
                  <ProtectedRoute>
                    <MyClasses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-class-subject"
                element={
                  <ProtectedRoute>
                    <ClassSelectSubject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pyqs"
                element={
                  <ProtectedRoute>
                    <PYQ />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-pyq"
                element={
                  <ProtectedRoute>
                    <PYQ />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload-pyq"
                element={
                  <ProtectedRoute>
                    <UploadPYQ />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-stream"
                element={
                  <ProtectedRoute>
                    <PYQSelectStream />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-year"
                element={
                  <ProtectedRoute>
                    <PYQSelectYear />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-subject"
                element={
                  <ProtectedRoute>
                    <PYQSelectSubject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subject-pyq"
                element={
                  <ProtectedRoute>
                    <PYQList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </header>
        </div>
        </SavedResourcesProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

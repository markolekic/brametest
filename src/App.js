import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import CreateEditBlog from "./pages/CreateEditBlog";
import CreateEditCategory from "./pages/CreateEditCategory";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SingleBlog from "./pages/SingleBlog";
import GridBlog from "./pages/GridBlog";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./components/auth";
import RequireAuth from "./components/RequireAuth";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <section className='ui container'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/dashboard'
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/addBlog'
              element={
                <RequireAuth>
                  <CreateEditBlog />
                </RequireAuth>
              }
            />
            <Route
              path='/editBlog/:id'
              element={
                <RequireAuth>
                  <CreateEditBlog />
                </RequireAuth>
              }
            />
            <Route
              path='/addCategory'
              element={
                <RequireAuth>
                  <CreateEditCategory />
                </RequireAuth>
              }
            />
            <Route
              path='/editCategory/:id'
              element={
                <RequireAuth>
                  <CreateEditCategory />
                </RequireAuth>
              }
            />
            <Route path='/blogs/:id' element={<SingleBlog />} />
            <Route path='/blogs' element={<GridBlog />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </section>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

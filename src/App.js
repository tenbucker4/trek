import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import AuthProvider from "./auth/AuthContext";
import Home from "./pages/Home";
import "./styles/styles.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/trek"
                        element={<Navigate to="/trek/auth" />}
                    ></Route>
                    <Route path="/trek/auth" element={<Auth />}></Route>
                    <Route path="/trek/home" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

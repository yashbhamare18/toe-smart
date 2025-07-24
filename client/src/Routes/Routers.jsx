import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

import Login from "../Auth/Login";
import Home from "../AdminPages/Home";
import ContactUs from "../CustomerPages/ContactUs";
import AboutUs from "../CustomerPages/AboutUs";
import TowHistory from "../AdminPages/TowHistory";
import LandingPage from "../CustomerPages/LandingPage";
import C_Login from "../Auth/C_Login";
import C_SignUp from "../Auth/C_SignUp";
import CustomerChallans from "../CustomerPages/CustomerChallans";

import { AdminPrivateRoute, CustomerPrivateRoute } from "../Context/PrivateRoutes";
import { useAdminAuth, useCustomerAuth } from "../Context/AuthProvider";

export default function Routers() {
    const [authAdmin] = useAdminAuth();         
    const [authCustomer] = useCustomerAuth();   

    return (
        <Routes>
            {/* Shared Routes */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/landing" element={<LandingPage />} />

            {/* Admin Routes */}
            <Route
                path="/"
                element={
                    <AdminPrivateRoute>
                        <Home />
                    </AdminPrivateRoute>
                }
            />
            <Route
                path="/home"
                element={
                    <AdminPrivateRoute>
                        <Home />
                    </AdminPrivateRoute>
                }
            />
            <Route
                path="/history"
                element={
                    <AdminPrivateRoute>
                        <TowHistory />
                    </AdminPrivateRoute>
                }
            />
            <Route
                path="/login"
                element={!authAdmin ? <Login /> : <Navigate to="/" />}
            />

            {/* Customer Routes */}
            <Route
                path="/c/login"
                element={!authCustomer && !authAdmin ? <C_Login /> : <Navigate to="/landing" />}
            />
            <Route path="/c/signup" element={<C_SignUp />} />
            <Route
                path="/c/challans"
                element={
                    <CustomerPrivateRoute>
                        <CustomerChallans />
                    </CustomerPrivateRoute>
                }
            />
        </Routes>
    );
}


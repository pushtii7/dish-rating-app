import React, { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DishProvider } from "./contexts/DishContext";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

const Login = lazy(() => import("./components/Login"));
const Navigation = lazy(() => import("./components/Navigation"));
const RankDishes = lazy(() => import("./components/RankDishes"));
const TopRankedDishes = lazy(() => import("./components/TopRankedDishes"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <DishProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Navigation />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <RankDishes />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/top"
                                element={
                                    <PrivateRoute>
                                        <TopRankedDishes />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <AdminPanel />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Suspense>
                </DishProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

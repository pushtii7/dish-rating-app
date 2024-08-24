import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DishProvider } from "./contexts/DishContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import RankDishes from "./components/RankDishes";
import TopRankedDishes from "./components/TopRankedDishes";
import AdminPanel from "./components/AdminPanel";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <DishProvider>
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
                </DishProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

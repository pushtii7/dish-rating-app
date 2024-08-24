import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="nav">
            <div className="nav-header">
                <h1 className="nav-title">Dish Rating App</h1>
                <div className="nav-profile">
                    <img
                        id="profileImage"
                        src={`http://api.dicebear.com/5.x/initials/svg?seed=${user?.username}`}
                        alt="Profile"
                        className="profile-image"
                    />
                    <button className="btn btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="nav-list">
                <NavLink to="/" className="nav-item">
                    Rank Dishes
                </NavLink>
                <NavLink to="/top" className="nav-item">
                    Top Ranked Dishes
                </NavLink>
                {user.isAdmin && (
                    <NavLink to="/admin" className="nav-item">
                        Admin Panel
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navigation;

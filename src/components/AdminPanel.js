import React, { useContext, useState } from "react";
import { DishContext } from "../contexts/DishContext";
import users from "../data/users.json";
import toast from "react-hot-toast";

const AdminPanel = () => {
    const {
        dishes,
        rankings,
        updateDishPoints,
        updateUserRankings,
        deleteUserRankings,
    } = useContext(DishContext);
    const [editingUser, setEditingUser] = useState(null);

    const handleRankChange = (userId, dishId, newRank) => {
        const userRankings = rankings[userId] || {};
        const oldRank = userRankings[dishId];
        let newUserRankings = { ...userRankings };

        Object.entries(newUserRankings).forEach(([key, value]) => {
            if (value === newRank && key !== dishId.toString()) {
                delete newUserRankings[key];
                updateDishPoints(Number(key), -getPoints(newRank));
            }
        });

        if (oldRank) {
            updateDishPoints(dishId, -getPoints(oldRank));
        }
        if (newRank) {
            newUserRankings[dishId] = newRank;
            updateDishPoints(dishId, getPoints(newRank));
        } else {
            delete newUserRankings[dishId];
        }

        updateUserRankings(userId, newUserRankings);
    };

    const handleDeleteUser = (userId) => {
        const userRankings = rankings[userId] || {};
        Object.entries(userRankings).forEach(([dishId, rank]) => {
            updateDishPoints(Number(dishId), -getPoints(rank));
        });
        deleteUserRankings(userId);
        toast.success("User ranking deleted successfully");
    };

    const getPoints = (rank) => {
        switch (rank) {
            case "1":
                return 30;
            case "2":
                return 20;
            case "3":
                return 10;
            default:
                return 0;
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            {users
                .filter((user) => !user.isAdmin)
                .map((user) => (
                    <div key={user.id} className="card1">
                        <h3>{user.username}</h3>
                        <h4>Ranked Dishes:</h4>
                        <ul>
                            {Object.entries(rankings[user.id] || {}).map(
                                ([dishId, rank]) => {
                                    const dish = dishes.find(
                                        (d) => d.id === Number(dishId)
                                    );
                                    return dish ? (
                                        <li key={dishId}>
                                            {dish.dishName} - Rank {rank}
                                        </li>
                                    ) : null;
                                }
                            )}
                        </ul>
                        {editingUser === user.id ? (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Dish</th>
                                            <th>Rank</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dishes.map((dish) => (
                                            <tr key={dish.id}>
                                                <td>{dish.dishName}</td>
                                                <td>
                                                    <select
                                                        value={
                                                            rankings[user.id]?.[
                                                                dish.id
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleRankChange(
                                                                user.id,
                                                                dish.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-control"
                                                    >
                                                        <option value="">
                                                            Unrank
                                                        </option>
                                                        <option value="1">
                                                            Rank 1
                                                        </option>
                                                        <option value="2">
                                                            Rank 2
                                                        </option>
                                                        <option value="3">
                                                            Rank 3
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    onClick={() => {
                                        setEditingUser(null);
                                        toast.success(
                                            "User updated successfully"
                                        );
                                    }}
                                    className="btn btn-primary mt-2"
                                >
                                    Done
                                </button>
                            </>
                        ) : (
                            <div>
                                <button
                                    onClick={() => setEditingUser(user.id)}
                                    className="btn btn-primary mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default AdminPanel;

import React, { useContext } from "react";
import { DishContext } from "../contexts/DishContext";
import { AuthContext } from "../contexts/AuthContext";

const TopRankedDishes = () => {
    const { dishes, rankings } = useContext(DishContext);
    const { user } = useContext(AuthContext);

    const sortedDishes = [...dishes].sort((a, b) => b.points - a.points);

    return (
        <div>
            <h2>Top Ranked Dishes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Dish</th>
                        <th>Points</th>
                        <th>Your Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedDishes.map((dish, index) => (
                        <tr key={dish.id}>
                            <td>{index + 1}</td>
                            <td>{dish.dishName}</td>
                            <td>{dish.points}</td>
                            <td>
                                {rankings[user.id]?.[dish.id] || "Not ranked"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopRankedDishes;

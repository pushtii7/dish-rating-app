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
          </tr>
        </thead>
        <tbody>
          {sortedDishes.map((dish, index) => (
            <tr key={dish.id}>
              <td>{index + 1}</td>
              <td>
                <div>{dish.dishName}</div>
                {rankings[user.id]?.[dish.id] && (
                  <div className="ranked-text">
                    you have ranked this dish {rankings[user.id]?.[dish.id]}
                  </div>
                )}
              </td>
              <td>{dish.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopRankedDishes;

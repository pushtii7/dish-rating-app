import React, { useContext, useState, useEffect } from "react";
import { DishContext } from "../contexts/DishContext";
import { AuthContext } from "../contexts/AuthContext";
import DishCard from "./DishCard";

const RankDishes = () => {
    const { dishes, rankings, updateDishPoints, updateUserRankings } =
        useContext(DishContext);
    const { user } = useContext(AuthContext);
    const [userRankings, setUserRankings] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const dishesPerPage = 10;

    useEffect(() => {
        setUserRankings(rankings[user.id] || {});
    }, [rankings, user.id]);

    const handleRank = (dishId, rank) => {
        const oldRank = userRankings[dishId];
        let newRankings = { ...userRankings };

        if (rank) {
            // Remove the old rank if it exists
            if (oldRank) {
                updateDishPoints(dishId, -getPoints(oldRank));
            }

            // Find and remove any existing dish with the new rank
            Object.entries(newRankings).forEach(([key, value]) => {
                if (value === rank) {
                    delete newRankings[key];
                    updateDishPoints(Number(key), -getPoints(rank));
                }
            });

            newRankings[dishId] = rank;
            updateDishPoints(dishId, getPoints(rank));
        } else {
            // If rank is being removed
            if (oldRank) {
                updateDishPoints(dishId, -getPoints(oldRank));
                delete newRankings[dishId];
            }
        }

        setUserRankings(newRankings);
        updateUserRankings(user.id, newRankings);
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

    const indexOfLastDish = currentPage * dishesPerPage;
    const indexOfFirstDish = indexOfLastDish - dishesPerPage;
    const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(dishes.length / dishesPerPage);
    
        return (
            <div className="pagination">
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <div className="pagination-buttons">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (number) => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={currentPage === number ? "active" : ""}
                            >
                                {number}
                            </button>
                        )
                    )}
                </div>
            </div>
        );
    };
    
    return (
        <div>
            <h2>Rank Dishes</h2>
            <div className="grid">
                {currentDishes.map((dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        rank={userRankings[dish.id]}
                        onRank={handleRank}
                    />
                ))}
            </div>
            {renderPagination()}
        </div>
    );
};

export default RankDishes;

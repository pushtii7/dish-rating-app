import React from "react";

const DishCard = ({ dish, rank, onRank }) => {
    return (
        <div className="card">
            <img src={dish.image} alt={dish.dishName} loading="lazy" />
            <div className="content">
                <h3 className="title">{dish.dishName}</h3>
                <p className="desc">{dish.description}</p>
                <p className="points">Points: {dish.points}</p>
                <select
                    value={rank || ""}
                    onChange={(e) => onRank(dish.id, e.target.value)}
                    className="form-control"
                >
                    <option value="">Unrank</option>
                    <option value="1">Rank 1</option>
                    <option value="2">Rank 2</option>
                    <option value="3">Rank 3</option>
                </select>
            </div>
        </div>
    );
};

export default DishCard;

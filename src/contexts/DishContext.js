import React, { createContext, useState, useEffect } from 'react';
import { fetchDishes } from '../utils/api';
import { getStoredDishes, setStoredDishes, getStoredRankings, setStoredRankings } from '../utils/localStorage';

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [rankings, setRankings] = useState({});

  useEffect(() => {
    const storedDishes = getStoredDishes();
    const storedRankings = getStoredRankings();
    if (storedDishes) {
      setDishes(storedDishes);
    } else {
      fetchDishes().then((data) => {
        const dishesWithPoints = data.map(dish => ({ ...dish, points: 0 }));
        setDishes(dishesWithPoints);
        setStoredDishes(dishesWithPoints);
      });
    }
    setRankings(storedRankings);
  }, []);

  const updateDishPoints = (dishId, points) => {
    setDishes(prevDishes => {
      const updatedDishes = prevDishes.map(dish => 
        dish.id === dishId ? { ...dish, points: Math.max(0, dish.points + points) } : dish
      );
      setStoredDishes(updatedDishes);
      return updatedDishes;
    });
  };

  const updateUserRankings = (userId, newRankings) => {
    setRankings(prevRankings => {
      const updatedRankings = { ...prevRankings, [userId]: newRankings };
      setStoredRankings(updatedRankings);
      return updatedRankings;
    });
  };

  const deleteUserRankings = (userId) => {
    setRankings(prevRankings => {
      const updatedRankings = { ...prevRankings };
      delete updatedRankings[userId];
      setStoredRankings(updatedRankings);
      return updatedRankings;
    });
  };

  return (
    <DishContext.Provider value={{ dishes, rankings, updateDishPoints, updateUserRankings, deleteUserRankings }}>
      {children}
    </DishContext.Provider>
  );
};
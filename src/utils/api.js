export const fetchDishes = async () => {
    const response = await fetch('https://raw.githubusercontent.com/dctacademy/react-task/main/db.json');
    return await response.json();
  };
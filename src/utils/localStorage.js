export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const setStoredUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeStoredUser = () => {
    localStorage.removeItem('user');
  };
  
  export const getStoredDishes = () => {
    const dishes = localStorage.getItem('dishes');
    return dishes ? JSON.parse(dishes) : null;
  };
  
  export const setStoredDishes = (dishes) => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  };
  
  export const getStoredRankings = () => {
    const rankings = localStorage.getItem('rankings');
    return rankings ? JSON.parse(rankings) : {};
  };
  
  export const setStoredRankings = (rankings) => {
    localStorage.setItem('rankings', JSON.stringify(rankings));
  };
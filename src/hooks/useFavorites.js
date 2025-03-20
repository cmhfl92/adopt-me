import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = dogId => {
    setFavorites(prev => [...new Set([...prev, dogId])]);
  };

  const removeFavorite = dogId => {
    setFavorites(prev => prev.filter(id => id !== dogId));
  };

  const clearFavorites = dogId => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [productsData, setProductsData] = useState({});

  const addFavorite = (id, productData) => {
    console.log('Adding favorite:', id, productData);
    setFavorites([...favorites, id]);
    setProductsData({ ...productsData, [id]: productData });
  };

  const removeFavorite = (id) => {
    console.log('Removing favorite:', id);
    setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    const updatedProductsData = { ...productsData };
    delete updatedProductsData[id];
    setProductsData(updatedProductsData);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, productsData, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

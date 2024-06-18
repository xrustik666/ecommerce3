import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const Favorites = () => {
  const { favorites, productsData, removeFavorite } = useFavorites();

  const handleFavoriteClick = (id) => {
    removeFavorite(id);
  };

  return (
    <ul className="products">
      {favorites.length === 0 ? (
        <p>No favorite products.</p>
      ) : (
        favorites.map((id) => (
          <li key={id} className="products--item">
            <div className="favorite-icon" onClick={() => handleFavoriteClick(id)}>
              <div className="heart heart-solid">♥</div>
            </div>
            
            {productsData[id] ? (
              <Link to={`/product/${id}`}>
                <div className="product">
                  <img className="product--image" src={productsData[id].image} alt={productsData[id].title} />
                  <span className="product--title" title={productsData[id].title}>{productsData[id].title}</span>
                </div>
              </Link>
            ) : (
              <p>Product data not available</p>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

export default Favorites;

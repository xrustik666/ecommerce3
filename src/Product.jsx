import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);

  if (loading) return <p>...Loading info about the product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <div className="product-description">
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};

export default Product;

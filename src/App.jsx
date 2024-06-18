import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Categories from './Categories.jsx';
import Products from './Products.jsx';
import Product from './Product.jsx';
import Favorites from './Favorites.jsx';

import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [errorCategories, setErrorCategories] = useState(false);
  const [errorProducts, setErrorProducts] = useState(false);
  const [errorMessageCategories, setErrorMessageCategories] = useState('');
  const [errorMessageProducts, setErrorMessageProducts] = useState('');

  // Download categories by API
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setErrorCategories(true);
      setErrorMessageCategories(error.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Download products by API (based on a category that someone chooses)
  const fetchProducts = async (category) => {
    setLoadingProducts(true);
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : 'https://fakestoreapi.com/products';
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setErrorProducts(true);
      setErrorMessageProducts(error.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div className = "header">
                <h1>Products</h1>

                <div className="navigation">
                  <ul>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/Favorites">Favorites</Link></li>
                  </ul>
                </div>
              </div>

              {loadingCategories ? (
                <p>Loading categories...</p>
              ) : errorCategories ? (
                <p>{errorMessageCategories}</p>
              ) : (
                <Categories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
              )}
              {loadingProducts ? (
                <p>Loading products...</p>
              ) : errorProducts ? (
                <p>{errorMessageProducts}</p>
              ) : (
                <Products products={products} />
              )}
            </>
          } />
          <Route path="/Favorites" element={
            <>
              <div className = "header">
                <h1>Favorites</h1>

                <div class="navigation">
                  <ul>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/Favorites">Favorites</Link></li>
                  </ul>
                </div>
              </div>

              {loadingProducts ? (
                <p>Loading products...</p>
              ) : errorProducts ? (
                <p>{errorMessageProducts}</p>
              ) : (
                <Favorites />
              )}
            </>
          } />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
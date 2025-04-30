import React, { useState, useEffect } from 'react';
import './Main.css';
import './Responsive.css';

function Products({ style }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLike = (e) => {
        e.preventDefault(); 
        const heart = e.currentTarget.querySelector('.unlikedheart i');
        if (heart.classList.contains('fa-regular')) {
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            heart.style.color = "#ff0000"; 
        }
        else {
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            heart.style.color = "#292d32"; 
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="productsbody" style={style}>Loading...</div>;
  if (error) return <div className="productsbody" style={style}>Error: {error}</div>;

  return (
    <div className="productsbody" style={style}>
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} />
          <div className='content'>
            <div className='content-data'>
              <h2>{product.title}</h2>
              <p>
                <span style={{ textDecoration: "underline" }}>Sign in</span> or Create an account to see pricing
              </p>
            </div>
            <div>
              <span onClick={handleLike} className="unlikedheart">
                <i className="fa-regular fa-heart" style={{ color: "#292d32" }}></i>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
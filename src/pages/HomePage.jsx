import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      console.log("VITE_BACKEND_URL:",`${VITE_BACKEND_URL}/api/products/`);
      const response = await axios.get(`http://localhost:3000/api/products/`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          to={"/create"}
          className="inline-block  text-center shadow-md text-sm bg-blue-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {Array.isArray(products) && products.length > 0 ? (
              // Render the list of products when products exist
              products.map((product, index) => (
                <Product key={index} product={product} getProducts={getProducts} />
              ))
            ) : (
              // Render a message when there are no products
              <div>There are no products</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

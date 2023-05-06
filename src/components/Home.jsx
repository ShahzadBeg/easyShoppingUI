import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, getTotal } from "../features/slices/CartSlice";
import { useEffect } from "react";

const Home = () => {
  const { item, status, error } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="home-container">
      {status === "pending" ? (
        <p>loading...</p>
      ) : error ? (
        <p>Error : {error}</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {item.products?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.images[0]} alt={product.name} />
                <div className="details">
                  <span>{product.description}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

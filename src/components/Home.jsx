import { useSelector } from "react-redux";

const Home = () => {
  const { items, status, error } = useSelector((state) => state.products);

  return (
    <div className="home-container">
      {status == "pending" ? (
        <p>loading...</p>
      ) : error ? (
        <p>Error : {error}</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {items?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <span>{product.description}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button>Add To Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

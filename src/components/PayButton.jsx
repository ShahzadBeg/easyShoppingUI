import axios from "axios";
import { baseUrl, config } from "../features/api";

const PayButton = ({ cart }) => {
  const handleCheckout = () => {
    console.log("item", cart);
    axios
      .post(`${baseUrl}/createorder`, cart, config)
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;

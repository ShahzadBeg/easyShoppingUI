import axios from "axios";
import { baseUrl, config } from "../features/api";
import { useSelector } from "react-redux";

const PayButton = ({ cart }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    let object = { ...cart, userID: user._Id };
    let obj2 = { ...cart, ...object };
    axios
      .post(`${baseUrl}/createorder`, obj2, config)
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

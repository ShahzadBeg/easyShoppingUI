import axios from "axios";
import { baseUrl, config } from "../features/api";
import { useSelector } from "react-redux";

const PayButton = ({ cart }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    let object = { ...cart, userID: user._Id };
    let obj2 = { ...cart, ...object };
    console.log("original", obj2);
    const orderValue = {
      cartItems: [
        // {
        //   Id: 0,
        //   name: "",
        //   description: "",
        //   price: 0,
        //   image: "",
        //   Quantity: 0,
        // },
      ],
      cartTotalAmount: obj2.cartTotalAmount,
      cartTotalQuantity: obj2.cartTotalQuantity,
      userID: obj2.userID,
    };
    if (obj2.cartItems.length > 0) {
      for (let i = 0; i < obj2.cartItems.length; i++) {
        orderValue.cartItems.push({
          Id: obj2.cartItems[i].id,
          name: obj2.cartItems[i].name,
          description: obj2.cartItems[i].description,
          price: obj2.cartItems[i].price,
          image: obj2.cartItems[i].images[0],
          Quantity: obj2.cartItems[i].Quantity,
        });
      }
    }
    console.log("chnagdeCart", orderValue);
    axios
      .post(`${baseUrl}/createorder`, orderValue, config)
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

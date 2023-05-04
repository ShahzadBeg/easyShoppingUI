import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import Product from "./components/admin/Product";
import Summary from "./components/admin/Summary";
import CreatProduct from "./components/admin/CreatProduct";
import CreateTag from "./components/admin/CreateTag";
import CreateCategory from "./components/admin/CreateCategory";
import SuccessCheckOut from "./components/SuccessCheckOut";
import Address from "./components/Address";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/address" element={<Address />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Product />}>
              <Route path="create" element={<CreatProduct />} />
            </Route>
            <Route path="createtag" element={<CreateTag />} />
            <Route path="createCategory" element={<CreateCategory />} />
            <Route path="summary" element={<Summary />} />
          </Route>
          <Route path="/success-checkout" element={<SuccessCheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

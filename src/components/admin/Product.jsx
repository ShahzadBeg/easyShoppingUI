import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories, getTags } from "../../features/slices/ProductSlice";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <AdminHeaders>
        <div>Product</div>
        <PrimaryButton onClick={() => navigate("/admin/products/create")}>
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Product;

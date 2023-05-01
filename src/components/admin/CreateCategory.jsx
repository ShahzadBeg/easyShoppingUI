import { useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch } from "react-redux";
import { createCategpry } from "../../features/slices/ProductSlice";
import { useEffect } from "react";
import { getCategories } from "../../features/slices/ProductSlice";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const productState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    description: "",
  };
  const [category, setCategory] = useState(initialState);
  const handledSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategpry(category));
    category.name = "";
    category.description = "";
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [productState.createCategory, dispatch]);
  return (
    <StyledCreateCategory>
      <StyledForm onSubmit={handledSubmit}>
        <h3>Create Category</h3>
        <input
          type="text"
          placeholder="enter name"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="enter description"
          value={category.description}
          onChange={(e) =>
            setCategory({ ...category, description: e.target.value })
          }
          required
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </StyledForm>
    </StyledCreateCategory>
  );
};

export default CreateCategory;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateCategory = styled.div`
  display: flex;
  justify-content: space-between;
`;

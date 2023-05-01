import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch } from "react-redux";
import { createTag, getTags } from "../../features/slices/ProductSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const CreateTag = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const InitialState = {
    name: "",
    description: "",
  };
  const [tagValues, setTagvalues] = useState(InitialState);

  const handledSubmit = (e) => {
    e.preventDefault();
    dispatch(createTag(tagValues));
    tagValues.name = "";
    tagValues.description = "";
  };
  useEffect(() => {
    dispatch(getTags());
  }, [product.createTag, dispatch]);

  return (
    <StyledCreateTag>
      <StyledForm onSubmit={handledSubmit}>
        <h3>Create Tag</h3>
        <input
          type="text"
          placeholder="enter tag name"
          value={tagValues.name}
          onChange={(e) => setTagvalues({ ...tagValues, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="enter description"
          value={tagValues.description}
          onChange={(e) =>
            setTagvalues({ ...tagValues, description: e.target.value })
          }
          required
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </StyledForm>
    </StyledCreateTag>
  );
};

export default CreateTag;
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

const StyledCreateTag = styled.div`
  display: flex;
  justify-content: space-between;
`;

import styled from "styled-components";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getTags,
  testCreateProd,
} from "../../features/slices/ProductSlice";
import { PrimaryButton } from "./CommonStyled";

const CreatProduct = () => {
  const dispach = useDispatch();
  const InitialState = {
    productName: "",
    description: "",
    price: "",
    stock: "",
    slug: "",
  };
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const getProduct = useSelector((state) => state.products);
  const [product, setProduct] = useState(InitialState);
  const handledSelectedTags = (e) => {
    setSelectedTags(e);
    console.log("selecttag", selectedTags);
  };
  const removeSelectedTag = (e) => {
    setSelectedTags(e);
    console.log("removeTag", selectedTags);
  };
  useEffect(() => {
    const allTags = [];
    if (getProduct.tags.length > 0) {
      for (let i = 0; i < getProduct.tags.length; i++) {
        allTags.push(getProduct.tags[i].tagName);
      }
    }
    setTags(allTags);
  }, [getProduct.tags]);

  useEffect(() => {
    var allCategories = [];
    if (getProduct.categories.length > 0) {
      for (let i = 0; i < getProduct.categories.length; i++) {
        allCategories.push(getProduct.categories[i].categoryName);
      }
    }
    setCategories(allCategories);
  }, [getProduct.categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();

    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("slug", product.slug);
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      formData.append("productImages", image);
    }
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      formData.append("productTags", tag);
    }
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      formData.append("productCategory", category);
    }

    dispach(testCreateProd(formData));
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create Product</h3>
        <br />
        <span>up to 3 images</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          required
        />
        <input
          type="text"
          placeholder="product name"
          onChange={(e) => {
            setProduct({ ...product, productName: e.target.value });
          }}
          value={product.productName}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => {
            setProduct({ ...product, description: e.target.value });
          }}
          value={product.description}
        />
        <input
          type="text"
          placeholder="price"
          onChange={(e) => {
            setProduct({ ...product, price: e.target.value });
          }}
          value={product.price}
        />
        <input
          type="text"
          placeholder="stock"
          onChange={(e) => {
            setProduct({ ...product, stock: e.target.value });
          }}
          value={product.stock}
        />
        <input
          type="text"
          placeholder="slug"
          onChange={(e) => {
            setProduct({ ...product, slug: e.target.value });
          }}
          value={product.slug}
        />
        <Multiselect
          options={tags}
          isObject={false}
          placeholder="Select Tags"
          showCheckbox
          onSelect={(e) => setSelectedTags(e)}
          onRemove={(e) => setSelectedTags(e)}
        />
        <Multiselect
          options={categories}
          isObject={false}
          placeholder="Select Categories"
          showCheckbox
          onSelect={(e) => setSelectedTags(e)}
          onRemove={(e) => setSelectedTags(e)}
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </StyledForm>

      <ImagePreview>
        {Array.from(images).map((image, index) => {
          return (
            <img
              key={index}
              src={image ? URL.createObjectURL(image) : null}
              width={100}
              height={100}
              style={{ pedding: "10px" }}
            />
          );
        })}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreatProduct;

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

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

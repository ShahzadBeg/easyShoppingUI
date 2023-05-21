import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import {
  getProductbyId,
  updateProduct,
} from "../../features/slices/ProductSlice";
import { PrimaryButton } from "./CommonStyled";

export default function EditProduct({ prodId }) {
  const InitialState = {
    productName: "",
    description: "",
    price: "",
    stock: "",
    slug: "",
  };
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [Alltags, setAllTags] = React.useState([]);
  const [Allcategories, setAllCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const getProduct = useSelector((state) => state.products);
  const [product, setProduct] = React.useState(InitialState);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (open) {
      setImages([]);
      const allTags = [];
      if (getProduct.tags.length > 0) {
        for (let i = 0; i < getProduct.tags.length; i++) {
          allTags.push(getProduct.tags[i].tagName);
        }
      }
      setAllTags(allTags);
      var allCategories = [];
      if (getProduct.categories.length > 0) {
        for (let i = 0; i < getProduct.categories.length; i++) {
          allCategories.push(getProduct.categories[i].categoryName);
        }
      }
      setAllCategories(allCategories);
      dispatch(getProductbyId(prodId));
    }
  }, [open]);

  React.useEffect(() => {
    if (!getProduct.editProductLoading && getProduct.editProduct) {
      setProduct({
        ...product,
        productName: getProduct.editProduct.productName,
        description: getProduct.editProduct.description,
        price: getProduct.editProduct.price,
        stock: getProduct.editProduct.stock,
        slug: getProduct.editProduct.slug,
      });
    }
  }, [getProduct.editProductLoading]);

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
    dispatch(updateProduct(formData));
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {getProduct.editProductLoading ? (
            "Loding..."
          ) : getProduct.editProduct ? (
            <StyledCreateProduct>
              <StyledForm onSubmit={handleSubmit}>
                <span>up to 3 images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
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
                  type="number"
                  placeholder="price"
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                  value={product.price}
                />
                <input
                  type="number"
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
                  options={Alltags}
                  isObject={false}
                  placeholder="Select Tags"
                  showCheckbox
                  onSelect={(e) => setTags(e)}
                  onRemove={(e) => setTags(e)}
                />
                <Multiselect
                  options={Allcategories}
                  isObject={false}
                  placeholder="Select Categories"
                  showCheckbox
                  onSelect={(e) => setCategories(e)}
                  onRemove={(e) => setCategories(e)}
                />
                <PrimaryButton type="submit" disabled={false}>
                  Submit
                </PrimaryButton>
              </StyledForm>
              <ImagePreview>
                {images.length > 1 ? (
                  <>
                    {Array.from(images).map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image ? URL.createObjectURL(image) : null}
                          width={100}
                          height={100}
                          alt="img"
                          style={{ pedding: "10px" }}
                        />
                      );
                    })}
                  </>
                ) : getProduct.editProduct ? (
                  <>
                    {Array.from(getProduct.editProduct.imgUrls).map(
                      (imageurl, index) => {
                        return (
                          <img
                            key={index}
                            src={imageurl ? imageurl : null}
                            width={100}
                            height={100}
                            alt="img"
                            style={{ pedding: "10px" }}
                          />
                        );
                      }
                    )}
                  </>
                ) : (
                  <>Images will appear here</>
                )}
              </ImagePreview>
            </StyledCreateProduct>
          ) : getProduct.editproductError ? (
            "Some error need to check "
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const Edit = styled.div`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
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

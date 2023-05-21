import styled from "styled-components";
import { useSelector } from "react-redux";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/slices/ProductSlice";
import EditProduct from "./EditProduct";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const ProductsList = () => {
  const { item, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const rows =
    !loading &&
    item?.products &&
    item.products.map((product) => {
      return {
        id: product.id,
        imageUrl: product.images[0],
        pName: product.name,
        pDesc: product.description,
        price: product.price.toLocaleString(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },

    {
      field: "pDesc",
      headerName: "Description",
      width: 90,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDeleteClick(params.row.id)}>
              Delete
            </Delete>
            <EditProduct prodId={params.row.id} />
            <View>View</View>
          </Actions>
        );
      },
    },
  ];

  const handleDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      {loading
        ? "Loading..."
        : item && (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </div>
          )}
    </>
  );
};

export default ProductsList;

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
button{
  border:none,
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
`;
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

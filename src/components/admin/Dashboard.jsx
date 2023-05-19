import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategories, getTags } from "../../features/slices/ProductSlice";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { AiOutlineTags } from "react-icons/ai";

const Dashboard = () => {
  const prodcut = useSelector((state) => state.products);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTags());
  //   dispatch(getCategories());
  // }, [prodcut.tags, dispatch, prodcut.categories]);

  return (
    <StyledDashboard>
      <SideNav>
        <h3>Quick Links</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          <FaTachometerAlt /> Summary
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          <FaStore /> Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard /> Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/createTag"
        >
          <AiOutlineTags /> Tags
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/createCategory"
        >
          <BiCategory /> Categories
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          <FaUsers /> Users
        </NavLink>
      </SideNav>

      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;

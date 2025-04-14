import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;

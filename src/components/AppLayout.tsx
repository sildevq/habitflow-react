import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="px-11 py-11 lg:px-20 xl:px-40">
        <Outlet />
      </div>
    </>
  );
}
export default AppLayout;

import { Outlet } from "react-router-dom";
import Menu from "../components/dashboard/Menu";
import "../assets/css/_tailwind.css";
import "../assets/css/index.css";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  return (
    <>
      <Menu />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;

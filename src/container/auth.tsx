import { Outlet } from "react-router-dom";
import "../assets/css/_tailwind.css";

const Auth = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;

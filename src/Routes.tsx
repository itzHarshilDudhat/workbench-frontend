import {
  Route,
  Routes as ReactRoutes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Auth from "./container/auth";
import Signup from "./components/signup";
import { useSelector } from "react-redux";
import Login from "./components/login";
import { ReduxState } from "./helper/interface";
import Dashboard from "./container/dashboard";
import ManageUser from "./components/manage-user";
import Main from "./components/dashboard/Main";
import ManageIncome from "./components/income";
import ManageExpense from "./components/expense";

const ProtectedRoutes = () => {
  const token = useSelector((state: ReduxState) => state.base.token);
  return token ? <Outlet /> : <Navigate to="auth/login" />;
};

const CheckSuperRights = () => {
  const isSuperUser = useSelector(
    (state: ReduxState) => state.base.isSuperUser
  );
  return isSuperUser ? <Outlet /> : <Navigate to="/" />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="auth" element={<Auth />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="" element={<ProtectedRoutes />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Main />}>
              <Route path="income" element={<ManageIncome />} />
              <Route path="expense" element={<ManageExpense />} />
            </Route>
            <Route path="manage-user" element={<CheckSuperRights />}>
              <Route path="" element={<ManageUser />} />
            </Route>
          </Route>
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;

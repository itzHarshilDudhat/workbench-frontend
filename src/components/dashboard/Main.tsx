import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex w-full">
          <li className="flex-grow">
            <div
              onClick={() => navigate("/income")}
              className={`cursor-pointer p-2 border-b-2 border-transparent rounded-t-lg ${
                location.pathname.includes("income")
                  ? "border-blue-600  active dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              } w-full text-center`}
            >
              Income
            </div>
          </li>
          <li className="flex-grow">
            <div
              onClick={() => navigate("/expense")}
              className={`cursor-pointer p-2 border-b-2 border-transparent rounded-t-lg ${
                location.pathname.includes("expense")
                  ? "border-blue-600  active dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              } w-full text-center`}
            >
              Expense
            </div>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Main;

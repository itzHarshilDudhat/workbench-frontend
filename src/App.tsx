import { ToastContainer } from "react-toastify";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
};

export default App;

import { FaBars, FaTimes } from "react-icons/fa";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <nav
      className={`bg-gray-800 w-64 h-screen fixed overflow-y-auto transition-transform transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-white text-2xl font-bold">Your App</h2>
        <ul className="mt-6">
          <li className="mb-3">
            <a
              href="#"
              className="text-white hover:text-gray-400 flex items-center"
            >
              <span className="mr-3">🏠</span>
              Home
            </a>
          </li>
          <li className="mb-3">
            <a
              href="#"
              className="text-white hover:text-gray-400 flex items-center"
            >
              <span className="mr-3">ℹ️</span>
              About
            </a>
          </li>
          {/* Add more sidebar links as needed */}
        </ul>
      </div>
      {/* <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 focus:outline-none text-white"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button> */}
    </nav>
  );
};

export default Sidebar;

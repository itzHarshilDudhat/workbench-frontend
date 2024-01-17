import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

const UserCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3 relative">
      <div className="justify-center items-center flex">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <BsFillPersonFill className="text-white h-9 w-9 rounded-full mr-2 bg-gray-300" />
          <p className="font-semibold text-sm">Harshil Dudhat</p>
        </div>

        <div className="relative ml-2">
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white p-2 rounded shadow-md">
              <ul>
                <li className="py-2 cursor-pointer">
                  <div className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md">
                    Change Password
                  </div>
                </li>
                <li className="py-2 cursor-pointer">
                  <div className="text-gray-700 hover:bg-red-100 px-4 py-2 rounded-md">
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

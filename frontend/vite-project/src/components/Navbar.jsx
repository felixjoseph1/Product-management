import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";

const Navbar = (props) => {
  const { toggleDarkMode } = props;
  return (
    <header className="bg-blue-900 h-16 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between">
        <div className="text-3xl font-bold p-3 pl-8 text-white">
          <Link to="/">Product Store</Link>
        </div>
        <div className="flex flex-row items-center pr-16">
          <div className="text-xl text-white p-4">
            <Link to="/create">
              Create product
              <button className="ml-2">
                <CiSquarePlus className="inline-block text-4xl" />
              </button>
            </Link>
          </div>
          <div className="text-xl text-white p-4">
            <button className="ml-2" onClick={toggleDarkMode}>
              Dark mode
              <IoMoon className="ml-2 inline-block text-3xl pb-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

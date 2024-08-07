import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  const ListLinknav = [
    { to: "/", title: "Home" },
    { to: "/shop", title: "Shop" },
    { to: "/login", title: "Login" },
    { to: "/regiter", title: "Regiter" },
  ];

  const handleSubmit = async (data) => {
    console.log(data);
  };
  return (
    <nav className="relative bg-white shadow ">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt="Description of the image"
            />
          </Link>
        </div>
        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            {ListLinknav.map((item, index) => (
              <Link
                to={`${item.to}`}
                key={index}
                className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <form
            onSubmit={() => handleSubmit()}
            className="relative mt-4 md:mt-0"
          >
            <button className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="text"
              id="search"
              name="search"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
export default Header;

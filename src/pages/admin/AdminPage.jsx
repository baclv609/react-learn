import React, { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import api from "../../api";

export default function AdminPage() {
  const { state, dispatch } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteItem = async (id) => {
    try {
      if (confirm("Do you want to delete this product?")) {
        await api.delete(`/products/${id}`);
        dispatch({ type: "DELETE_PRODUCT", payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const [product, setProduct] = useState(data);
  // const [sortDirection, setSortDirection] = useState(1);

  // useEffect(() => {
  //   if (data) {
  //     setProduct(data);
  //   }
  // }, [data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setProduct(filteredData);
  };

  // const filteredData = state.products.filter((p) =>
  //   p.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleSortByPrice = () => {
  //   if (sortDirection === 1) {
  //     const sorted = [...filteredData].sort((a, b) => a.price - b.price);
  //     setProduct(sorted);
  //     setSortDirection(-1);
  //   } else {
  //     const sorted = [...filteredData].sort((a, b) => b.price - a.price);
  //     setProduct(sorted);
  //     setSortDirection(1);
  //   }
  // };
  return (
    <div className="flex flex-col">
      <div className="m-1.5 overflow-x-auto">
        <h1>hello admin</h1>
        <div className="mt-4 flex justify-between mx-5">
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            to="/admin/product-from"
          >
            Add new product
          </Link>
          <div>
            {/* <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block  mt-2 w-[300px] placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            /> */}
          </div>
        </div>

        {/* btn sort by price */}
        <div className="mt-4">
          <button
            // onClick={handleSortByPrice}
            className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            <svg
              className="w-5 h-5 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-1">
              {/* {sortDirection === 1
                ? "Sort by Price Ascending"
                : "Sort by Price Descending"} */}
            </span>
          </button>
        </div>

        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Thumbnail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {state.products.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-24 w-24"
                        />
                      ) : (
                        "Đang cập nhật"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      {item.brand ? item.brand : "Đang cập nhật"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Link
                        to={`/admin/product-from/${item.id}`}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

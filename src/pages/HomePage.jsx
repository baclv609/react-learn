import React from "react";
export default function HomePage({ data }) {
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(data) ? (
          data.map((item) => {
            return (
              <div
                key={item.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              >
                <a href={`/san-pham/${item.id}`}>
                  <img
                    className="p-8 rounded-t-lg"
                    src={item.thumbnail}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href={`/san-pham/${item.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                      {item.title}
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      {item.price} $
                    </span>
                    <a
                      href={`/san-pham/${item.id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Không có dữ liệu sản phẩm.</p>
        )}
      </div>
    </div>
  );
}

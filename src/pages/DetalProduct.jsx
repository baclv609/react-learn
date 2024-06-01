import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../api";
// useParam dùng để lấy tham số trong url

export default function DetalProduct() {
  const useRoute = useParams();
  const [productDetal, setProductDetal] = React.useState([]);
  console.log("useRoute.id", useRoute.id);
  useEffect(() => {
    try {
      api
        .get(`/products/${useRoute.id}`)
        .then((res) => setProductDetal(res.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={productDetal.thumbnail}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {productDetal.brand}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {productDetal.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">
                  {productDetal.rating} Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{productDetal.description}</p>

            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${productDetal.price}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

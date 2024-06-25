import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "../../schemaValid/productSchema";
import api from "../../api";
import { useNavigate, useParams } from "react-router";
import ProductReducer from "../../reducers/productReducer";

export default function ProductFrom() {
  const navigate = useNavigate();
  const { dispatch } = useReducer(ProductReducer);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          reset(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  }
  const onSubmit = (data) => {
    (async () => {
      try {
        if (id) {
          await api.patch(`/products/${id}`, data);
          dispatch({ type: "UPDATE_PRODUCT", payload: { id, ...data } });
          navigate("/admin");
        } else {
          const { data } = await api.post("/products", data);
          dispatch({ type: "ADD_PRODUCT", payload: data });
          if (
            confirm("Thành công! Bạn có muốn tiếp tục thêm sản phẩm không?")
          ) {
            navigate("/admin");
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div>
      <h1>{id ? "Product Edit" : "Product Add"}</h1>
      <form className="max-w-sm mx-auto my-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            {...register("title", { require: true })}
          />
          {errors.title?.message && (
            <p className="text-[red]">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("price", { require: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-[red]">{errors.price?.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            description
          </label>
          <input
            type="text"
            id="description"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
            {...register("description")}
          />
        </div>

        <div className="mt-5 w-full">
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {id ? "Product Edit" : "Product Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

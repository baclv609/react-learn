import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "../../schemaValid/productSchema";
import api from "../../api";
import { useNavigate, useParams } from "react-router";
import ProductReducer from "../../reducers/productReducer";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

export default function ProductFrom() {
  const navigate = useNavigate();
  const { dispatch } = useReducer(ProductReducer);
  const { id } = useParams();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  // State để lưu trữ lựa chọn của người dùng
  const [thumbnailOption, setThumbnailOption] = useState("keep");

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
          console.log(data);
          reset(data);
          setThumbnailUrl(data.thumbnail);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id, reset]);
  }

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    return data.secure_url;
  };
  const onSubmit = (product) => {
    (async () => {
      try {
        console.log("product", product);
        let updatedProduct = { ...product };
        // Kiểm tra lựa chọn của admin và xử lý tương ứng
        switch (thumbnailOption) {
          case "upload":
            // Xử lý upload ảnh nếu admin chọn upload từ local
            if (product.thumbnail && product.thumbnail[0]) {
              const thumbnailUrl = await uploadImage(product.thumbnail[0]);
              console.log("Uploaded thumbnail URL:", thumbnailUrl);
              updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
            }
            break;
          default:
          // Giữ nguyên ảnh cũ khi không thay đổi
          // Hoặc mặc định khi người dùng chọn "link ảnh online"
          // Tôi sử dụng switch case để dễ mở rộng cho các tình huống trong tương lai
        }

        if (id) {
          await api.patch(`/products/${id}`, updatedProduct);
          dispatch({
            type: "UPDATE_PRODUCT",
            payload: { id, product: updatedProduct },
          });
          navigate("/admin");
        } else {
          const res = await api.post("/products", updatedProduct);
          dispatch({ type: "ADD_PRODUCT", payload: res.data });
          console.log(res.data);
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
            Description
          </label>
          <input
            type="text"
            id="description"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnailOption" className="form-label">
            Choose Thumbnail Option
          </label>
          <select
            className="form-control"
            id="thumbnailOption"
            value={thumbnailOption}
            onChange={(e) => setThumbnailOption(e.target.value)}
          >
            <option value="keep">Keep Current Thumbnail</option>
            <option value="link">Add Thumbnail from Link</option>
            <option value="upload">Upload Thumbnail from Local</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          {thumbnailOption === "link" && (
            <input
              type="text"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail")}
            />
          )}
          {thumbnailOption === "upload" && (
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              {...register("thumbnail", { required: true })}
            />
          )}
          {errors.thumbnail?.message && (
            <p className="text-danger">{errors.thumbnail?.message}</p>
          )}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Product Thumbnail"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="mt-5 w-full">
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ShopPage from "../pages/ShopPage";
import LoginPage from "../pages/LoginPage";
import NoPage from "../pages/NoPage";
import DetalProduct from "../pages/DetalProduct";
import AdminPage from "../pages/admin/AdminPage";
import api, { getProducts } from "../api/index";
import ProductAdd from "../pages/admin/ProductAdd";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductFrom from "../pages/admin/ProductFrom";
import Regiter from "../pages/Regiter";
import AuthFrom from "../pages/AuthFrom";
import PrivateRoute from "../components/PrivateRoute";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutClient from "../layouts/LayoutClient";

export default function MyRouter() {
  const [products, setProduct] = useState([]); //  lưu trữ dữ liệu sp
  const navigate = useNavigate(); // biến để chuyển hướng tới router khác

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = (data) => {
    console.log(data); // nhận dữ liệu từ ProductAdd
    // cập nhật lại sp
    (async () => {
      try {
        const res = await api.post("/products", data); // gửi dữ liệu lên server
        setProduct([...products, res.data]); // cập nhật lại sp
        // lấy toàn bộ sản phầm cũ và công thêm sản phẩm mới
        if (
          confirm(
            "Thêm sản phẩm thành công! Bạn có muốn tiếp tục thêm sản phẩm không?"
          )
        ) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleSubmitEdit = (data) => {
    (async () => {
      try {
        await api.patch(`/products/${data.id}`, data);
        const newProduct = await getProducts(); // get data mới rồi gán lại
        setProduct(newProduct);
        if (
          confirm(
            "Cập nhật thành công! Bạn có muốn tiếp tục thêm sản phẩm không?"
          )
        ) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleSubmitFrom = (data) => {
    (async () => {
      try {
        if (data.id) {
          // logic cho Edit
          await api.patch(`/products/${data.id}`, data);
          const newProduct = await getProducts(); // get data mới rồi gán lại
          setProduct(newProduct);

          navigate("/admin");
        } else {
          const res = await api.post("/products", data); // gửi dữ liệu lên server
          setProduct([...products, res.data]); // cập nhật lại sp
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

  const hendaleDelete = (id) => {
    // console.log("id", id);
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      (async () => {
        try {
          await api.delete(`/products/${id}`);
          const newData = products.filter((p) => p.id != id && p);
          setProduct(newData);
        } catch (error) {
          console.log(error);
        }
      })();
      }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage data={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/san-pham/:id" element={<DetalProduct />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage data={products} />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        {/* private router for admin */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route
            path="/admin"
            element={<AdminPage data={products} deleteItem={hendaleDelete} />}
          />
          <Route
            path="/admin/product-from"
            element={<ProductFrom onProduct={handleSubmitFrom} />}
          />
          <Route
            path="/admin/product-from/:id"
            element={<ProductFrom onProduct={handleSubmitFrom} />}
          />
        </Route>

        {/* path empty */}
        <Route path="/regiter" element={<AuthFrom isRegiter={true} />} />
        <Route path="/login" element={<AuthFrom isRegiter={false} />} />
      </Routes>
    </div>
  );
}

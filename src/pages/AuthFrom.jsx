import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authSchema from "../schemaValid/authSchema";
import api from "../api";
import { useNavigate } from "react-router";

export default function AuthFrom({ isRegiter }) {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data) => {
    (async () => {
      try {
        if (isRegiter) {
          const res = await api.post(`/register`, data);
          if (confirm("Đăng ký thành công!")) {
            nav("/login");
          }
        } else {
          const res = await api.post(`/login`, data);
          // console.log(res.data);
          if (confirm("Đăng nhập thành công!")) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <div>
      <h1 className="text-center text-[36px]">
        {isRegiter ? "Regiter" : "Login"}
      </h1>
      <form className="max-w-sm mx-auto my-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            email
          </label>
          <input
            type="text"
            id="email"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            {...register("email", { require: true })}
          />
          {errors.email?.message && (
            <p className="text-[red]">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("password", { require: true })}
          />
          {errors.password?.message && (
            <p className="text-[red]">{errors.password?.message}</p>
          )}
        </div>

        <div className="mt-5 w-full">
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isRegiter ? "Regiter" : "login"}
          </button>
        </div>
      </form>
    </div>
  );
}

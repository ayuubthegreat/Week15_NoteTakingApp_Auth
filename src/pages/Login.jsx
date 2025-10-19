import { loginSchema } from "../schema/authSchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../store/slices/authSlice";
import { data } from "autoprefixer";


const Login = () => {
  const nav = useNavigate();
  const dptch = useDispatch();
  const [isSubmitting, setSubmit] = useState(false);

  const {register, handleSubmit, reset, formState:{errors},} = useForm({
    resolver: zodResolver(loginSchema), 
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSend = async(data) => {
    try {
      setSubmit(true);
      await dptch(login(data)).unwrap();
      setSubmit(false);
      console.log(`Login successful.`);
      reset();
      nav(`/notes`);
    } catch (error) {
      console.log(`Something went awry. Here's the error: ${error}`);
    }
  }
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(async(data) => {await onSend(data)})}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-600 hover:text-yellow-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

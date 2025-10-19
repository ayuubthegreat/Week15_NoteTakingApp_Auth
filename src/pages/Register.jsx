import { login, register as regista } from "../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerSchema } from "../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";



const Register = () => {
  const [isSubmitting, setSubmit] = useState(false);
  const nav = useNavigate();
  const dptch = useDispatch();
  const {register,
     handleSubmit, 
     reset, 
     formState:{errors},} = useForm({
      resolver: zodResolver(registerSchema), 
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: ""
      },
     });
  const onSend = async(data) => {
    setSubmit(true)
    try {
      await dptch(regista(data)).unwrap();
      console.log("Registration successful. Welcome aboard.")
      reset();
      setSubmit(false);
      setTimeout(() => {
        nav("/notes")
      }, 300)
    } catch(error){
      console.log("Uh oh....something went wrong. Here's the error:", error);
    }
  }
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(async (data) => { await onSend(data)})}>
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
          {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}

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
          {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            
          </div>
          {errors.confirmPassword && (<p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>)}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:text-yellow-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

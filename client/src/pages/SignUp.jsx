import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex flex-col justify-center gap-5 rounded-lg bg-gray-800 border border-gray-700 p-8">
        <h1 className="text-xl md:text-2xl text-white fontSB">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6 fontL" action="#">
          <div>
            <label htmlFor="username" className="block text-md text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none caret-white"
              placeholder="JohnDoe23"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-md text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none caret-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#692cc4] hover:bg-[#522299] rounded-lg text-sm px-5 py-2.5 text-center fontR"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-gray-400 fontL">
          Already have an account yet? &nbsp;
          <Link to={"/login"} className="fontR hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
export default SignUp;

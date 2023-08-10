import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAlphaNumeric = (input) => {
    var pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(input);
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isAlphaNumeric(username)) {
      console.log("clicked");
      toast.error("Username contains special characters");
      setLoading(false);
      return false;
    }
    const data = { username, password };
    try {
      const result = await axios.post(
        "https://multiple-todo-list.vercel.app/auth/signup",
        data
      );
      toast.success(result.data.success, {
        onClose: () => navigate("/login"),
      });
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex flex-col justify-center gap-5 rounded-lg bg-gray-800 border border-gray-700 p-8">
        <h1 className="text-xl md:text-2xl text-white fontSB">
          Sign in to your account
        </h1>
        <form
          className="space-y-4 md:space-y-6 fontL"
          onSubmit={(e) => SubmitForm(e)}
        >
          <div>
            <label htmlFor="username" className="block text-md text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg w-full p-2 outline-none caret-white"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg w-full p-2 outline-none caret-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#692cc4] hover:bg-[#522299] rounded-lg text-sm px-5 py-2.5 text-center fontR"
          >
            {loading ? (
              <i className="fa-duotone fa-spinner-third fa-spin text-sm"></i>
            ) : (
              "Sign In"
            )}
          </button>
          <ToastContainer
            theme="dark"
            autoClose={2000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
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

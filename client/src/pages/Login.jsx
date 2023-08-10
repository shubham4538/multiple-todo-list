import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginContext } from "../context/LoginContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const SubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };
    try {
      const result = await axios.post("http://localhost:3001/auth/login", data);
      const details = {
        token: result.data.token,
        username: result.data.username,
      };
      localStorage.setItem("ToDoUser", JSON.stringify(details));
      setUser(details);
      toast.success(result.data.success, {
        autoClose: 2000,
        theme: "dark",
        onClose: () => navigate("/"),
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        autoClose: 2000,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex flex-col justify-center gap-5 rounded-lg bg-gray-800 border border-gray-700 p-8">
        <h1 className="text-xl md:text-2xl text-white fontSB">
          Login to your account
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
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-full p-2 outline-none caret-white fontR"
              placeholder="JohnDoe23"
              onChange={(e) => setUsername(e.target.value)}
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
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-full p-2 outline-none caret-white fontR"
              onChange={(e) => setPassword(e.target.value)}
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
              "Login"
            )}
          </button>
          <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        </form>
        <p className="text-sm text-gray-400 fontL">
          Don’t have an account yet? &nbsp;
          <Link to={"/signup"} className="fontR hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Login;
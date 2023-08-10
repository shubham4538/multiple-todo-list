import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "../styles/window.css";
import { LoginContext } from "../context/LoginContext";

function AddFolderWindow({ folderWindow, setFolderWindow }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const inputRef = useRef();
  const { user } = useContext(LoginContext);

  // name suggests
  const validateTitle = (title) => {
    const alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
    if (!alphanumericPattern.test(title)) {
      toast.error("No Special Characters allowed !");
      setLoading(false);
      return false;
    }
  };

  // also name suggests
  const generateSlug = (title) => {
    const slug = title.toString().toLowerCase().split(" ").join("-");
    return slug;
  };

  // hehe
  const exitFolderWindow = () => {
    setFolderWindow(false);
    setLoading(false);
    setTitle("");
    setUrl("");
  };

  // bla bla
  const AddFolder = async (e) => {
    e.preventDefault();
    setLoading(true);
    validateTitle(title);
    const slug = generateSlug(title);
    const data = {
      title,
      slug,
      url,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const result = await axios.post(
        "https://multiple-todo-list.vercel.app/account/addfolder",
        data,
        config
      );
      toast.success(result.data.message);
      exitFolderWindow();
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  // input ref
  useEffect(() => {
    if (folderWindow) {
      inputRef.current.focus();
    }
  }, [folderWindow]);

  return (
    <div
      className={`${
        folderWindow ? "back-visible" : "back-hidden"
      } z-10 flex items-center justify-center absolute bg-[#0000008c] h-screen w-screen backdrop-blur-[4px]`}
    >
      <div
        className={`${
          folderWindow ? "block-visible" : "block-hidden"
        } flex flex-col gap-4 items-center fontR text-white rounded-lg bg-gray-800 border border-gray-700 p-8`}
      >
        <span className="text-xl fontSB">Add Folder</span>
        <form className="flex flex-col gap-4" onSubmit={(e) => AddFolder(e)}>
          <div>
            <label htmlFor="username" className="block text-base text-white">
              Title
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-60 p-2 pb-1  outline-none caret-white fontR"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-base text-white">
              Custom Icon Url <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-60 p-2 pb-1  outline-none caret-white fontR"
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <button
              type="button"
              className="button bg-gray-700 hover:bg-gray-900 p-1 pt-2 px-3 text-base rounded-md active:scale-[0.95]"
              onClick={exitFolderWindow}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button bg-indigo-700 hover:bg-indigo-800 p-1 pt-2 px-3 text-base rounded-md active:scale-[0.95]"
            >
              {loading ? (
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddFolderWindow;

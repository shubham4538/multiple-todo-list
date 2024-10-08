import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import { LoginContext } from "../context/LoginContext";
import "../styles/Home.css";

function Home({
  folderWindow,
  deleteFolderWindow,
  setFolderId,
  setFolderWindow,
  setDeleteFolderWindow,
  setDeleteFolderName,
}) {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const AddFolder = () => {
    setFolderWindow(true);
  };

  const logOut = () => {
    localStorage.removeItem("ToDoUser");
    setUser(null);
    navigate("/");
  };

  // set id details for deleting folder
  const deleteFolder = (name, id) => {
    setFolderId(id);
    setDeleteFolderWindow(true);
    setDeleteFolderName(name);
  };

  // fetching user folders
  useEffect(() => {
    (async () => {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const result = await axios.get(
            "https://multiple-todo-list.vercel.app/account/details",
            config
          );
          setFolders(result.data);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, [folderWindow, deleteFolderWindow]);

  return loading ? (
    <div className="text-white font-semibold">loading...</div>
  ) : user ? (
    <div className="container relative">
      <div
        className="bg-red-500 hover:bg-red-600 absolute top-0 right-0 text-base px-2 pt-1 rounded-2xl cursor-pointer"
        onClick={logOut}
        title="Log Out"
      >
        <i className="fas fa-power-off"></i>
      </div>
      <span className="text-3xl text-[#943ee3] fontB">Multiple To-Do List</span>
      <form>
        <button
          type="button"
          className="button bg-indigo-700 p-1 pt-2 px-3 text-base rounded-md m-3"
          onClick={AddFolder}
        >
          Add new
        </button>
      </form>
      {folders.length > 0 ? (
        <div className="py-5 flex flex-col gap-2 w-full sm:w-[calc(130px+40vw)] sm:max-w-[600px]">
          {folders.map((folder) => {
            return (
              <Link key={folder._id} to={`/${folder.slug}`}>
                <div className="flex justify-between bg-gray-600 p-1 px-3 pt-2 text-lg fontL rounded-md">
                  <div className="flex gap-2 items-center">
                    <i className="fal fa-folder"></i>
                    <span>{folder.title}</span>
                  </div>
                  <button
                    className="bg-[#ff4d4d] px-2 pt-1 mb-1 rounded-md hover:bg-[#c03636]"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFolder(folder.title, folder._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <>
          <div>No folders created</div>
          {/* <i className="fa-duotone fa-spinner-third fa-spin"></i> */}
          <i className="fal fa-folder-xmark text-4xl"></i>
        </>
      )}
      <ToastContainer
        autoClose={2000}
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  ) : (
    <div className="m-5 fontL flex flex-col items-center gap-2">
      <div className="text-xl text-white">You need to login first</div>
      <Link to={"/login"}>
        <button className="outline-none text-lg p-1 px-3 bg-[#6f2dba] text-white rounded-md">
          Login
        </button>
      </Link>
    </div>
  );
}
export default Home;

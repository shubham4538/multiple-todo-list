import React, { useState, useContext, useRef } from "react";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

function DeleteFolder({
  deleteFolderWindow,
  setDeleteFolderWindow,
  folderId,
  deleteFolderName,
}) {
  const [loading, setLoading] = useState(false);
  const [delButton, setDelButton] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputRef = useRef();
  const { user } = useContext(LoginContext);

  // Focus input
  useEffect(() => {
    if (deleteFolderWindow) {
      inputRef.current.focus();
    }
  }, [deleteFolderWindow]);

  // Name suggests
  const exitDeleteFolderWindow = () => {
    setDeleteFolderWindow(false);
    setDelButton(false);
    setLoading(false);
    setFolderName("");
  };

  // Allow Delete button
  const deleteButton = (e) => {
    setFolderName(e.target.value);
    if (e.target.value === deleteFolderName) {
      setDelButton(true);
    } else {
      setDelButton(false);
    }
  };

  // Delete form handler
  const deleteFolder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const result = await axios.delete(
        `http://localhost:3001/delete/folder/${folderId}`,
        config
      );
      toast.success(result.data.message);
      exitDeleteFolderWindow();
    } catch (err) {
      console.log(err);
      exitDeleteFolderWindow();
    }
  };

  return (
    <div
      className={`${
        deleteFolderWindow ? "back-visible" : "back-hidden"
      } flex items-center justify-center absolute bg-[#0000008c] h-screen w-screen backdrop-blur-[2px]`}
    >
      <div
        className={`${
          deleteFolderWindow ? "block-visible" : "block-hidden"
        } flex flex-col gap-4 items-center fontR text-white rounded-lg bg-gray-800 border border-gray-700 p-8`}
      >
        <span className="text-xl fontSB">Delete Folder ?</span>
        <form onSubmit={(e) => deleteFolder(e)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-white">
              Type '<span className="fontSB">{deleteFolderName}</span>' to
              delete folder
            </label>
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={(e) => deleteButton(e)}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-60 p-2 pb-1  outline-none caret-white fontR"
              required
            />
          </div>
          <div className="flex w-full justify-between mt-3">
            <button
              type="button"
              className="button bg-gray-700 hover:bg-gray-900 p-1 pt-2 px-3 text-base rounded-md active:scale-[0.95]"
              onClick={exitDeleteFolderWindow}
            >
              Cancel
            </button>
            {delButton ? (
              <button
                type="submit"
                className="button bg-red-700 hover:bg-red-800 p-1 pt-2 px-3 text-base rounded-md active:scale-[0.95]"
              >
                {loading ? (
                  <i className="fa-duotone fa-spinner-third fa-spin"></i>
                ) : (
                  "Delete"
                )}
              </button>
            ) : (
              <button className="bg-red-700 cursor-not-allowed p-1 pt-2 px-3 text-base rounded-md opacity-50">
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteFolder;

import React, { useState, useContext, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";

import "../styles/window.css";

function AddTaskWindow({ taskWindow, setTaskWindow, folderId }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const inputRef = useRef();
  const { user } = useContext(LoginContext);

  // not again
  const exitFolderWindow = () => {
    setTaskWindow(false);
    setLoading(false);
    setTask("");
    setIsCompleted(false);
  };

  // offcourse
  const AddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      task,
      isCompleted,
      folderId,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const result = await axios.post(
        "http://localhost:3001/account/addtodo",
        data,
        config
      );
      console.log(result);
      toast.success(result.data.message);
      exitFolderWindow();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  // input ref
  useEffect(() => {
    if (taskWindow) {
      inputRef.current.focus();
    }
  }, [taskWindow]);

  return (
    <div
      className={`${
        taskWindow ? "back-visible" : "back-hidden"
      } flex items-center justify-center absolute bg-[#0000008c] h-screen w-screen backdrop-blur-[2px]`}
    >
      <div
        className={`${
          taskWindow ? "block-visible" : "block-hidden"
        } flex flex-col gap-4 items-center fontR text-white rounded-lg bg-gray-800 border border-gray-700 p-8`}
      >
        <span className="text-xl fontSB">Add Todo</span>
        <form className="flex flex-col gap-4" onSubmit={(e) => AddTask(e)}>
          <div>
            <label htmlFor="username" className="block text-base text-white">
              Task
            </label>
            <input
              ref={inputRef}
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-60 p-2 pb-1  outline-none caret-white fontR"
              required
            />
          </div>
          <div>
            <div className="flex gap-2">
              <label className="block text-base text-white">Status</label>
              <input
                type="checkbox"
                className="w-[17px] mb-1"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            </div>
            <input
              type="text"
              value={isCompleted ? "Completed" : "Incomplete"}
              className="focus:shadow-[0px_0px_10px_-2px_#5c4d7c] bg-gray-700 border border-gray-600 text-white sm:text-md rounded-lg w-60 p-2 pb-1  outline-none caret-white fontR"
              readOnly
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
export default AddTaskWindow;

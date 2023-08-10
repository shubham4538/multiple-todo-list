import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function TodoItem({ item, folderId, deleteTodo, onClick }) {
  const [completed, setCompleted] = useState(item.completed);

  const changeStatus = async (status, id) => {
    setCompleted((prev) => !prev);
    try {
      const data = { status, id, folderId };
      const result = await axios.post(
        "https://multiple-todo-list.vercel.app/change/status",
        data
      );
      toast.success(result.data.message);
    } catch (err) {
      setCompleted((prev) => !prev);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between w-[calc(10px + 20vw)] bg-gray-600 p-1 px-3 pt-2 text-lg fontL rounded-md">
      <div className="flex gap-2 items-center">
        {completed ? (
          <i
            className="fas fa-square-check cursor-pointer"
            onClick={() => {
              onClick();
              changeStatus(!item.completed, item._id);
            }}
          ></i>
        ) : (
          <i
            className="far fa-square cursor-pointer"
            onClick={() => {
              onClick();
              changeStatus(!item.completed, item._id);
            }}
          ></i>
        )}
        <span>{item.task}</span>
      </div>
      <button
        className="bg-[#ff4d4d] px-2 pt-1 mb-1 rounded-md hover:bg-[#c03636]"
        onClick={(e) => {
          e.preventDefault();
          deleteTodo(item._id);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
export default TodoItem;

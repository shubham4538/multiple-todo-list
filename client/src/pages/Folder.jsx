import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { LoginContext } from "../context/LoginContext";
import TodoItem from "../components/TodoItem";

function Folder({ taskWindow, setTaskWindow, setFolderId, folderId }) {
  const [loading, setLoading] = useState(true);
  const [todoFolder, setTodoFolder] = useState([]);
  const [filteredTodoItems, setFilteredTodoItems] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [option, setOption] = useState("all");
  const { user } = useContext(LoginContext);
  const { folder } = useParams();
  const navigate = useNavigate();

  // Popup AddTodo window
  const AddTodo = () => {
    setTaskWindow(true);
  };

  // deleteing todo
  const deleteTodo = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const result = await axios.delete(
        `https://multiple-todo-list.vercel.app/delete/todo?todoId=${id}&folderId=${folderId}`,

        config
      );
      setTodoItems((prev) => prev.filter((todo) => todo._id !== id));
      toast.warning(result.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch todos already added
  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .get("https://multiple-todo-list.vercel.app/account/details", config)
        .then((result) => {
          const folders = result.data;
          const todoFolder = folders.filter((item) => item.slug == folder);
          setTodoFolder(todoFolder[0]);
          setTodoItems(todoFolder[0].todos);
          setFolderId(todoFolder[0]._id);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [taskWindow]);

  // Immediate filter todos when status changed
  const filterTodos = (item) => {
    const newTodoItems = [...todoItems];
    const againNewTodo = newTodoItems.map((todo) => {
      if (item._id == todo._id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodoItems(againNewTodo);
  };

  // Initial filter
  const filterItems = () => {
    if (option !== "all") {
      console.log(option);
      const optionFolder =
        option === "completed"
          ? todoItems.filter((todo) => todo.completed)
          : todoItems.filter((todo) => !todo.completed);
      setFilteredTodoItems(optionFolder);
    } else {
      setFilteredTodoItems(todoItems);
    }
  };

  // filter on change of todos status-wise
  useEffect(() => {
    filterItems();
  }, [option, todoItems]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div className="container gap-5">
      {/* w-[calc(100px+20vw)] max-w-[200px] bg-gray-600  */}
      <div className="text-2xl fontSB rounded-md">
        <div className="flex gap-2 items-center">
          <i className="fal fa-folder-open"></i>
          <span>{todoFolder.title}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[calc(130px+40vw)]">
        <div className="flex justify-between items-center">
          <form>
            <button
              type="button"
              className="bg-indigo-700 p-1 pt-2 px-3 text-base rounded-md"
              onClick={AddTodo}
            >
              Add new
            </button>
          </form>
          <div>
            <select
              className="bg-indigo-700 p-2.5 text-base rounded-md outline-none"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>
        {filteredTodoItems.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filteredTodoItems.map((item) => {
              return (
                <TodoItem
                  key={item._id}
                  item={item}
                  folderId={todoFolder._id}
                  onClick={() => filterTodos(item)}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div>No Todos</div>
            {/* <i className="fa-duotone fa-spinner-third fa-spin"></i> */}
            <i className="fal fa-folder-xmark text-4xl"></i>
          </div>
        )}
      </div>
      <ToastContainer
        autoClose={2000}
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default Folder;

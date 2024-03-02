import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddFolderWindow from "./components/AddFolderWindow.jsx";
import AddTaskWindow from "./components/AddTaskWindow.jsx";
import DeleteFolder from "./components/DeleteFolderWindow.jsx";
import Heading from "./components/Heading.jsx";
import Container from "./components/Container.jsx";
import Home from "./pages/Home.jsx";
import Folder from "./pages/Folder.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

import "./styles/index.css";

function App() {
  const [folderWindow, setFolderWindow] = useState(false);
  const [taskWindow, setTaskWindow] = useState(false);
  const [deleteFolderWindow, setDeleteFolderWindow] = useState(false);
  const [deleteFolderName, setDeleteFolderName] = useState("");
  const [folderId, setFolderId] = useState("");

  return (
    <Router>
      <AddFolderWindow
        folderWindow={folderWindow}
        setFolderWindow={setFolderWindow}
      />
      <AddTaskWindow
        taskWindow={taskWindow}
        setTaskWindow={setTaskWindow}
        folderId={folderId}
      />
      <DeleteFolder
        deleteFolderWindow={deleteFolderWindow}
        folderId={folderId}
        setDeleteFolderWindow={setDeleteFolderWindow}
        deleteFolderName={deleteFolderName}
      />
      <Container>
        {/* <Heading /> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Home
                folderWindow={folderWindow}
                deleteFolderWindow={deleteFolderWindow}
                setFolderId={setFolderId}
                setFolderWindow={setFolderWindow}
                setDeleteFolderWindow={setDeleteFolderWindow}
                setDeleteFolderName={setDeleteFolderName}
              />
            }
          />
          <Route
            path="/:folder"
            element={
              <Folder
                taskWindow={taskWindow}
                setTaskWindow={setTaskWindow}
                setFolderId={setFolderId}
                folderId={folderId}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

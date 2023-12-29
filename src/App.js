import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ChatSpace from "./components/ChatSpace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ChatSpace />} />
    </Routes>
  );
}

export default App;

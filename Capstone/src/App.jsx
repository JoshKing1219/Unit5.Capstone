import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AllTheories from "./components/AllTheories";
import SingleTheory from "./components/SingleTheory";
import "./App.css";
import { useEffect, useState } from "react";
import UserAccount from "./components/UserAccount";
import Reviews from "./components/Reviews";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storageToken = localStorage.getItem("token");
    if (storageToken) {
      setToken(storageToken);
    }

    let storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    }
  }, []);
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUserId={setUserId} />}
        />
        <Route path="/theories" element={<AllTheories />} />
        <Route path="/theory/:id" element={<SingleTheory token={token} />} />
        <Route
          path="/theory/:id/reviews"
          element={<Reviews token={token} userId={userId} />}
        />
        <Route path="/my-account" element={<UserAccount token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import LoginTable from "./components/LoginTable";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userType) => {
    setIsLoggedIn(true);
    if (userType === "admin") {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const PrivateRoute = ({ element: Element, adminOnly, ...rest }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
      return <Navigate to="/userpage" />;
    }

    return <Element {...rest} />;
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginTable handleLogin={handleLogin} />} />
          <PrivateRoute path="/" element={<Home />} />
          <PrivateRoute path="/incomes" element={<Incomes />} />
          <PrivateRoute path="/expenses" element={<Expenses />} />
          <PrivateRoute path="/categories" element={<Categories />} />
          <PrivateRoute path="/userpage" element={<UserPage />} />
          <PrivateRoute path="/adminpage" element={<AdminPage />} adminOnly />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
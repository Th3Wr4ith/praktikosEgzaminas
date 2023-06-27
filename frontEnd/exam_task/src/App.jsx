import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Mechanic from "./pages/Mechanic";
import CarShop from "./pages/CarShop";
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
  const handleUpdateIncomes = (updatedIncomes) => {
    setIncomes(updatedIncomes);
  };
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <div className="App">
          <Header />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mechanic" element={<Mechanic />} />
            <Route path="/carshop" element={<CarShop />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/userpage" element={<UserPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

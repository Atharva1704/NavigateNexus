import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/index";
import LoginPage from "./scenes/loginPage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import TravelList from "./scenes/TravelList/TravelList.jsx";
import ChatBox from "./scenes/ChatBox/ChatBox";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode] );
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element = {<LoginPage />} />
            <Route
              path = "/home"
              element = {isAuth ? <HomePage /> : <Navigate to = "/" />}
            />
            <Route
              path="/travel-list/:id"
              element={isAuth ? <TravelList /> : <Navigate to="/" />}
            />
            <Route
              path = "/chat-room"
              element = {isAuth ? <ChatBox /> : <Navigate to = "/" />}
            />
            {/* <Route
              path="/travel-list"
              element={isAuth ? <TravelList /> : <Navigate to="/" />}
            /> */}
            {/* <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
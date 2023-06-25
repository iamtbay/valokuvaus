import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Mainpage from "./pages/Mainpage";
import SinglePhoto from "./pages/SinglePhoto";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { checkUser } from "./redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import AddPhoto from "./pages/AddPhoto";
import ProtectedRoute from "./components/ProtectedRoute";
import UserComments from "./components/Userpage/Layouts/UserComments";
import UserLikes from "./components/Userpage/Layouts/UserLikes";
import UserPhotos from "./components/Userpage/Layouts/UserPhotos";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = {
    darkestColor: "#2C3333",
    darkTurquoise: "#2E4F4F",
    lightTurquoise: "#0E8388",
    darkTurquoiseOpacity: "rgba(46, 79, 79, 0.5)",
    lightTurquoiseOpacity: "rgba(14, 131, 136,0.5)",
    lightColor: "#CBE4DE",
  };
  //check user login or not for every refresh
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    //GET A TOAST ALERT VS
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <div className="pageContainer">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/user/:id" element={<UserPage />}>
              <Route index element={<UserPhotos />} />
              <Route path="likes" element={<UserLikes />} />
              <Route path="comments" element={<UserComments />} />{" "}
            </Route>
            <Route path="/photo/:id" element={<SinglePhoto />} />
            <Route
              path="/addphoto"
              element={
                <ProtectedRoute>
                  <AddPhoto />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>No page 404.</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

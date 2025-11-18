import { Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Announcement from "../pages/Announcement";
import Exams from "../pages/Exams";
import CreateRoom from "../pages/CreateRoom";

function AppRoutes() {
  const { isAdmin, authUser } = useUserStore();

  return (
    <Routes>
      <Route
        path="/signin"
        element={!authUser ? <Login /> : <Navigate to="/" />}
      />

      <Route path="/" element={<Layout />}>
        <Route
          index
          element={authUser ? <Home /> : <Navigate to="/signin" />}
        />

        <Route
          path="announcement"
          element={authUser ? <Announcement /> : <Navigate to="/signin" />}
        />

        <Route
          path="exams"
          element={authUser ? <Exams /> : <Navigate to="/signin" />}
        />

        {isAdmin && (
          <Route
            path="create-room"
            element={authUser ? <CreateRoom /> : <Navigate to="/signin" />}
          />
        )}
      </Route>
    </Routes>
  );
}
export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import Announcement from "../pages/Announcement";
import { useUserStore } from "../store/userStore";

function AppRoutes() {
  const { isAdmin } = useUserStore();
  console.log(isAdmin);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="announcement" element={<Announcement />} />
        {isAdmin && <Route path="create-room" element={<CreateRoom />} />}
      </Route>
    </Routes>
  );
}

export default AppRoutes;

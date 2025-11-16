import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import Announcement from "../pages/Announcement";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="announcement" element={<Announcement />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

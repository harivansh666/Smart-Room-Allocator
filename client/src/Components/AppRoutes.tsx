import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "../layout/Layout";
import CreateRoom from "./CreateRoom";
import Announcement from "./Announcement";
import Teacherscontact from "./Teacherscontact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="teachers-contact" element={<Teacherscontact />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

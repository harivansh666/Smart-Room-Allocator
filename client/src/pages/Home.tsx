import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Home() {
  const { checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();

  }, [checkAuth]);
  return (
    <div>
      <h1 className="font-medium text-2xl">Dashboard</h1>Home
    </div>
  );
}

export default Home;

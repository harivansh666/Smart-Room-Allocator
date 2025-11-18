import { useEffect } from "react";
import RoutesTs from "./Components/AppRoutes";
import { useUserStore } from "./store/userStore";
import { useNavigate } from "react-router-dom";

function App() {
  const { checkAuth, authUser } = useUserStore();
  const navigator = useNavigate();
  useEffect(() => {
    checkAuth();
    if (authUser === null) navigator("/signin");
  }, [checkAuth]);
  return <RoutesTs />;
}

export default App;

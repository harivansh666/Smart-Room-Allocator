import { useEffect } from "react";
import RoutesTs from "./Components/AppRoutes";
import { useUserStore } from "./store/userStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, warmUp } = useUserStore();

  useEffect(() => {
    checkAuth();
    warmUp();
  }, [checkAuth, warmUp]);

  return (
    <>
      <RoutesTs />
      <Toaster />
    </>
  );
}

export default App;

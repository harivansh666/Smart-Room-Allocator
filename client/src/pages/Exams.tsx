import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

function Exams() {
  const date = new Date();
  const { checkAuth } = useUserStore();

  const TodaysDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">Today Exams:{TodaysDate}</h1>
    </div>
  );
}

export default Exams;

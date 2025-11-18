import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

function Home() {
  const { checkAuth, authUser } = useUserStore();

  useEffect(() => {
    checkAuth();
    console.log(authUser);
  }, [checkAuth]);

  // Safety check in case authUser not yet loaded
  const noOfExams = authUser?.roomsAllocated?.length || 0;

  return (
    <div className="p-6">
      <h1 className="font-medium text-2xl">
        Dashboard{" "}
        <span className="text-blue-600 font-extralight text-lg">
          {authUser?.name?.toUpperCase()}
        </span>
      </h1>

      <h1 className="mt-4 text-lg">
        No Of Exams You Have: <span className="font-semibold">{noOfExams}</span>
      </h1>
    </div>
  );
}

export default Home;

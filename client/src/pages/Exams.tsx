import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import GenerateRoomStructure from "../Components/GenerateRoomStructure";

function Exams() {
  const date = new Date();
  const { checkAuth, authUser } = useUserStore();
  console.log("authUser:-", authUser.roomsAllocated);
  const TodaysDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">Today Exams:{TodaysDate}</h1>
      <h2 className="pt-2">Exam Date: 12/12/2026</h2>
      <GenerateRoomStructure
        students={authUser.roomsAllocated[0].noOfStudents}
      />
    </div>
  );
}

export default Exams;

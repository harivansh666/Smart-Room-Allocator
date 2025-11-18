import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import GenerateRoomStructure from "../Components/GenerateRoomStructure";

function Exams() {
  const date = new Date();
  const { checkAuth, authUser } = useUserStore();
  const TodaysDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  useEffect(() => {
    checkAuth();
  }, []);

  if (!authUser || !authUser.roomsAllocated.length) {
    return <p className="p-4">No exams allocated yet.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium">Today Exams: {TodaysDate}</h1>

      {authUser.roomsAllocated.map((room) => (
        <div key={room.roomId} className="mt-4  p-4 rounded-lg shadow">
          <h2 className="text-lg">Exam: {room.exam}</h2>
          <p>
            Number of Students:{" "}
            <span className="text-rose-500 text-lg font-medium">
              {room.noOfStudents}
            </span>
          </p>

          {/* Pass to your existing component */}
          <GenerateRoomStructure students={room.noOfStudents} />
        </div>
      ))}
    </div>
  );
}

export default Exams;

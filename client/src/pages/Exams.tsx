import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import GenerateRoomStructure from "../Components/GenerateRoomStructure";

// Define types for your data
interface Room {
  roomId: string;
  exam: string;
  noOfStudents: number;
  roomCapacity: number;
}

interface AuthUser {
  roomsAllocated: Room[];
}

function Exams() {
  const date = new Date();
  const { checkAuth, authUser } = useUserStore() as {
    checkAuth: () => void;
    authUser: AuthUser | null;
  };

  const TodaysDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authUser || !authUser.roomsAllocated.length) {
    return <p className="p-4">No exams allocated yet.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium">Today Exams: {TodaysDate}</h1>

      {authUser.roomsAllocated.map((room) => (
        <div
          key={room.roomId}
          className="mt-4 p-4 rounded-lg shadow overflow-scroll"
        >
          <h2 className="text-lg">
            Exam: {room.exam.charAt(0).toUpperCase() + room.exam.slice(1)}
          </h2>
          <p>
            Number of Students:{" "}
            <span className="text-rose-500 text-lg font-medium">
              {room.noOfStudents}
            </span>
          </p>

          <GenerateRoomStructure
            students={room.noOfStudents}
            roomCapacity={room.roomCapacity}
          />
        </div>
      ))}
    </div>
  );
}

export default Exams;

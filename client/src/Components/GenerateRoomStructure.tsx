import React from "react";

interface GenerateRoomStructureProps {
  students: number; // ya array of students, jaise form se pass ho raha hai
  roomCapacity?: number;
  teachers?: number;
}

const GenerateRoomStructure = React.memo(function GenerateRoomStructure({
  students,
  roomCapacity,
  teachers,
}: GenerateRoomStructureProps) {
  const arr = Array.from({ length: students }); // 20 seats
  const totalSeats = roomCapacity || students;
  const available = roomCapacity ?? students;
  const occupiedSeats = students;
  return (
    <div className="w-full h-screen rounded-lg mt-2">
      <h1 className="text-2xl font-bold mb-4 flex justify-center p-4">
        Sitting Arrangement in Room
      </h1>
      <div className="w-90  flex flex-col items-center  bg-gray-200 rounded-lg p-8">
        <div>
          <div className=" flex justify-center  items-center h-9 p-2 bg-green-600 text-white font-mono rounded-md mb-2">
            Teacher Id: {!teachers ? "Assign Teacher" : teachers}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {arr.map((_, index) => (
            <div
              key={index}
              className="w-7 h-7 rounded-sm flex justify-center items-center text-white bg-blue-600"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 rounded-lg p-3">
          <div className="text-blue-800 font-semibold">Total Seats In Room</div>
          <div className="text-xl font-bold text-blue-900">{totalSeats}</div>
        </div>
        <div className="bg-green-100 rounded-lg p-3">
          <div className="text-green-800 font-semibold">Available</div>
          <div className="text-xl font-bold text-green-900">{available}</div>
        </div>
        <div className="bg-red-100 rounded-lg p-3">
          <div className="text-red-800 font-semibold">Occupied</div>
          <div className="text-xl font-bold text-red-900">{occupiedSeats}</div>
        </div>
      </div>
    </div>
  );
});

export default GenerateRoomStructure;

import { useEffect, memo } from "react";
import { useUserStore } from "../store/userStore";

const Home = memo(function Home() {
  const { checkAuth, authUser } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Safety check in case authUser not yet loaded
  const noOfExams = authUser?.roomsAllocated?.length || 0;
  const userName = authUser?.name || "User";

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
          Welcome back, <span className="text-g">{userName.toUpperCase()}</span>
        </h1>
        <p className="font-medium text-sm">Here's your exam overview</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Exam Card - Purple Theme */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Exams</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">
                {noOfExams}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {noOfExams === 0
              ? "No exams scheduled yet"
              : noOfExams === 1
              ? "You have 1 exam coming up"
              : `You have ${noOfExams} exams scheduled`}
          </p>
        </div>

        {/* Upcoming Exams Card - Green Theme */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Upcoming</h3>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">
                {noOfExams > 0 ? noOfExams : 0}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {noOfExams === 0 ? "No upcoming exams" : "Exams waiting for you"}
          </p>
        </div>

        {/* Status Card - Orange Theme */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Status</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-2xl">✓</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {authUser ? "All systems operational" : "Loading..."}
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      {noOfExams > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Exams</h2>
          <div className="space-y-3">
            {authUser?.roomsAllocated?.map((room: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Room {room.roomNumber}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {room.examName || "Exam"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index % 3 === 0
                      ? "bg-purple-100 text-purple-600"
                      : index % 3 === 1
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  Scheduled
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Welcome Message for New Users */}
      {noOfExams === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Exams Yet</h3>
          <p className="text-gray-600 mb-4">
            You don't have any exams scheduled at the moment. Check back later
            or contact your administrator.
          </p>
        </div>
      )}
    </div>
  );
});

export default Home;

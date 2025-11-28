import { useEffect, useState } from "react";
import GenerateRoomStructure from "../Components/GenerateRoomStructure";
import { useUserStore } from "../store/userStore";

interface CreateRoomForm {
  exam: string;
  noOfStudents: number;
  examDate: string;
  roomCapacity: number;
  allocatedTeacherId?: number;
}

const CreateRoom = () => {
  const { createRoom, getTeachers, dbTeachers } = useUserStore();

  const [form, setForm] = useState<CreateRoomForm>({
    exam: "",
    noOfStudents: 0,
    roomCapacity: 0,
    examDate: "",
    allocatedTeacherId: undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getTeachers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "exam" || name === "examDate"
          ? value
          : value === ""
          ? 0
          : Number(value),
    }));
  };

  const handleTeacherSelect = (teacherId: number) => {
    setForm((prev) => ({
      ...prev,
      allocatedTeacherId: teacherId,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(form);
    if (
      !form.exam.trim() ||
      form.noOfStudents <= 0 ||
      form.roomCapacity <= 0 ||
      !form.examDate
    ) {
      setError("Please fill all required fields correctly.");
      return;
    }

    if (form.noOfStudents > form.roomCapacity) {
      setError("Number of students cannot exceed room capacity.");
      return;
    }

    // Validate that exam date is not in the past
    const selectedDate = new Date(form.examDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison

    if (selectedDate < today) {
      setError("Exam date cannot be in the past.");
      return;
    }

    setLoading(true);

    try {
      createRoom(form);
      setSuccess("Room created successfully!");
      setForm({
        exam: "",
        noOfStudents: 0,
        roomCapacity: 0,
        examDate: "",
        allocatedTeacherId: undefined,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const selectedTeacher = dbTeachers.find(
    (teacher) => teacher.userId === form.allocatedTeacherId
  );

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="max-w-4xl px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Create Room</h1>
          <p className="text-gray-600 mt-2">
            Set up examination room details and allocation
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <svg
                  className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-3 text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <svg
                  className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-3 text-green-700 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="exam"
                    value={form.exam}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter exam name"
                    required
                  />
                </div>

                {/* Exam Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="examDate"
                    value={form.examDate}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Number of Students */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Students <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="noOfStudents"
                    value={form.noOfStudents || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min={1}
                    required
                  />
                </div>

                {/* Room Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="roomCapacity"
                    value={form.roomCapacity || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min={1}
                    required
                  />
                </div>

                {/* Teacher Selection Dropdown */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allocated Teacher{" "}
                    <span className="text-gray-500 font-normal">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    {/* Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between bg-white hover:bg-gray-50"
                    >
                      <span
                        className={
                          selectedTeacher ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {selectedTeacher
                          ? `${selectedTeacher.name} (ID: ${selectedTeacher.userId})`
                          : "Select a teacher"}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        <div className="p-2">
                          {/* Teacher List */}
                          <div className="space-y-1">
                            {dbTeachers.map((teacher) => (
                              <button
                                key={teacher.userId}
                                type="button"
                                onClick={() =>
                                  handleTeacherSelect(teacher.userId)
                                }
                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                  form.allocatedTeacherId === teacher.userId
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                              >
                                <div className="font-medium">
                                  {teacher.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {teacher.userId}
                                </div>
                              </button>
                            ))}

                            {dbTeachers.length === 0 && (
                              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                No teachers available
                              </div>
                            )}
                          </div>

                          {/* Clear Selection */}
                          {selectedTeacher && (
                            <button
                              type="button"
                              onClick={() => handleTeacherSelect(undefined!)}
                              className="w-full mt-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md border border-red-200 transition-colors"
                            >
                              Clear Selection
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                }`}
              >
                {loading ? "Creating Room..." : "Create Room"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <GenerateRoomStructure
        students={form.noOfStudents}
        teachers={form.allocatedTeacherId}
      />
    </div>
  );
};

export default CreateRoom;

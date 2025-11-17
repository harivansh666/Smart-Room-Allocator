import { useState } from "react";
import GenerateRoomStructure from "../Components/GenerateRoomStructure";
import { useUserStore } from "../store/userStore";
interface CreateRoomForm {
  exam: string;
  noOfStudents: number;
  roomCapacity: number;
  allocatedTeacherId?: number;
}

const CreateRoom = () => {
  const [form, setForm] = useState<CreateRoomForm>({
    exam: "",
    noOfStudents: 0,
    roomCapacity: 0,
    allocatedTeacherId: undefined,
  });

  const { createRoom } = useUserStore();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "exam" ? value : value === "" ? 0 : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log("BASE_URL => ", import.meta.env.VITE_BASE_URL);

    if (!form.exam.trim() || form.noOfStudents <= 0 || form.roomCapacity <= 0) {
      setError("Please fill all required fields correctly.");
      return;
    }

    if (form.noOfStudents > form.roomCapacity) {
      setError("Number of students cannot exceed room capacity.");
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
        allocatedTeacherId: undefined,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="max-w-4xl  px-2 sm:px-6 lg:px-8">
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

                {/* Teacher ID */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allocated Teacher ID{" "}
                    <span className="text-gray-500 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="allocatedTeacherId"
                    value={form.allocatedTeacherId ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter teacher ID"
                    min={1}
                  />
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
      <GenerateRoomStructure students={form.noOfStudents} />
    </div>
  );
};

export default CreateRoom;

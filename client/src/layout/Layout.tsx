import {
  Home,
  PanelRight,
  PlusCircle,
  Megaphone,
  Phone,
  LogOut,
  ClockFading,
  File,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

function Layout() {
  const [isOpenSidebar, setSidebar] = useState<boolean>(true);
  const navigate = useNavigate();

  const { isAdmin } = useUserStore();
  console.log(isAdmin);
  const handleLogout = () => {
    // Your logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create-room", icon: PlusCircle, label: "Create Room" },
    { path: "/exams", icon: File, label: "Exams" },
    { path: "/announcement", icon: Megaphone, label: "Announcement" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex w-full h-16 justify-between bg-blue-600 px-4 text-white items-center shadow-md">
        <div className="flex items-center">
          <PanelRight
            className="cursor-pointer hover:bg-blue-700 rounded p-1 text-2xl size-8 transition-colors md:size-7"
            onClick={() => setSidebar(!isOpenSidebar)}
          />
          <span className="ml-3 font-bold text-lg md:text-xl">
            Class Allocator
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-20 h-9 md:w-24 md:h-10 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors text-sm md:text-base"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isOpenSidebar && (
          <>
            <div className="w-62 h-full bg-blue-600 fixed md:relative z-30 transition-all duration-300 shadow-lg">
              <ul className="flex flex-col text-white font-medium gap-1 p-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  if (item.path === "/create-room" && !isAdmin) return;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200 group"
                        onClick={() =>
                          window.innerWidth < 768 && setSidebar(false)
                        }
                      >
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                        <span className="ml-3 text-base md:text-lg font-normal group-hover:font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile close hint */}
              <div className="md:hidden text-white text-xs text-center mt-8 opacity-70">
                <p>Tap outside to close</p>
              </div>
            </div>

            {/* Overlay for mobile */}
            <div
              className="fixed inset-0 blur bg-opacity-50 z-20 md:hidden"
              onClick={() => setSidebar(false)}
            />
          </>
        )}

        {/* Main Content with Outlet */}
        <main
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 ${
            isOpenSidebar ? "md:ml-0" : ""
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;

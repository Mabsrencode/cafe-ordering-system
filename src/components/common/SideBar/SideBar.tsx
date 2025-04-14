import { useState } from "react";
import { CgMenuBoxed } from "react-icons/cg";
import { LuLogs } from "react-icons/lu";
import { MdOutlinePendingActions, MdSpaceDashboard } from "react-icons/md";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
const navigationItems = [
  {
    link: "/",
    name: "Dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    link: "/menu",
    name: "Menu",
    icon: <CgMenuBoxed />,
  },
  {
    link: "/logs",
    name: "Logs",
    icon: <LuLogs />,
  },
  {
    link: "/orders",
    name: "Orders",
    icon: <MdOutlinePendingActions />,
  },
];
const SideBar = () => {
  const { pathname } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  return (
    <aside
      className={`sticky z-[1000] top-0 py-6 transition-all  text-white h-screen flex flex-col justify-between items-center ${
        isSideBarOpen ? "w-[150px]" : "w-[60px]"
      } border-r border-black/10 shadow`}
    >
      <div className="flex flex-col items-center">
        <Link to={"/"} className="flex items-center gap-4">
          <div>
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
            </span>
          </div>
          {isSideBarOpen && (
            <h1 className="text-white font-bold manrope">
              MC Uptime<span className="text-green-500">.</span>
            </h1>
          )}
        </Link>
        <nav className="mt-12">
          <ul className="grid gap-2 px-2 text-xl transition-all">
            {navigationItems.map((navItem) => (
              <li key={navItem.link}>
                <Link
                  className={`flex items-center gap-2 transition-all p-[14px] hover:bg-green-950/90 hover:text-green-200 rounded text-green-200 ${
                    pathname === navItem.link ? "bg-green-950/90" : "text-black"
                  }`}
                  title={navItem.name}
                  to={navItem.link}
                >
                  {navItem.icon}
                  <span
                    className={`text-sm text-nowrap text-white ${
                      isSideBarOpen ? "block" : "hidden"
                    }`}
                  >
                    {navItem.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        {/* <div className="relative w-full">
          {data && data.user?.email ? (
            <div className="relative">
              <div
                onClick={() => setOpenProfileContainer(!openProfileContainer)}
                className="flex justify-center items-center bg-green-700 text-3xl rounded-full h-11 w-11 hover:bg-green-600 cursor-pointer transition-all"
              >
                <h3> {data.user.email.split("")[0].toUpperCase()}</h3>
              </div>
            </div>
          ) : (
            <div className="rounded-full h-11 w-11 bg-gray-400 animate-pulse"></div>
          )}
        </div> */}
        {/* {openProfileContainer && data && data.user?.email && (
          <div className="absolute bg-white rounded-lg bottom-6 left-14 w-[300px]">
            <div className="relative p-3">
              <h3 className="text-sm text-black w-[230px] font-bold text-ellipsis overflow-hidden">
                {data.user.email}
              </h3>
              <IoIosClose
                onClick={() => setOpenProfileContainer(false)}
                className="absolute top-1 right-1 text-black text-3xl hover:bg-slate-600/20 rounded-full cursor-pointer"
              />
              <ul className="text-black text-base my-2">
                <li>
                  <Link
                    className="py-1 hover:font-bold block border-t"
                    to={"account-details"}
                  >
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-1 hover:font-bold block border-t"
                    to={"notifications"}
                  >
                    Notifications & reports
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-1 hover:font-bold block border-t border-b"
                    to={"security"}
                  >
                    Security
                  </Link>
                </li>
              </ul>
              <div className="w-full mt-4">
                <button
                  onClick={handleLogOut}
                  className="text-sm mx-auto block px-12 py-2 bg-green-700 hover:bg-green-700/70 rounded cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )} */}
        <div className="mt-12">
          {!isSideBarOpen ? (
            <TbLayoutSidebarLeftExpandFilled
              className="cursor-pointer text-2xl mx-auto"
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            />
          ) : (
            <TbLayoutSidebarRightExpandFilled
              className="cursor-pointer text-2xl mx-auto"
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

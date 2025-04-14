import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/common/SideBar/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const Layout = () => {
  const publicRoutes = ["/auth/login", "/auth/register"];
  const { pathname } = useLocation();
  const isPublicRoute = publicRoutes.includes(pathname);
  return (
    <main className="min-h-screen bg-white">
      <div className={`${!isPublicRoute && "flex"} h-full`}>
        {!isPublicRoute && <SideBar />}
        <div className="p-4">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
    </main>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="relative max-w-[2600px] mx-auto min-h-screen">


      <div className=" bg-background">
        <main className="overflow-y-auto">
          <Outlet />
        </main>


      </div>
    </div>
  );
}

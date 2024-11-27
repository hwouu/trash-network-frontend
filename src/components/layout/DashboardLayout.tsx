import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background flex flex-col">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        {/* 모바일용 오버레이 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 반응형 Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-64 
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:transform-none
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="h-full">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* 활성화 */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
          <Footer />
        </div>

        {/* 주석 처리 */}
        {/* 
<div className="flex-1 w-full lg:w-auto">
  <main className="flex-1 p-4 lg:p-8">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </main>
  <Footer />
</div>
*/}
      </div>
    </div>
  );
};

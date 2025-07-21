"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "@/components/shared/PageLoader";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

export default function PrivateLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // loader delay
    return () => clearTimeout(timer);
  }, [pathname]); // triggers loader on every route change

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        {isLoading ? (
          <PageLoader />
        ) : (
          <main className="p-4">{children}</main>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import PageLoader from "@/components/shared/PageLoader";
// import Sidebar from "@/components/layouts/Sidebar";
// import Header from "@/components/layouts/Header";

// export default function PrivateLayout({ children }) {
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => setIsLoading(false), 1000); // loader delay
//     return () => clearTimeout(timer);
//   }, [pathname]); // triggers loader on every route change

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <Header />
//         {isLoading ? (
//           <PageLoader />
//         ) : (
//           <main className="p-4">{children}</main>
//         )}
//       </div>
//     </div>
//   );
// }
import "../../app/globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import  Providers  from "@/store/provider";

export default function RootLayout({ children }) {
  return (
     <Providers>

   <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 m-2 rounded-md  pt-0  bg-muted/50 px-2">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          {children}
      
        </div>
      </SidebarInset>
    </SidebarProvider>
     </Providers>
  );
}

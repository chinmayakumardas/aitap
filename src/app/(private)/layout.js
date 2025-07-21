// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import PageLoader from "@/components/shared/PageLoader";

// export default function PrivateLayout({ children }) {
//   const pathname = usePathname(); // detect route changes
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500); // smoother transition

//     return () => clearTimeout(timer);
//   }, [pathname]); // re-run on every route change

//   return (
//     <div className="min-h-screen w-full ">
//       {isLoading ? <PageLoader /> : children}
//     </div>
//   );
// }
// app/(protected)/layout.jsx
import PrivateLayout from "@/components/layouts/PrivateLayout";

export default function ProtectedLayout({ children }) {
  return <PrivateLayout>{children}</PrivateLayout>;
}

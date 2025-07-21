// "use client";

// import React, { useEffect, useState } from "react";

// export default function PageLoader({
//   children,
//   delay = 1500,
//   loader = <DefaultSpinner />,
// }) {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   if (isLoading) return loader;

//   return <>{children}</>;
// }

// // ✅ Default Spinner — Blue on Full White Background
// const DefaultSpinner = () => (
//   <div className="min-h-screen w-full flex items-center justify-center bg-white">
//     <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//   </div>
// );
"use client";

import React, { useEffect, useState } from "react";

export default function PageLoader({
  delay = 1000,
  loader = <DefaultSpinner />,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading ? loader : null;
}

const DefaultSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh] bg-white">
    <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

'use client';
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-center px-6">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Back to Home
        </span>
      </Link>
    </div>
  );
}

'use client';
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-center px-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We encountered an unexpected error. Please try refreshing or go back to the homepage.
      </p>
      <Link href="/">
        <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go Home
        </span>
      </Link>
    </div>
  );
}

'use client'; // 👈 Required to use useParams()

import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Blog Slug: {slug}</h1>
      <p>This is the dynamic blog page for: {slug}</p>
    </div>
  );
}

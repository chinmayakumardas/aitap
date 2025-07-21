'use client';
import React from 'react';
import { Skeleton } from 'antd';

const UniversalSkeleton = ({
  type = 'default', // 'table', 'card', 'profile', 'image'
  rows = 5,
  count = 3,
  loading = true,
}) => {
  if (!loading) return null;

  switch (type) {
    case 'table':
      return (
        <div className="space-y-2">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton.Input
              key={i}
              style={{ width: '100%', height: 40 }}
              active
            />
          ))}
        </div>
      );

    case 'card':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-4 border rounded shadow">
              <Skeleton.Image style={{ width: '100%', height: 180 }} active />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ))}
        </div>
      );

    case 'profile':
      return (
        <div className="flex items-center space-x-4">
          <Skeleton.Avatar active size="large" shape="circle" />
          <Skeleton active title={false} paragraph={{ rows: 2 }} />
        </div>
      );

    case 'image':
      return (
        <div className="w-full">
          <Skeleton.Image style={{ width: '100%', height: 250 }} active />
        </div>
      );

    default:
      return <Skeleton active paragraph={{ rows: rows }} />;
  }
};

export default UniversalSkeleton;

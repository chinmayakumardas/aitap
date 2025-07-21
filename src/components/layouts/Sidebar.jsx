"use client";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-[240px] min-h-screen bg-white shadow hidden md:block">
      <div className="p-4 font-bold text-blue-600 text-lg border-b">
        MyApp
      </div>
      <Menu mode="inline" className="border-none">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link href="/users">Users</Link>
        </Menu.Item>
      </Menu>
    </aside>
  );
}

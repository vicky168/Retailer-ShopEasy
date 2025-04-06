"use client";

import { NavBar } from '../components/nav-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
} 
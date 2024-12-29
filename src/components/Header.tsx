"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "홈", href: "/" },
    { name: "Oracle", href: "/oracle" },
    { name: "MySQL", href: "/mysql" },
  ];

  return (
    <nav className="navbar bg-gray-800 text-white p-4">
      <div className="navbar-container flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="navbar-logo text-xl font-bold">Database Schema Validator/Converter</h1>

        {/* 햄버거 메뉴 버튼 (모바일 화면에서만 보이도록) */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* 네비게이션 메뉴 */}
        <ul
          className={`navbar-menu flex space-x-4 lg:flex ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`navbar-item ${
                  pathname === item.href ? "text-gray-300" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

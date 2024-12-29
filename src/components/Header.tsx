'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { name: '홈', href: '/' },
    { name: '오라클', href: '/oracle' },
    { name: 'MySQL', href: '/mysql' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Database Schema Validator/Converter</h1>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`navbar-item ${
                  pathname === item.href ? 'active' : ''
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

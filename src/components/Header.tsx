'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";  // cn 함수로 className 조합

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { name: '홈', href: '/' },
    { name: '오라클', href: '/oracle' },
    { name: 'MySQL', href: '/mysql' },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="navbar-container">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="navbar-logo">Database Schema Validator/Converter</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "navbar-item p-4 text-lg font-medium transition-all hover:bg-muted/50 rounded-md", 
                      pathname === item.href ? 'bg-muted text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

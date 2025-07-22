"use client";

import Image from "next/image";
import { UserButton } from "@/features/auth/components/user-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Learning Companions", href: "/learning-companions" },
    { label: "My Journey", href: "/my-journey" },
  ];

  return (
    <nav className="flex items-center justify-between p-2 bg-gray-50">
      <div className="flex items-center pl-16">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mr-4 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center pr-16 space-x-4">
        {/* Navigation Buttons */}
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="text-sm font-medium"
            >
              {item.label}
            </Button>
          </Link>
        ))}
        <UserButton />
      </div>
    </nav>
  );
};
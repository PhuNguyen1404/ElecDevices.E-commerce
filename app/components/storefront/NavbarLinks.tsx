"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarlinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Phone",
    href: "/products/phone",
  },
  {
    id: 3,
    name: "Laptop",
    href: "/products/laptop",
  },
  {
    id: 4,
    name: "Tablet",
    href: "/products/tablet",
  },
];

export function NavbarLink() {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center gap-x-2 ml-8">
      {navbarlinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-100",
            "group p-2 font-semibold rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

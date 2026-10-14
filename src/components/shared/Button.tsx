import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  external?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </>
  );
  const classes = `button button-${variant} ${className}`;
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

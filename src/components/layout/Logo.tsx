import Link from "next/link";
import { businessInfo } from "@/data/business";
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label={`${businessInfo.name} home`}
    >
      {businessInfo.name}
      <span className="logo-period">.</span>
    </Link>
  );
}

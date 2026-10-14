"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { whatsappHref } from "@/lib/whatsapp";
import Logo from "./Logo";
import WhatsAppIcon from "../shared/WhatsAppIcon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace(/\/$/, ""));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 960px)");
    const onResize = () => {
      if (media.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", onResize);
    };
  }, [menuOpen]);
  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }
  function closeMenu() {
    dialogRef.current?.close();
  }
  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappHref()}
            className="button button-primary header-quote"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a Quote <ArrowUpRight size={17} />
          </a>
          <button
            ref={triggerRef}
            className="menu-trigger icon-button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={openMenu}
          >
            <Menu size={25} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => {
          setMenuOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-heading">
            <Logo />
            <button
              className="icon-button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className="menu-number">0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={22} />
              </Link>
            ))}
          </nav>
          <a
            className="button button-primary"
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <WhatsAppIcon width={19} height={19} />
            Get a Quote on WhatsApp
          </a>
          <p>Good ideas. Beautifully printed.</p>
        </div>
      </dialog>
    </>
  );
}

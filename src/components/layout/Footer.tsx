import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { businessInfo, emailHref, phoneHref } from "@/data/business";
import { navigation } from "@/data/navigation";
import { whatsappHref } from "@/lib/whatsapp";
import Logo from "./Logo";
import WhatsAppIcon from "../shared/WhatsAppIcon";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>
            Thoughtful printing for your business, your big moments and
            everything in between.
          </p>
          <div className="cmyk-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <h3>Explore</h3>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label}
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-contact">
          <h3>Let’s talk print</h3>
          <a href={phoneHref}>
            <Phone size={15} />
            {businessInfo.phoneDisplay}
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={15} height={15} />
            WhatsApp us <ArrowUpRight size={13} />
          </a>
          <a href={emailHref}>
            <Mail size={15} />
            {businessInfo.email}
          </a>
          <p>
            <MapPin size={16} />
            {businessInfo.address}
          </p>
          <span>
            {businessInfo.hours.days}
            <br />
            {businessInfo.hours.time}
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Digital Printing. All Rights Reserved.
        </p>
        <span>Made with care. Printed with purpose.</span>
      </div>
    </footer>
  );
}

import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { businessInfo, emailHref, phoneHref } from "@/data/business";
export default function ContactPreview() {
  return (
    <section className="contact-preview container">
      <div>
        <span className="eyebrow">LET’S START WITH A CONVERSATION</span>
        <h2>Have a question about print?</h2>
        <p>We’re here to help you figure out the details.</p>
      </div>
      <div>
        <a href={emailHref}>
          <Mail size={21} />
          <span>
            <small>Drop us a line</small>
            {businessInfo.email}
          </span>
          <ArrowUpRight size={18} />
        </a>
        <a href={phoneHref}>
          <Phone size={21} />
          <span>
            <small>Give us a call</small>
            {businessInfo.phoneDisplay}
          </span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

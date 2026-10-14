import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { businessInfo, emailHref, phoneHref } from "@/data/business";
import { whatsappHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/metadata";
import PageIntro from "@/components/shared/PageIntro";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import Button from "@/components/shared/Button";
export const metadata = pageMetadata(
  "Contact Us",
  "Contact Digital Printing to discuss your printing requirements, artwork, quantities, finishing options and project timelines.",
  "/contact/",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S TALK PRINT"
        title={
          <>
            Great prints start
            <br />
            <span>with a conversation.</span>
          </>
        }
        description="Have an idea, a question or a print-ready design? Get in touch and we’ll help you figure out the next step."
        breadcrumb="Contact"
      />
      <section className="container contact-layout">
        <div className="contact-cards">
          <article className="contact-card" id="phone">
            <span className="contact-icon">
              <Phone size={23} />
            </span>
            <span className="eyebrow">GIVE US A CALL</span>
            <h2>{businessInfo.phoneDisplay}</h2>
            <p>Talk through your printing requirements.</p>
            {businessInfo.phone ? (
              <a href={phoneHref}>
                Call Now <ArrowUpRight size={17} />
              </a>
            ) : (
              <span className="contact-pending">Phone details to follow</span>
            )}
          </article>
          <article className="contact-card whatsapp-card">
            <span className="contact-icon">
              <WhatsAppIcon width={24} height={24} />
            </span>
            <span className="eyebrow">SEND US A MESSAGE</span>
            <h2>Let’s chat on WhatsApp</h2>
            <p>Share your idea, artwork or printing questions.</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              Open WhatsApp <ArrowUpRight size={17} />
            </a>
          </article>
          <article className="contact-card">
            <span className="contact-icon">
              <Mail size={23} />
            </span>
            <span className="eyebrow">DROP US A LINE</span>
            <h2 className="contact-email">{businessInfo.email}</h2>
            <p>Tell us a little about your project.</p>
            <a href={emailHref}>
              Send Email <ArrowUpRight size={17} />
            </a>
          </article>
          <article className="contact-card" id="address">
            <span className="contact-icon">
              <MapPin size={23} />
            </span>
            <span className="eyebrow">FIND US</span>
            <h2>{businessInfo.address}</h2>
            <p>Contact us before visiting to discuss your order.</p>
            {businessInfo.directionsUrl ? (
              <a
                href={businessInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <ArrowUpRight size={17} />
              </a>
            ) : (
              <span className="contact-pending">Visit details to follow</span>
            )}
          </article>
        </div>
        <aside className="contact-aside">
          <Clock3 size={27} strokeWidth={1.5} />
          <span className="eyebrow">WHEN TO REACH US</span>
          <h2>Business hours</h2>
          <div className="hours">
            <span>{businessInfo.hours.days}</span>
            <strong>{businessInfo.hours.time}</strong>
            <span>{businessInfo.hours.closed}</span>
          </div>
          <div className="contact-guide">
            <h3>A little detail goes a long way.</h3>
            <p>For a helpful quote, let us know:</p>
            <ul>
              <li>The item you want to print</li>
              <li>Approximate size and quantity</li>
              <li>Your artwork or design idea</li>
              <li>Any finish you have in mind</li>
              <li>When you need your order</li>
            </ul>
          </div>
          <Button href={whatsappHref()} external>
            Start a conversation
          </Button>
        </aside>
      </section>
      <section className="container contact-closing">
        <span className="eyebrow">NO IDEA IS TOO EARLY</span>
        <h2>Still working out the details?</h2>
        <p>
          You don’t need to have it all figured out. Share what you have in mind
          and we’ll help you explore your printing options.
        </p>
        <Button href="/services/" variant="secondary">
          Explore our services
        </Button>
      </section>
    </>
  );
}

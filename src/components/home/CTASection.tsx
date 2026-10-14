import { Phone } from "lucide-react";
import { phoneHref } from "@/data/business";
import { whatsappHref } from "@/lib/whatsapp";
import Button from "../shared/Button";
import Reveal from "../shared/Reveal";
import WhatsAppIcon from "../shared/WhatsAppIcon";
export default function CTASection({
  title = "Ready to print something great?",
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <section className="cta-section">
      <Reveal className="container cta-inner">
        <div>
          <span className="eyebrow">FROM YOUR IDEA TO THE FINAL PRINT</span>
          <h2>{title}</h2>
          <p>
            Tell us what you need. We’ll help you find the right printing
            solution.
          </p>
        </div>
        <div className="cta-actions">
          <Button href={whatsappHref(message)} variant="light" external>
            <WhatsAppIcon width={18} height={18} />
            Chat on WhatsApp
          </Button>
          <Button href={phoneHref} variant="secondary" arrow={false}>
            <Phone size={17} />
            Call Us
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

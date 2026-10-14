import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BadgeCheck, Check } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";
import Button from "../shared/Button";
import WhatsAppIcon from "../shared/WhatsAppIcon";
export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <span className="hero-eyebrow">
          <span />
          YOUR PRINT PARTNER IN SRI LANKA
        </span>
        <h1>
          Good ideas.
          <br />
          Great prints.
          <br />
          <span>Made for you.</span>
        </h1>
        <p>
          Bring your ideas to life with thoughtful digital printing. For your
          business, your big moments and everything in between.
        </p>
        <div className="hero-actions">
          <Button href="/services/">Explore our services</Button>
          <a
            href={whatsappHref()}
            className="hero-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width={18} height={18} />
            Get a quote on WhatsApp
          </a>
        </div>
        <div className="hero-assurances">
          <span>
            <Check size={14} />
            Quality in every detail
          </span>
          <span>
            <Check size={14} />
            Made to your requirements
          </span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo">
          <Image
            src="/images/hero/printed-products.webp"
            alt="Premium printed business cards, botanical brochures, product labels and custom packaging"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            preload
            fetchPriority="high"
          />
          <span className="hero-photo-label">GOOD IDEAS, IN GOOD HANDS.</span>
        </div>
        <div className="hero-quality">
          <span className="quality-icon">
            <BadgeCheck size={27} strokeWidth={1.5} />
          </span>
          <div>
            <strong>
              A little detail.
              <br />A lasting impression.
            </strong>
            <span>Print you can feel proud of.</span>
          </div>
        </div>
        <span className="hero-side-note">
          DESIGNED TO BE SEEN. MADE TO BE KEPT.
        </span>
      </div>
      <div className="hero-bottom">
        <span>From the first impression to the finishing touch.</span>
        <Link
          href="#printing-services"
          aria-label="Scroll to printing services"
        >
          Discover what we do <ArrowDown size={15} />
        </Link>
      </div>
    </section>
  );
}

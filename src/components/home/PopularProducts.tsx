import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
const products = [
  {
    title: "For your brand.",
    text: "Packaging that tells your story.",
    href: "/services/packaging-printing/",
    image: "/images/services/packaging-printing.webp",
    alt: "Custom printed packaging boxes and paper shopping bag",
    className: "product-large",
  },
  {
    title: "For your big moments.",
    text: "Invitations with a personal touch.",
    href: "/services/invitations-and-event-printing/",
    image: "/images/services/invitation-printing.webp",
    alt: "Elegant printed invitation stationery",
    className: "",
  },
  {
    title: "For the everyday.",
    text: "Merchandise, made yours.",
    href: "/services/custom-merchandise-printing/",
    image: "/images/services/merchandise-printing.webp",
    alt: "Custom printed cotton apparel and canvas bag",
    className: "",
  },
];
export default function PopularProducts() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="PRINT FOR EVERY POSSIBILITY"
        title="A good print goes a long way."
        description="Something to share. Something to celebrate. Something to call your own."
      />
      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.title}
            href={product.href}
            className={`product-card ${product.className}`}
          >
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(max-width: 600px) 100vw, 50vw"
            />
            <div>
              <h3>{product.title}</h3>
              <p>{product.text}</p>
            </div>
            <span className="product-arrow">
              <ArrowUpRight size={22} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

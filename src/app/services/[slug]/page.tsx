import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { phoneHref } from "@/data/business";
import { pageMetadata } from "@/lib/metadata";
import { whatsappHref } from "@/lib/whatsapp";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Button from "@/components/shared/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceGrid from "@/components/services/ServiceGrid";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTASection from "@/components/home/CTASection";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata(
    service.title,
    service.description,
    `/services/${service.slug}/`,
    service.heroImage,
  );
}
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const related = services
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === service.category) -
        Number(a.category === service.category),
    )
    .slice(0, 3);
  const message = `Hi, I would like a quote for ${service.title}. Can we discuss my requirements?`;
  return (
    <>
      <section className="container service-detail-hero">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services/" },
            { label: service.title },
          ]}
        />
        <div className="service-detail-layout">
          <div>
            <span className="eyebrow">{service.category}</span>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
            <div className="detail-actions">
              <Button href={whatsappHref(message)} external>
                Discuss your project
              </Button>
              <Button href={phoneHref} variant="secondary" arrow={false}>
                Call Us
              </Button>
            </div>
            <span className="pricing-note">
              Made to your requirements. Contact us for pricing.
            </span>
          </div>
          <div className="service-detail-image">
            <Image
              src={service.heroImage}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              preload
            />
          </div>
        </div>
      </section>
      <section className="container section service-details">
        <article>
          <span className="eyebrow">THE DETAILS MAKE THE DIFFERENCE</span>
          <h2>About this service</h2>
          <p>{service.about}</p>
          <ul className="feature-list">
            {service.features.map((feature) => (
              <li key={feature}>
                <Check size={18} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="suitable-section">
            <h3>Perfect for</h3>
            <div className="suitable-tags">
              {service.suitableFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>
        <aside className="options-card">
          <span className="eyebrow">LET’S FIND THE RIGHT FIT</span>
          <h2>Available options</h2>
          <ul>
            {service.availableOptions.map((option) => (
              <li key={option}>
                <Check size={16} />
                {option}
              </li>
            ))}
          </ul>
          <p>
            Options depend on your project. We’ll confirm materials, finishing
            and turnaround when we discuss your order.
          </p>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask about your options <ArrowRight size={16} />
          </a>
        </aside>
      </section>
      <section className="container section related-images">
        <SectionHeading
          eyebrow="A CLOSER LOOK"
          title="The possibilities in print."
          description="Explore product details and finishing inspiration for your project."
        />
        <GalleryGrid
          items={service.galleryImages.map((image, index) => ({
            id: `${slug}-${index}`,
            image,
            category: service.category,
            title: index === 0 ? service.title : "Complementary printing ideas",
            alt:
              index === 0
                ? service.imageAlt
                : "Complementary professionally printed products",
          }))}
        />
      </section>
      <CTASection title="Need this printing service?" message={message} />
      <section className="container section">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title="You might also have in mind…"
          action={
            <Button href="/services/" variant="secondary">
              All services
            </Button>
          }
        />
        <ServiceGrid items={related} />
      </section>
    </>
  );
}

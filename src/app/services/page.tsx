import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import PageIntro from "@/components/shared/PageIntro";
import ServiceGrid from "@/components/services/ServiceGrid";
import CTASection from "@/components/home/CTASection";
export const metadata = pageMetadata(
  "Our Printing Services",
  "Explore business cards, flyers, brochures, stickers, banners, invitations, packaging and custom digital printing services.",
  "/services/",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="FROM THE EVERYDAY TO THE EXTRAORDINARY"
        title={
          <>
            Whatever your idea,
            <br />
            <span>there’s a way to print it.</span>
          </>
        }
        description="Professional printing solutions for businesses, events, brands and personal projects. Explore the possibilities and let’s find the right fit."
        breadcrumb="Services"
      />
      <section className="container services-directory">
        <div className="directory-label">
          <span>Our printing services</span>
          <span>{services.length} ways to bring your ideas to life</span>
        </div>
        <ServiceGrid items={services} />
      </section>
      <div className="container service-note">
        <span className="eyebrow">SOMETHING ELSE IN MIND?</span>
        <h2>Every idea starts somewhere.</h2>
        <p>
          Don’t see exactly what you’re looking for? Talk to us about your
          requirements. We’ll help you explore what’s possible.
        </p>
      </div>
      <CTASection />
    </>
  );
}

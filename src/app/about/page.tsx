import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import PageIntro from "@/components/shared/PageIntro";
import SectionHeading from "@/components/shared/SectionHeading";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
export const metadata = pageMetadata(
  "About Us",
  "Meet Digital Printing: thoughtful digital printing solutions with a focus on quality, reliability and attention to your requirements.",
  "/about/",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE ABOUT US"
        title={
          <>
            Your ideas deserve
            <br />
            <span>a beautiful finish.</span>
          </>
        }
        description="We’re Digital Printing. We bring business essentials, special moments and creative ideas to life through thoughtful print."
        breadcrumb="About Us"
      />
      <section className="container about-story">
        <div className="about-story-image">
          <Image
            src="/images/about/printing-workspace.webp"
            alt="Colourful printed artwork emerging from professional printing equipment"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            preload
          />
        </div>
        <article>
          <span className="eyebrow">ABOUT DIGITAL PRINTING</span>
          <h2>
            Printing with purpose.
            <br />
            Care in every detail.
          </h2>
          <p>
            We provide reliable digital printing solutions for businesses,
            organisations, events and individuals. From everyday marketing
            materials to customised requirements, our focus is on helping you
            turn a good idea into a quality result.
          </p>
          <p>
            Every project begins with understanding what you need. We discuss
            your design, intended use, materials and finishing, so the final
            print works for your purpose.
          </p>
          <p>
            Whether it’s your first business card or a coordinated collection of
            brand materials, we’re here to help you work through the details.
          </p>
        </article>
      </section>
      <WhyChooseUs />
      <section className="container section">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="A clear path from idea to print."
          description="A little conversation upfront makes a big difference to the finished result."
        />
        <div className="process-grid">
          {[
            {
              title: "Tell us your idea",
              text: "Share your artwork, the product you have in mind and how you plan to use it.",
            },
            {
              title: "Work through the details",
              text: "We discuss materials, sizes, finishes, quantities and the timeline that suits your project.",
            },
            {
              title: "Confirm, then create",
              text: "Once the requirements and artwork are agreed, we bring the details together in print.",
            },
          ].map((step, index) => (
            <article key={step.title}>
              <span className="process-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-categories">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT WE PRINT"
            title="For business. For occasions. For you."
          />
          <div className="category-summary">
            {[
              services[0],
              services[4],
              services[6],
              services[7],
              services[8],
              services[5],
            ].map((service) => (
              <Link href={`/services/${service.slug}/`} key={service.slug}>
                <Check size={17} />
                {service.shortTitle}
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Have something in mind? Let’s print it." />
    </>
  );
}

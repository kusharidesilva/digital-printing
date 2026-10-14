import Hero from "@/components/home/Hero";
import BusinessHighlights from "@/components/home/BusinessHighlights";
import ServicePreview from "@/components/home/ServicePreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularProducts from "@/components/home/PopularProducts";
import GalleryPreview from "@/components/home/GalleryPreview";
import AboutPreview from "@/components/home/AboutPreview";
import ContactPreview from "@/components/home/ContactPreview";
import CTASection from "@/components/home/CTASection";
export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessHighlights />
      <ServicePreview />
      <WhyChooseUs />
      <PopularProducts />
      <GalleryPreview />
      <AboutPreview />
      <ContactPreview />
      <CTASection />
    </>
  );
}

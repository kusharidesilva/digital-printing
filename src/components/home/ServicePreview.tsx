import { services } from "@/data/services";
import SectionHeading from "../shared/SectionHeading";
import Button from "../shared/Button";
import ServiceGrid from "../services/ServiceGrid";
export default function ServicePreview() {
  const featured = [
    services[0],
    services[1],
    services[4],
    services[2],
    services[7],
    services[6],
  ];
  return (
    <section className="section container" id="printing-services">
      <SectionHeading
        eyebrow="A WORLD OF PRINT POSSIBILITIES"
        title={<>Your ideas. Our printing expertise.</>}
        description="From everyday essentials to something a little different, find the right print for your next project."
        action={
          <Button href="/services/" variant="secondary">
            View all services
          </Button>
        }
      />
      <ServiceGrid items={featured} />
    </section>
  );
}

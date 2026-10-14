import type { Service } from "@/types/service";
import Reveal from "../shared/Reveal";
import ServiceCard from "./ServiceCard";
export default function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="service-grid">
      {items.map((service, index) => (
        <Reveal key={service.slug} delay={(index % 3) * 0.05}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}/`} className="service-card">
      <div className="service-image">
        <Image
          src={service.heroImage}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
        />
        <span className="service-card-arrow">
          <ArrowUpRight size={21} />
        </span>
      </div>
      <div className="service-content">
        <span className="service-category">{service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.shortDescription}</p>
        <span className="service-detail-link">
          View details <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

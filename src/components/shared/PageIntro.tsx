import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";
import Reveal from "./Reveal";
export default function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumb: string;
}) {
  return (
    <section className="page-intro container">
      <Breadcrumb items={[{ label: breadcrumb }]} />
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </Reveal>
    </section>
  );
}

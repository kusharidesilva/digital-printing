import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "../shared/Reveal";
import Button from "../shared/Button";
export default function AboutPreview() {
  return (
    <section className="section container about-preview">
      <Reveal className="about-image">
        <Image
          src="/images/about/printing-workspace.webp"
          alt="Close-up of colourful print sheets and professional printing equipment"
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <span className="about-image-tag">
          A considered approach.
          <br />A beautiful result.
        </span>
      </Reveal>
      <Reveal className="about-copy">
        <span className="eyebrow">HELLO, WE’RE DIGITAL PRINTING</span>
        <h2>
          Behind every great print,
          <br />
          there’s a good idea.
        </h2>
        <p>
          We bring those ideas to life with reliable digital printing for
          businesses, organisations, events and individuals.
        </p>
        <p>
          From everyday marketing materials to your next creative project, our
          focus is simple: quality results and careful attention to every
          detail.
        </p>
        <div className="about-checks">
          <span>
            <Check size={16} />
            Business & personal printing
          </span>
          <span>
            <Check size={16} />
            Practical advice, from start to finish
          </span>
        </div>
        <Button href="/about/" variant="secondary">
          A little more about us
        </Button>
      </Reveal>
    </section>
  );
}

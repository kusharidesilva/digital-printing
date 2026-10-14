import { Palette, PencilRuler, MessagesSquare, Timer } from "lucide-react";
import Reveal from "../shared/Reveal";
const reasons = [
  {
    icon: Palette,
    title: "Quality in the details",
    text: "Carefully produced prints, with attention to colour, clarity and the final finish.",
  },
  {
    icon: PencilRuler,
    title: "Your idea, your way",
    text: "Practical printing options tailored to your business, occasion or personal project.",
  },
  {
    icon: MessagesSquare,
    title: "A conversation, not a complication",
    text: "Helpful advice and clear communication from your first question to your finished print.",
  },
  {
    icon: Timer,
    title: "Carefully planned turnaround",
    text: "An efficient printing process, with your requirements and timelines discussed upfront.",
  },
];
export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container why-layout">
        <Reveal>
          <span className="eyebrow">MORE THAN INK ON PAPER</span>
          <h2>
            Great printing starts
            <br />
            with a little care.
          </h2>
          <p>
            We believe the best results come from understanding what matters to
            you. Your idea, your purpose, your finish.
          </p>
          <span className="why-signoff">
            That’s the Digital Printing approach.
          </span>
        </Reveal>
        <div className="reasons-grid">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <Reveal className="reason" key={title} delay={index * 0.04}>
              <Icon size={26} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

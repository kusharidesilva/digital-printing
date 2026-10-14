import { BadgeCheck, Clock3, PencilRuler, Layers3 } from "lucide-react";
const highlights = [
  {
    icon: BadgeCheck,
    title: "Quality you can feel",
    text: "Care in every colour and finish",
  },
  {
    icon: Clock3,
    title: "Thoughtful turnaround",
    text: "Clear timelines, from the start",
  },
  {
    icon: PencilRuler,
    title: "Made for your idea",
    text: "Print tailored to your needs",
  },
  {
    icon: Layers3,
    title: "Big or small, we print it",
    text: "Business & personal orders",
  },
];
export default function BusinessHighlights() {
  return (
    <div className="highlights-strip">
      <div className="container highlights-grid">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div className="highlight" key={title}>
            <Icon size={26} strokeWidth={1.4} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

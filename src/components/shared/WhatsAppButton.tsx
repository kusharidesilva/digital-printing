import { whatsappHref } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp, opens in a new tab"
    >
      <WhatsAppIcon width={24} height={24} />
      <span>Chat with us</span>
    </a>
  );
}

import { businessInfo } from "@/data/business";
export function whatsappHref(message: string = businessInfo.whatsappMessage) {
  const number = businessInfo.whatsapp.replace(/\D/g, "");
  // Without a verified business number, WhatsApp opens its own recipient chooser.
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

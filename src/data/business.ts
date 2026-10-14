/** CLIENT CONTENT: replace these details before a public business launch. No environment variables are required. */
export const businessInfo = {
  name: "Digital Printing",
  tagline: "Good ideas. Beautifully printed.",
  phoneDisplay: "+94 XX XXX XXXX",
  phone: "", // Replace with the client's verified E.164 number, including +94.
  whatsapp: "", // Replace with their verified number, digits only including 94.
  email: "hello@digitalprinting.lk", // Requested placeholder: replace with a verified mailbox.
  address: "Business Address, Sri Lanka", // Replace with the physical street address.
  directionsUrl: "", // Set the verified Google Maps business URL.
  hours: {
    days: "Monday – Saturday",
    time: "9:00 AM – 6:00 PM",
    closed: "Sunday: closed",
  },
  siteUrl: "https://digital-printing-b62.pages.dev", // Update to your custom domain before rebuilding when one is connected.
  whatsappMessage:
    "Hi, I would like to know more about your printing services.",
};
export const phoneHref = businessInfo.phone
  ? `tel:${businessInfo.phone}`
  : "/contact/#phone";
export const emailHref = `mailto:${businessInfo.email}`;

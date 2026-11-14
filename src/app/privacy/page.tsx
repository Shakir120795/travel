import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Privacy Policy — xyz-travel.com", description: "How xyz-travel.com collects, uses and protects your information when you enquire or book a tour." };
export default function Page() { return (<LegalPage title="Privacy Policy" updated="15 November 2026">
  <section><h2>1. Who we are</h2><p>xyz-travel.com is a private tour service based in Agra, India, offering private car tours with a local driver-guide host. This page explains what information we collect and how we use it.</p></section>
  <section><h2>2. Information we collect</h2><ul><li>Booking details you share with us: your name, phone/WhatsApp number, email (optional), travel date, number of travelers, pickup location and message.</li><li>Messages you send us on WhatsApp or email.</li><li>Basic, anonymous information needed to run this website securely. This website does not use advertising trackers.</li></ul></section>
  <section><h2>3. How we use your information</h2><ul><li>To confirm, plan and run your tour, including pickup coordination.</li><li>To reply to your questions and send booking updates on WhatsApp or email.</li><li>To improve our tours and this website.</li></ul><p>We never sell your personal information to anyone.</p></section>
  <section><h2>4. Sharing</h2><p>We share your details only when needed to run your tour — for example with your assigned driver-guide (your name, pickup point and phone number) or a licensed monument guide booked for you. We may disclose information if required by law.</p></section>
  <section><h2>5. Storage & retention</h2><p>Booking enquiries sent from this website are delivered to us through WhatsApp and our lead inbox. We keep booking records only as long as needed for the tour, accounts and legal requirements, and then remove them.</p></section>
  <section><h2>6. Your choices</h2><ul><li>Ask us anytime what details we hold about you, and ask for correction or deletion.</li><li>Opt out of any non-essential messages with a single WhatsApp message.</li></ul></section>
  <section><h2>7. Children</h2><p>Bookings must be made by an adult (18+). Children travel with their parents or guardians.</p></section>
  <section><h2>8. Changes</h2><p>If this policy changes, the new version will be posted on this page with a fresh date.</p></section>
</LegalPage>); }

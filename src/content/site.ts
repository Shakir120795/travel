export const site = {
  brand: "xyz-travel.com",
  tagline: "Feel the Journey Before You Take It.",
  sub: "Private Agra tours with a local driver-guide — the Taj at sunrise, forts, gardens and old-city streets.",
  whatsapp: "918126812317",
  email: "hello@example.com", // PLACEHOLDER
  whatsappDisplay: "+91 81268 12317",
};
export const trustPoints = ["Commercial licensed car","English-speaking local host","Licensed monument guide on request","Hotel / station pickup in Agra"];
export type Pkg = {id:string; title:string; duration:string; route:string; includes:string[]; price:string; image:string};
export const packages: Pkg[] = [
  {id:"sunrise", title:"Agra Sunrise Tour", duration:"4–5 hours", route:"Pickup → Taj Mahal at sunrise → Breakfast stop → Drop", includes:["Car + driver-guide","Pickup & drop","Water bottles"], price:"₹1,999", image:"/videos/poster-hero.jpg"},
  {id:"fullday", title:"Agra Full-Day City Tour", duration:"8–9 hours", route:"Taj Mahal → Agra Fort → Mehtab Bagh → Old Agra market", includes:["Car + driver-guide","Licensed guide add-on available","Flexible stops"], price:"₹2,999", image:"/videos/poster-fort.jpg"},
  {id:"jaipur-transfer", title:"Agra to Jaipur Transfer with Sightseeing", duration:"1 day", route:"Agra → Fatehpur Sikri → Abhaneri Stepwell → Jaipur", includes:["One-way private car","Sightseeing stops","Luggage space"], price:"₹6,499", image:"/videos/poster-jaipur.jpg"},
  {id:"golden-triangle", title:"Delhi–Agra–Jaipur Golden Triangle", duration:"3–4 days", route:"Delhi → Agra → Jaipur → Delhi", includes:["Car for full trip","Driver-guide host","Hotel pickup daily"], price:"₹17,999", image:"/images/delhi.webp"},
  {id:"manali", title:"Manali Trip", duration:"4–6 days", route:"Delhi / Chandigarh → Manali → Solang Valley", includes:["Mountain-experienced driver","Private car","Flexible itinerary"], price:"₹14,999", image:"/images/manali.webp"},
];
export type Stop = {name:string; desc:string; media:{type:"video"|"image"; src:string; poster?:string}};
export const stops: Stop[] = [
  {name:"Taj Mahal", desc:"Sunrise view — the most peaceful hour to visit the monument.", media:{type:"video", src:"/videos/taj-orbit.mp4", poster:"/videos/poster-taj.jpg"}},
  {name:"Agra Fort", desc:"The red sandstone palace-city of the emperors, above the river bend.", media:{type:"video", src:"/videos/fort.mp4", poster:"/videos/poster-fort.jpg"}},
  {name:"Riverside Garden", desc:"Mehtab Bagh — the famous moonlight garden across the Yamuna, facing the Taj.", media:{type:"image", src:"/images/mehtab.webp"}},
  {name:"Historic Town", desc:"Fatehpur Sikri — a perfectly preserved Mughal town, a short drive from Agra.", media:{type:"image", src:"/images/fatehpur.webp"}},
  {name:"Local Market", desc:"Kinari Bazaar — marble inlay, leather craft, spices and street food.", media:{type:"image", src:"/images/market.webp"}},
];
export const hotspots = [
  {title:"The Great Dome", desc:"Look for the perfect symmetry from the central platform.", tip:"Best time: sunrise, before 7 AM.", pos:[-0.0,2.6,1.8] as const},
  {title:"Main Gateway", desc:"The grand entrance frames the monument like a picture.", tip:"Photo tip: stand dead-centre for the framed shot.", pos:[-2.2,1.2,1.2] as const},
  {title:"River Side", desc:"From across the river the view turns golden at sunset.", tip:"Best time: golden hour, 5–6:30 PM.", pos:[2.2,1.0,1.4] as const},
];
export const faqs = [
  {q:"How do I book and pay?", a:"Choose a tour, send the booking form, and confirm on WhatsApp. Payment is arranged in the same WhatsApp chat, as confirmed for your booking."},
  {q:"Is a guide included inside monuments?", a:"Inside protected monuments a licensed guide is required — a licensed guide can be added to any tour on request."},
  {q:"Can I customise a tour?", a:"Yes — stops, timings and pace can be adjusted. Tell us on WhatsApp what you have in mind and we will plan the day around it."},
  {q:"Where do you pick up from?", a:"Hotels, railway station or any point in Agra. Longer trips start from Delhi / Jaipur as planned on WhatsApp."},
];

export const destinations = [
  {name:"Taj Mahal, Agra", desc:"White marble at sunrise — the most beautiful view in the world, in person.", video:"/videos/taj-orbit.mp4", poster:"/videos/poster-taj.jpg", pkg:"sunrise"},
  {name:"Agra Fort", desc:"The red sandstone palace-city of the emperors — with the Taj framed from its towers.", video:"/videos/fort.mp4", poster:"/videos/poster-fort.jpg", pkg:"fullday"},
  {name:"Jaipur — Pink City", desc:"Hawa Mahal's pink streets and the Amber Fort rising on its hill.", video:"/videos/jaipur.mp4", poster:"/videos/poster-jaipur.jpg", pkg:"jaipur-transfer"},
  {name:"Mathura–Vrindavan", desc:"The temple towns of Krishna — Prem Mandir, Banke Bihari and the Yamuna ghats.", video:"/videos/vrindavan.mp4", poster:"/videos/poster-vrindavan.jpg", pkg:"fullday"},
];

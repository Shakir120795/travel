export const site = {
  brand: "[PLACEHOLDER: Brand Name]",
  tagline: "Feel the Journey Before You Take It.",
  sub: "Private Agra tours with a local driver-guide host — sunrise at the Taj, forts, gardens and old-city streets, in a comfortable licensed car.",
  whatsapp: "910000000000", // TODO: founder real WhatsApp number daalein
  email: "hello@example.com", // PLACEHOLDER
  whatsappDisplay: "+91 XXXXX XXXXX [Placeholder]",
};
export const trustPoints = ["Commercial licensed car","English-speaking local host","Licensed monument guide on request","Hotel / station pickup in Agra"];
export type Pkg = {id:string; title:string; duration:string; route:string; includes:string[]};
export const packages: Pkg[] = [
  {id:"sunrise", title:"Agra Sunrise Tour", duration:"4–5 hours", route:"Pickup → Taj Mahal at sunrise → Breakfast stop → Drop", includes:["Car + driver-guide","Pickup & drop","Water bottles"]},
  {id:"fullday", title:"Agra Full-Day City Tour", duration:"8–9 hours", route:"Taj Mahal → Agra Fort → Mehtab Bagh → Old Agra market", includes:["Car + driver-guide","Licensed guide add-on available","Flexible stops"]},
  {id:"jaipur-transfer", title:"Agra to Jaipur Transfer with Sightseeing", duration:"1 day", route:"Agra → Fatehpur Sikri → Abhaneri Stepwell → Jaipur", includes:["One-way private car","Sightseeing stops","Luggage space"]},
  {id:"golden-triangle", title:"Delhi–Agra–Jaipur Golden Triangle", duration:"3–4 days", route:"Delhi → Agra → Jaipur → Delhi", includes:["Car for full trip","Driver-guide host","Hotel pickup daily"]},
  {id:"manali", title:"Manali Trip", duration:"4–6 days", route:"Delhi / Chandigarh → Manali → Solang Valley", includes:["Mountain-experienced driver","Private car","Flexible itinerary"]},
];
export const stops = [
  {name:"The Main Monument", desc:"Sunrise view, the most peaceful hour to visit.", pos:0},
  {name:"The Fort", desc:"Red sandstone palace-city of the emperors.", pos:1},
  {name:"Riverside Garden", desc:"The famous moonlight view across the river.", pos:2},
  {name:"Historic Town", desc:"A short drive to a perfectly preserved old town.", pos:3},
  {name:"Local Market", desc:"Marble inlay, leather craft and street food.", pos:4},
];
export const hotspots = [
  {title:"The Great Dome", desc:"Look for the perfect symmetry from the central platform.", tip:"Best time: sunrise, before 7 AM.", pos:[-0.0,2.6,1.8] as const},
  {title:"Main Gateway", desc:"The grand entrance frames the monument like a picture.", tip:"Photo tip: stand dead-centre for the framed shot.", pos:[-2.2,1.2,1.2] as const},
  {title:"River Side", desc:"From across the river the view turns golden at sunset.", tip:"Best time: golden hour, 5–6:30 PM.", pos:[2.2,1.0,1.4] as const},
];
export const faqs = [
  {q:"How do I book and pay?", a:"Choose a tour, confirm on WhatsApp, and pay as arranged on WhatsApp. [Placeholder: payment & cancellation terms to be added by founder.]"},
  {q:"Is a guide included inside monuments?", a:"Inside protected monuments a licensed guide is required — a licensed guide can be added to any tour on request."},
  {q:"Can I book the bike?", a:"Bike rides are coming soon for real bookings, until permits and insurance are in place. Cars are bookable now."},
  {q:"Where do you pick up from?", a:"Hotels, railway station or any point in Agra. Longer trips start from Delhi / Jaipur as planned on WhatsApp."},
];

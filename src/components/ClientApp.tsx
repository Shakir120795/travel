"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { site, trustPoints, packages, stops, hotspots, faqs, destinations } from "@/content/site";

function VideoBg({src, poster, className, eager}:{src:string; poster?:string; className?:string; eager?:boolean}){
  const ref=useRef<HTMLVideoElement>(null);
  useEffect(()=>{ const v=ref.current; if(!v) return; v.muted=true; const tryPlay=()=>{ v.play().catch(()=>{}); }; tryPlay(); v.addEventListener("canplay", tryPlay); return ()=>v.removeEventListener("canplay", tryPlay); },[src]);
  return (<video ref={ref} key={src} className={className} autoPlay muted loop playsInline preload={eager?"auto":"metadata"} poster={poster} aria-hidden><source src={src} type="video/mp4"/></video>);
}
export default function ClientApp(){
  const [pkg,setPkg]=useState(packages[0].id); const [stop,setStop]=useState(0); const [trip,setTrip]=useState<string[]>([]); const [loaded,setLoaded]=useState(false); const [reduced,setReduced]=useState(false);
  const formRef=useRef<HTMLFormElement>(null);
  useEffect(()=>{ if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{}); setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); const t=setTimeout(()=>setLoaded(true),900);
    gsap.registerPlugin(ScrollTrigger); const lenis=new Lenis({lerp:0.09}); lenis.on("scroll",ScrollTrigger.update);
    const raf=(time:number)=>{lenis.raf(time*1000)}; gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>{ gsap.fromTo(el,{y:36,opacity:0},{y:0,opacity:1,duration:0.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 86%"}}); });
    return ()=>{clearTimeout(t); gsap.ticker.remove(raf); lenis.destroy();}; },[]);
  const bookPkg=(id:string)=>{ setPkg(id); document.getElementById("book")?.scrollIntoView({behavior:"smooth"}); };
  const addStop=(n:string)=>{ setTrip(p=>p.includes(n)?p:[...p,n]); document.getElementById("book")?.scrollIntoView({behavior:"smooth"}); };
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget); const data=Object.fromEntries(fd.entries()); const sel=packages.find(p=>p.id===pkg);
    const msg=`Hello! I want to book: ${sel?.title}\nName: ${data.name}\nCountry: ${data.country}\nWhatsApp: ${data.phone}\nDate: ${data.date}\nTravelers: ${data.travelers}\nPickup: ${data.pickup}\nStops: ${trip.join(", ")||"-"}\nMessage: ${data.message||"-"}`;
    fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,packageId:pkg,stops:trip})}).catch(()=>{});
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank"); };
  const input="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-500";
  const active=stops[stop];
  return (<main>
    {!loaded && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#FAF6EE]"><div className="text-center"><p className="font-display text-2xl font-bold">Golden Hour Drive</p><div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-slate-900/10"><div className="h-full w-2/3 animate-pulse rounded-full bg-cyan-300"/></div><p className="mt-3 text-sm text-slate-600">Loading your golden-hour ride…</p></div></div>}
    <a href="#book" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-cyan-300 focus:px-4 focus:py-2 focus:text-black">Skip to booking</a>
    <header className="glass fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-2xl px-4 py-3 md:inset-x-8">
      <a href="#hero" className="font-display text-lg font-bold">{site.brand}</a>
      <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex"><a href="#tours">Tours</a><a href="#places">Places</a><a href="#stops">Stops</a><a href="#faq">FAQ</a></nav>
      <div className="flex gap-2"><a href="#book" className="btn-primary rounded-full px-4 py-2 text-sm">Book Now</a></div>
    </header>

    <section id="hero" className="relative flex min-h-[100vh] items-center overflow-hidden">
      <div className="absolute inset-0">{reduced ? <img src="/videos/poster-hero.jpg" alt="" className="h-full w-full object-cover"/> : <VideoBg src="/videos/hero-taj.mp4" poster="/videos/poster-hero.jpg" className="h-full w-full object-cover" eager/>}</div>
      <div className="pointer-events-none absolute inset-0" style={{background:"linear-gradient(90deg,rgba(250,246,238,.92),rgba(250,246,238,.45) 52%,rgba(250,246,238,0) 78%),linear-gradient(180deg,rgba(250,246,238,.25),transparent 30%,transparent 62%,#FAF6EE)"}}/>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28">
        <p className="mb-3 inline-block rounded-full border border-cyan-700/30 bg-white/70 px-4 py-1 text-xs font-semibold tracking-[0.22em] text-cyan-800">AGRA • PRIVATE CAR TOURS</p>
        <h1 className="font-display max-w-2xl text-4xl font-bold leading-[1.02] md:text-6xl">Feel the Journey <span className="text-grad">Before You Take It.</span></h1>
        <p className="mt-4 max-w-md text-base font-medium text-slate-700">{site.sub}</p>
        <div className="pointer-events-auto mt-6 flex flex-wrap gap-3"><a href="#book" className="btn-amber rounded-full px-6 py-3">Book Your Tour</a><a href="#places" className="glass glow-cyan rounded-full px-6 py-3 font-semibold">▶ Watch the Places</a></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-3 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">{trustPoints.map(t=>(<div key={t} data-reveal className="glass rounded-2xl px-5 py-4 text-center font-medium">✓ {t}</div>))}</section>

    <section id="tours" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Experiences & Packages</h2><p className="mt-3 text-slate-600">Starting rate per car shown for each tour. Your final rate — for your date, car type and group size — is confirmed on WhatsApp before you pay anything.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{packages.map(p=>(<article key={p.id} data-reveal className="glass group overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-cyan-300/50"><img src={p.image} alt={p.title} className="h-44 w-full object-cover" loading="lazy"/><div className="p-6"><p className="text-xs tracking-widest text-cyan-700">{p.duration.toUpperCase()}</p><h3 className="font-display mt-2 text-2xl font-bold">{p.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{p.route}</p><ul className="mt-4 space-y-1 text-sm text-slate-600">{p.includes.map(i=>(<li key={i}>• {i}</li>))}</ul><p className="mt-5 flex items-baseline gap-2"><span className="text-xs uppercase tracking-widest text-slate-600">Starting from</span><span className="font-display text-3xl font-bold text-amber-600">{p.price}</span><span className="text-xs text-slate-600">per car</span></p><button onClick={()=>bookPkg(p.id)} className="btn-primary mt-4 w-full rounded-full py-3">Book This Tour</button></div></article>))}</div></section>

    <section id="places" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Places — A Film for Every Destination</h2><p className="mt-3 max-w-2xl text-slate-600">Not just the Taj — Agra Fort, the palaces of Jaipur and the temples of Mathura–Vrindavan, each with its own film.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{destinations.map(d=>(<article key={d.name} data-reveal className="glass group overflow-hidden rounded-3xl"><div className="relative aspect-video overflow-hidden"><VideoBg src={d.video} poster={d.poster} className="h-full w-full object-cover"/><span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold tracking-wide text-cyan-200">3D VIEW FILM</span></div><div className="p-6"><h3 className="font-display text-2xl font-bold">{d.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d.desc}</p><button onClick={()=>bookPkg(d.pkg)} className="btn-primary mt-5 rounded-full px-6 py-2.5 text-sm">Book This Place</button></div></article>))}</div></section>

    <section id="stops" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Tour Stops — Tap a Place</h2><p className="mt-3 max-w-xl text-slate-600">Tap any stop to see it. Add the ones you love to your trip, and they will be included in your booking.</p>
      <div className="relative mt-7 h-[480px] overflow-hidden rounded-[2rem] border border-slate-900/15">
        {active.media.type==="video" ? <VideoBg src={active.media.src} poster={active.media.poster} className="absolute inset-0 h-full w-full object-cover"/> : <img key={active.name} src={active.media.src} alt={active.name} className="absolute inset-0 h-full w-full object-cover"/>}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 pt-16">
          <h3 className="font-display text-2xl font-bold md:text-3xl">{active.name}</h3>
          <p className="mt-1 max-w-lg text-sm text-slate-200">{active.desc}</p>
          <button onClick={()=>addStop(active.name)} className="btn-amber mt-4 rounded-full px-5 py-2.5 text-sm">+ Add to My Trip</button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{stops.map((s,i)=>(<button key={s.name} onClick={()=>setStop(i)} className={`rounded-full px-4 py-2 text-sm ${stop===i?"bg-amber-400 text-black font-bold":"glass"}`}>{i+1}. {s.name}</button>))}</div>
      {trip.length>0 && <p className="mt-4 text-sm font-medium text-cyan-700">Your trip stops: {trip.join(" • ")}</p>}
    </section>

    <section id="monument" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">The Taj Mahal — Up Close</h2><p className="mt-3 text-slate-600">The monument in sunrise light, from every side — and on the tour, a licensed guide brings its stories to life.</p>
      <div className="relative mt-7 h-[480px] overflow-hidden rounded-[2rem] border border-slate-900/15">{reduced?<img src="/videos/poster-taj.jpg" alt="" className="h-full w-full object-cover"/>:<VideoBg src="/videos/taj-orbit.mp4" poster="/videos/poster-taj.jpg" className="h-full w-full object-cover"/>}</div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{hotspots.map(h=>(<div key={h.title} data-reveal className="glass rounded-2xl p-5"><h3 className="font-display font-bold">{h.title}</h3><p className="mt-2 text-sm text-slate-600">{h.desc}</p><p className="mt-2 text-sm text-amber-600">{h.tip}</p></div>))}</div>
      <button onClick={()=>bookPkg("sunrise")} className="btn-amber mt-6 rounded-full px-7 py-3.5">Book a Tour Here</button></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold">How It Works</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[["1. Choose a Tour","Pick a package and tap the stops you want to see."],["2. Confirm on WhatsApp","Send the form — your booking is confirmed in the WhatsApp chat."],["3. Meet Your Host","Pickup from your hotel or station, and the journey begins."]].map(s=>(<div key={s[0]} data-reveal className="glass rounded-3xl p-6"><h3 className="font-display text-xl font-bold">{s[0]}</h3><p className="mt-2 text-slate-600">{s[1]}</p></div>))}</div></section>

    <section className="mx-auto max-w-6xl px-5 py-8"><h2 data-reveal className="font-display text-3xl font-bold">Guest Reviews</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{["Sunrise Tour","Full-Day Tour","Golden Triangle"].map(i=>(<div key={i} className="glass rounded-3xl p-6 text-slate-600">Reviews from our guests on the {i} will be published here soon.</div>))}</div></section>

    <section id="book" className="mx-auto max-w-3xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Book Your Tour</h2><p className="mt-3 text-slate-600">Submit the form and WhatsApp opens with your booking pre-filled. Payment is arranged in the same chat. WhatsApp: {site.whatsappDisplay}</p>
      <form ref={formRef} onSubmit={submit} className="mt-7 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-2">
        <input name="name" required placeholder="Your name *" className={input}/><input name="country" placeholder="Country" className={input}/>
        <input name="phone" required placeholder="Phone / WhatsApp *" className={input}/><input name="email" type="email" placeholder="Email (optional)" className={input}/>
        <select value={pkg} onChange={e=>setPkg(e.target.value)} className={`${input} md:col-span-2 [&>option]:bg-white`}>{packages.map(p=>(<option key={p.id} value={p.id}>{p.title} — {p.duration}</option>))}</select>
        <input name="date" type="date" required className={input}/><input name="travelers" type="number" min={1} defaultValue={2} className={input}/>
        <input name="pickup" placeholder="Pickup place (hotel / station)" className={`${input} md:col-span-2`}/>
        <textarea name="message" placeholder={trip.length?`My trip stops: ${trip.join(", ")}`:"Message"} className={`${input} md:col-span-2`} rows={3}/>
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden/>
        <button className="btn-amber rounded-full py-4 text-lg md:col-span-2">Confirm on WhatsApp →</button>
        <p className="text-xs text-slate-500 md:col-span-2">Free date change up to 24 hours before the tour, as confirmed on WhatsApp. See our <a className="underline" href="/terms">Terms & Conditions</a>.</p>
      </form></section>

    <section id="faq" className="mx-auto max-w-4xl px-5 py-12"><h2 className="font-display text-3xl font-bold">FAQ</h2><div className="mt-6 space-y-3">{faqs.map(f=>(<details key={f.q} className="glass rounded-2xl p-5"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-slate-600">{f.a}</p></details>))}</div></section>

    <footer className="border-t border-slate-900/10 px-5 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><p className="font-display text-lg font-bold">{site.brand}</p><p className="mt-2 text-sm text-slate-600">Private Agra tours with a local driver-guide.</p><p className="mt-3 text-sm text-slate-600">{site.email}<br/>{site.whatsappDisplay}</p></div>
        <nav><p className="font-display font-bold">Explore</p><ul className="mt-3 space-y-2 text-sm text-slate-600"><li><a className="hover:text-slate-900" href="#tours">Tours & Packages</a></li><li><a className="hover:text-slate-900" href="#places">Places</a></li><li><a className="hover:text-slate-900" href="#stops">Tour Stops</a></li><li><a className="hover:text-slate-900" href="#book">Book a Tour</a></li><li><a className="hover:text-slate-900" href="#faq">FAQ</a></li></ul></nav>
        <nav><p className="font-display font-bold">Legal & Safety</p><ul className="mt-3 space-y-2 text-sm text-slate-600"><li><a className="hover:text-slate-900" href="/privacy">Privacy Policy</a></li><li><a className="hover:text-slate-900" href="/terms">Terms & Conditions</a></li><li><a className="hover:text-slate-900" href="/safety">Safety & Security</a></li></ul></nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-slate-900/10 pt-5 text-center text-sm text-slate-500">© 2026 xyz-travel.com — Agra Private Tour with Driver. All rights reserved.</p>
    </footer>
  </main>);
}

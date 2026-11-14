"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { site, trustPoints, packages, stops, hotspots, faqs } from "@/content/site";


function useInstall(){
  const [prompt,setPrompt]=useState<any>(null); const [ios,setIos]=useState(false);
  useEffect(()=>{ const h=(e:any)=>{e.preventDefault();setPrompt(e)}; window.addEventListener("beforeinstallprompt",h);
    if(/iphone|ipad/i.test(navigator.userAgent) && !(window.navigator as any).standalone) setIos(true);
    if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});
    return ()=>window.removeEventListener("beforeinstallprompt",h); },[]);
  return {install: async()=>{ if(prompt){prompt.prompt();} else if(ios){alert("iPhone: Share → Add to Home Screen se install karein.");} else {alert("Browser menu se 'Install App / Add to Home Screen' chunein.");} }};
}
export default function ClientApp(){
  const [pkg,setPkg]=useState(packages[0].id); const [mode,setMode]=useState<"car"|"bike">("car"); const [stop,setStop]=useState(0); const [trip,setTrip]=useState<string[]>([]); const [loaded,setLoaded]=useState(false); const [reduced,setReduced]=useState(false);
  const {install}=useInstall(); const formRef=useRef<HTMLFormElement>(null);
  useEffect(()=>{ setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); const t=setTimeout(()=>setLoaded(true),900);
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
  const input="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-slate-400";
  return (<main>
    {!loaded && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#05060A]"><div className="text-center"><p className="font-display text-2xl font-bold">Golden Hour Drive</p><div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 animate-pulse rounded-full bg-cyan-300"/></div><p className="mt-3 text-sm text-slate-400">Loading your golden-hour ride…</p></div></div>}
    <a href="#book" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-cyan-300 focus:px-4 focus:py-2 focus:text-black">Skip to booking</a>
    <header className="glass fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-2xl px-4 py-3 md:inset-x-8">
      <a href="#hero" className="font-display text-lg font-bold">{site.brand}</a>
      <nav className="hidden gap-6 text-sm text-slate-300 md:flex"><a href="#tours">Tours</a><a href="#ride">Ride View</a><a href="#monument">Monument</a><a href="#faq">FAQ</a></nav>
      <div className="flex gap-2"><button onClick={install} className="glass rounded-full px-4 py-2 text-sm">Install App</button><a href="#book" className="btn-primary rounded-full px-4 py-2 text-sm">Book Now</a></div>
    </header>

    <section id="hero" className="relative flex min-h-[108vh] items-center overflow-hidden">
      <div className="absolute inset-0">{reduced ? <img src="/videos/poster-hero.jpg" alt="" className="h-full w-full object-cover"/> : <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/videos/poster-hero.jpg" aria-hidden><source src="/videos/hero-taj.mp4" type="video/mp4"/></video>}</div>
      <div className="pointer-events-none absolute inset-0" style={{background:"linear-gradient(90deg,rgba(5,6,10,.68),rgba(5,6,10,.22) 55%,transparent),linear-gradient(180deg,rgba(5,6,10,.25),transparent 35%,transparent 60%,#05060A)"}}/>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28">
        <p className="mb-4 inline-block rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs tracking-[0.22em] text-cyan-200">AGRA • PRIVATE CAR TOURS • LOCAL HOST</p>
        <h1 className="font-display max-w-3xl text-5xl font-bold leading-[0.98] md:text-7xl">Feel the Journey <span className="text-grad">Before You Take It.</span></h1>
        <p className="mt-5 max-w-xl text-lg text-slate-300">{site.sub}</p>
        <div className="pointer-events-auto mt-8 flex flex-wrap gap-3"><a href="#book" className="btn-amber rounded-full px-7 py-3.5">Book Your Tour</a><a href="#ride" className="glass glow-cyan rounded-full px-7 py-3.5 font-semibold">▶ Watch the Ride</a></div>
        <p className="mt-6 text-sm text-slate-400">Upar golden-hour ki 3D-view film chal rahi hai — tours ke liye scroll karein ↓</p>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-3 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">{trustPoints.map(t=>(<div key={t} data-reveal className="glass rounded-2xl px-5 py-4 text-center font-medium">✓ {t}</div>))}</section>

    <section id="tours" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Experiences & Packages</h2><p className="mt-3 text-slate-400">Price: <b className="text-amber-300">[Placeholder — founder prices yahan aayenge]</b></p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{packages.map(p=>(<article key={p.id} data-reveal className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/50"><p className="text-xs tracking-widest text-cyan-300">{p.duration.toUpperCase()}</p><h3 className="font-display mt-2 text-2xl font-bold">{p.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{p.route}</p><ul className="mt-4 space-y-1 text-sm text-slate-400">{p.includes.map(i=>(<li key={i}>• {i}</li>))}</ul><button onClick={()=>bookPkg(p.id)} className="btn-primary mt-6 w-full rounded-full py-3">Book This Tour</button></article>))}</div></section>

    <section id="ride" className="mx-auto max-w-6xl px-5 py-16"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Ride View — Car ya Bike?</h2><p className="mt-3 max-w-xl text-slate-400">Booking se pehle ride feel karein. Bike bookings <b className="text-amber-300">Coming Soon</b> hain — permits & insurance pending. Car bookable hai.</p></div>
      <div className="glass flex rounded-full p-1">{(["car","bike"] as const).map(m=>(<button key={m} onClick={()=>setMode(m)} className={`rounded-full px-6 py-2.5 font-semibold capitalize ${mode===m?"bg-cyan-300 text-black":"text-slate-300"}`}>{m} View</button>))}</div></div>
      <div className="relative mt-7 h-[480px] overflow-hidden rounded-[2rem] border border-white/12">{reduced?<img src="/videos/poster-hero.jpg" alt="" className="h-full w-full object-cover"/>:<video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/videos/poster-hero.jpg" aria-hidden><source src="/videos/hero-taj.mp4" type="video/mp4"/></video>}
        {mode==="car" && <div className="pointer-events-none absolute inset-x-8 bottom-0 h-24 rounded-t-[6rem] border-t-4 border-cyan-200/25 bg-black/35 backdrop-blur-[2px]"/>}
        {mode==="bike" && <div className="pointer-events-none absolute bottom-5 left-1/2 h-4 w-64 -translate-x-1/2 rounded-full bg-black/60 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]"/>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{stops.map((s,i)=>(<button key={s.name} onClick={()=>setStop(i)} className={`rounded-full px-4 py-2 text-sm ${stop===i?"bg-amber-400 text-black font-bold":"glass"}`}>{i+1}. {s.name}</button>))}</div>
      <div className="sr-only">{stops.map(s=>(<p key={s.name}>{s.name}: {s.desc}</p>))}</div></section>

    <section id="monument" className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Monument — 3D View Film</h2><p className="mt-3 text-slate-400">Film me monument sunrise ki roshni me har angle se ghoomta dikhega — asal me yahi nazara aapko wahan milega.</p>
      <div className="relative mt-7 h-[480px] overflow-hidden rounded-[2rem] border border-white/12">{reduced?<img src="/videos/poster-taj.jpg" alt="" className="h-full w-full object-cover"/>:<video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/videos/poster-taj.jpg" aria-hidden><source src="/videos/taj-orbit.mp4" type="video/mp4"/></video>}</div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{hotspots.map(h=>(<div key={h.title} data-reveal className="glass rounded-2xl p-5"><h3 className="font-display font-bold">{h.title}</h3><p className="mt-2 text-sm text-slate-300">{h.desc}</p><p className="mt-2 text-sm text-amber-300">{h.tip}</p></div>))}</div>
      <button onClick={()=>bookPkg("sunrise")} className="btn-amber mt-6 rounded-full px-7 py-3.5">Book a Tour Here</button></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold">How It Works</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[["1. Choose a Tour","Package chunein, Ride View me pehle feel karein."],["2. Confirm on WhatsApp","Form bharein — booking seedha WhatsApp par confirm hogi."],["3. Meet Your Host","Hotel/station pickup, aur safar shuru."]].map(s=>(<div key={s[0]} data-reveal className="glass rounded-3xl p-6"><h3 className="font-display text-xl font-bold">{s[0]}</h3><p className="mt-2 text-slate-300">{s[1]}</p></div>))}</div></section>

    <section className="mx-auto max-w-6xl px-5 py-8"><h2 data-reveal className="font-display text-3xl font-bold">Reviews</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{[1,2,3].map(i=>(<div key={i} className="glass rounded-3xl p-6 text-slate-400">[Placeholder] Real Google reviews yahan aayenge — abhi koi review invent nahi kiya gaya hai.</div>))}</div></section>

    <section id="book" className="mx-auto max-w-3xl px-5 py-16"><h2 data-reveal className="font-display text-4xl font-bold md:text-5xl">Book Your Tour</h2><p className="mt-3 text-slate-400">Submit karte hi WhatsApp khulega pre-filled message ke saath. Payment WhatsApp par arrange hoga. WhatsApp: {site.whatsappDisplay}</p>
      <form ref={formRef} onSubmit={submit} className="glass mt-7 grid gap-4 rounded-[2rem] p-6 md:grid-cols-2">
        <input name="name" required placeholder="Your name *" className={input}/><input name="country" placeholder="Country" className={input}/>
        <input name="phone" required placeholder="Phone / WhatsApp *" className={input}/><input name="email" type="email" placeholder="Email (optional)" className={input}/>
        <select value={pkg} onChange={e=>setPkg(e.target.value)} className={`${input} md:col-span-2 [&>option]:bg-slate-900`}>{packages.map(p=>(<option key={p.id} value={p.id}>{p.title} — {p.duration}</option>))}</select>
        <input name="date" type="date" required className={input}/><input name="travelers" type="number" min={1} defaultValue={2} className={input}/>
        <input name="pickup" placeholder="Pickup place (hotel / station)" className={`${input} md:col-span-2`}/>
        <textarea name="message" placeholder={trip.length?`My trip stops: ${trip.join(", ")}`:"Message"} className={`${input} md:col-span-2`} rows={3}/>
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden/>
        <button className="btn-amber rounded-full py-4 text-lg md:col-span-2">Confirm on WhatsApp →</button>
        <p className="text-xs text-slate-500 md:col-span-2">[Placeholder: cancellation & payment terms founder yahan daalenge.]</p>
      </form></section>

    <section id="faq" className="mx-auto max-w-4xl px-5 py-12"><h2 className="font-display text-3xl font-bold">FAQ</h2><div className="mt-6 space-y-3">{faqs.map(f=>(<details key={f.q} className="glass rounded-2xl p-5"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-slate-300">{f.a}</p></details>))}</div></section>
    <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-slate-400"><p className="font-display text-lg font-bold text-white">{site.brand}</p><p className="mt-2">Agra private tour with driver • Agra sunrise tour • Golden Triangle tour by car • Agra to Jaipur taxi with sightseeing</p><p className="mt-3">Credits: Cinematic 3D-view films made for this website (no stock footage used). Contact: {site.email} • {site.whatsappDisplay}</p><p className="mt-2">© 2026 [Placeholder Brand]. All placeholders in TODO.md</p></footer>
  </main>);
}

# Advanced 3D + AI + Animated Website Stack — READY

Ye wohi stack hai jo Bruno Simon, Lusion, Igloo, Awwwards SOTD sites use karte hain.
Saari libraries npm (GitHub repos se published) se install + verify ki gayi hain — 15 Nov 2026.

## 1. 3D Core (sabse important)
- **three** — mrdoob/three.js (~114k stars) — WebGL/WebGPU engine, TSL shaders isi me hai
- **@react-three/fiber (R3F)** — pmndrs/react-three-fiber (~31k) — Three.js ko React components me
- **@react-three/drei** — pmndrs/drei (~10k) — 100+ ready helpers: controls, Environment, Text, Float, Sparkles
- **@react-three/postprocessing + postprocessing** — pmndrs/postprocessing — Bloom, DOF, Vignette, Glitch
- **three-stdlib** — extra loaders/controls jo three examples se chahiye
- **maath** — pmndrs ki math/easing/geometry utilities, random points, buffer helpers
- **zustand** — pmndrs state (React re-render bina 3D state)
- **leva** — 3D scene ke live controls / debugging panel
- **lamina** — custom shader materials layering ke liye

## 2. Physics (Bruno Simon style drivable/interactive world ke liye)
- **@react-three/rapier + @dimforge/rapier3d-compat** — Rapier physics engine (Bruno yahi use karta hai)

## 3. Animation (Awwwards motion)
- **gsap + @gsap/react** — greensock/GSAP — ab 100% FREE, ScrollTrigger, SplitText, MorphSVG sab included
- **lenis** — darkroom.engineering — smooth scroll, GSAP ticker ke saath sync
- **motion + framer-motion** — motiondivision/motion — React layout/gesture/exit animations
- **animejs** — lightweight timeline (SVG/DOM)
- **@react-spring/three + @react-spring/web** — physics-based spring animations 3D + DOM dono ke liye
- **@barba/core** — page transitions (no hard cuts)
- **theatre + @theatre/core** — visual keyframe editor for 3D camera/object animation

## 4. Lightweight WebGL / 2D / Particles
- **ogl** — sabse halka WebGL library, shader heroes ke liye (Three se halka)
- **pixi.js + @pixi/react** — fast 2D WebGL particles/effects
- **@tsparticles/react + slim** — particle systems (stars, snow, confetti, network)
- **cobe** — chhota sa 3D globe (landing heroes me bahut use hota hai)
- **matter-js** — 2D physics (falling elements, interactive hero)

## 5. Design-tool 3D / Motion assets
- **@splinetool/react-spline + runtime** — Spline.design ke no-code 3D scenes direct site me
- **@rive-app/react-canvas** — Rive interactive animations (buttons, characters, loaders)
- **lottie-react** — After Effects Lottie animations

## 6. AI (website ke andar AI ke liye)
- **ai (Vercel AI SDK) + @ai-sdk/react + @ai-sdk/openai + @ai-sdk/google** — vercel/ai — streaming chat, generative UI, chatbot demo (SiteBot type)
- **openai** — official OpenAI SDK
- **@huggingface/transformers** — browser ke andar hi AI model (bina server): image/text models, voice

## 7. Foundation
- **next + react + react-dom** — framework (Next 16 + React 19)
- **tailwindcss v4 + @tailwindcss/postcss** — styling
- **lucide-react, clsx, tailwind-merge, class-variance-authority** — icons + class system

## Dev
- typescript, @types/three, @types/react, eslint

## Sach jo pehle bhi bola tha
Libraries install ho gayi = engine ready hai. $10k wali site ka 70% hissa custom 3D assets (Blender/Spline se GLTF models), art direction aur polish hota hai — woh code se banta hai, library se auto nahi banta. Ab jab bologe, isi project me pehli advanced demo site bana dunga.

## Chalana kaise hai
```bash
cd ~/workspace/advanced-3d-ai-stack
npm run dev
```

---
## UPDATE 15 Nov 2026 — 3D Travel Website BUILT (spec: 3D_Travel_Website_Build_Spec_for_Claude_Code.pdf)
Isi project me spec ke saare phases 1-6 bana diye:
- Hero: Golden Hour Drive 3D — glowing road, procedural car (head/tail lights), monument (dome+4 minarets), Stars/Sparkles, Bloom, scroll-driven camera on CatmullRomCurve3 + mouse parallax, loader, HTML text pehle dikhta hai, reduced-motion poster fallback
- Ride View: Car (1.2m, dashboard overlay, smooth) / Bike (1.5m, handlebar overlay, shake, zyada particles) toggle, 5 stops, drei Html hotspots, Add to My Trip
- Monument Viewer: procedural monument, OrbitControls + auto-rotate, 3 hotspots, Book preselect
- Sections: glass nav + Install App, trust strip, 5 packages, How it works, reviews placeholder, booking form -> WhatsApp wa.me + /api/lead (honeypot+rate-limit), FAQ, footer credits
- PWA: manifest.ts + public/sw.js + Install button (Android prompt / iPhone hint)
- SEO: server-rendered text, metadata, TravelAgency+TouristTrip JSON-LD
- VERIFIED: `npm run build` PASS (Next 16), tsc PASS, live smoke: / 200, manifest 200, /api/lead 200
- Placeholders: TODO.md me poori list (brand, WhatsApp number, prices, real photos/reviews, GLB model)

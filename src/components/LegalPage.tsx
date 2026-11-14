import { site } from "@/content/site";
export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (<main className="mx-auto max-w-3xl px-5 py-14">
    <a href="/" className="text-sm text-cyan-700">← {site.brand} — Home</a>
    <h1 className="font-display mt-6 text-4xl font-bold md:text-5xl">{title}</h1>
    <p className="mt-2 text-sm text-slate-500">Last updated: {updated} • {site.brand}</p>
    <div className="mt-8 space-y-7 leading-7 text-slate-700 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">{children}</div>
    <footer className="mt-14 border-t border-slate-900/10 pt-6 text-sm text-slate-500">
      <p>Questions? Contact us at {site.email} or WhatsApp {site.whatsappDisplay}.</p>
      <p className="mt-3 flex flex-wrap gap-x-5"><a className="underline underline-offset-4" href="/privacy">Privacy Policy</a><a className="underline underline-offset-4" href="/terms">Terms & Conditions</a><a className="underline underline-offset-4" href="/safety">Safety & Security</a></p>
    </footer>
  </main>);
}

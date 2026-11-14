import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
const display = Space_Grotesk({subsets:["latin"], variable:"--font-display"});
const body = Inter({subsets:["latin"], variable:"--font-body"});
export const metadata: Metadata = { title:"Agra Private Tour with Driver — Sunrise Tours & Golden Triangle by Car", description:"Private Agra tours with a local driver-guide host: Agra sunrise tour, full-day city tour, Agra to Jaipur taxi with sightseeing and Golden Triangle tour by car. Feel the journey in 3D before you book.", openGraph:{title:"Feel the Journey Before You Take It — Agra Private Tours", description:"3D ride views, monument viewer and private car tours in Agra with a local host.", type:"website"}, twitter:{card:"summary_large_image"} };
export default function RootLayout({children}:{children:React.ReactNode}){ return (<html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>); }

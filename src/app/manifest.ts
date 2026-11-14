import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name:"[PLACEHOLDER Brand] — Agra Private Tours", short_name:"Agra Tours", description:"Private Agra tours with a local driver-guide host. Feel the journey before you take it.", start_url:"/", display:"standalone", background_color:"#05060A", theme_color:"#05060A", icons:[{src:"/icons/icon-192.svg",sizes:"192x192",type:"image/svg+xml"},{src:"/icons/icon-512.svg",sizes:"512x512",type:"image/svg+xml"},{src:"/icons/icon-512.svg",sizes:"512x512",type:"image/svg+xml",purpose:"maskable"}] };
}

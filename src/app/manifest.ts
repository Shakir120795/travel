import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name:"xyz-travel.com — Agra Private Tours", short_name:"xyz-travel", description:"Private Agra tours with a local driver-guide host. Feel the journey before you take it.", start_url:"/", display:"standalone", background_color:"#FAF6EE", theme_color:"#FAF6EE", icons:[{src:"/icons/icon-192.svg",sizes:"192x192",type:"image/svg+xml"},{src:"/icons/icon-512.svg",sizes:"512x512",type:"image/svg+xml"},{src:"/icons/icon-512.svg",sizes:"512x512",type:"image/svg+xml",purpose:"maskable"}] };
}

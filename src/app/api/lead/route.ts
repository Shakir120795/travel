import { NextResponse } from "next/server";
const hits = new Map<string, number[]>();
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const now = Date.now(); const arr = (hits.get(ip)||[]).filter(t=>now-t<60000); if(arr.length>5) return NextResponse.json({error:"Too many requests"}, {status:429}); arr.push(now); hits.set(ip,arr);
  const body = await req.json().catch(()=>({}));
  if (body.company) return NextResponse.json({ok:true}); // honeypot
  if (!body.name || !body.phone || !body.packageId) return NextResponse.json({error:"Missing fields"}, {status:400});
  const webhook = process.env.LEAD_WEBHOOK_URL; const resendKey = process.env.RESEND_API_KEY;
  console.log("[LEAD]", JSON.stringify(body));
  if (webhook) { await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}).catch(()=>{}); }
  if (resendKey) { /* Resend forwarding founder ke email env se enable hoga */ }
  return NextResponse.json({ok:true});
}

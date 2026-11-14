"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { hotspots } from "@/content/site";
export default function MonumentScene({onBook}:{onBook:()=>void}){
  const mat={color:"#12203a",emissive:"#38E8FF",emissiveIntensity:0.16,roughness:0.32,metalness:0.65} as const;
  const amber={color:"#241704",emissive:"#FFB547",emissiveIntensity:0.6,roughness:0.35,metalness:0.4} as const;
  return (<Canvas dpr={[1,1.75]} camera={{position:[6,4,8],fov:48}} gl={{antialias:true}} aria-hidden>
    <color attach="background" args={["#05060A"]}/><ambientLight intensity={0.45}/><directionalLight position={[5,8,4]} intensity={1.2} color="#FFB547"/><pointLight position={[0,3,5]} intensity={22} color="#38E8FF" distance={18}/>
    <Sparkles count={90} scale={[11,6,11]} size={2.2} speed={0.2} color="#38E8FF"/>
    <group position={[0,-1.2,0]}>
      <mesh position={[0,0.3,0]}><boxGeometry args={[7.6,0.6,7.6]}/><meshStandardMaterial {...mat}/></mesh>
      <mesh position={[0,1.7,0]}><boxGeometry args={[4.6,2.2,4.6]}/><meshStandardMaterial {...mat}/></mesh>
      <mesh position={[0,3.75,0]}><sphereGeometry args={[2,40,20,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial {...amber}/></mesh>
      <mesh position={[0,6.15,0]}><cylinderGeometry args={[0.06,0.06,1.5]}/><meshBasicMaterial color="#FFB547"/></mesh>
      {[-3.6,3.6].map(x=>[-3.6,3.6].map(z=>(<group key={`${x}${z}`} position={[x,0,z]}><mesh position={[0,2.7,0]}><cylinderGeometry args={[0.3,0.4,5.4]}/><meshStandardMaterial {...mat}/></mesh><mesh position={[0,5.85,0]}><sphereGeometry args={[0.6,16,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial {...amber}/></mesh></group>)))}
      {hotspots.map(h=>(<Html key={h.title} position={[h.pos[0],h.pos[1],h.pos[2]]} center distanceFactor={10}><button onClick={onBook} title={`${h.desc} ${h.tip}`} style={{background:"rgba(56,232,255,.92)",color:"#04121a",borderRadius:999,padding:"5px 11px",fontWeight:800,fontSize:12,whiteSpace:"nowrap",cursor:"pointer"}}>● {h.title}</button></Html>))}
    </group>
    <OrbitControls autoRotate autoRotateSpeed={0.7} enablePan={false} minDistance={6} maxDistance={16} maxPolarAngle={Math.PI/2.05}/>
    <EffectComposer><Bloom intensity={0.65} luminanceThreshold={0.24} mipmapBlur/></EffectComposer>
  </Canvas>);
}

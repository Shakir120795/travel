"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

export const ROAD_CURVE = () => new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,0,14), new THREE.Vector3(-2,0,6), new THREE.Vector3(2,0,-2),
  new THREE.Vector3(-1.5,0,-10), new THREE.Vector3(0,0,-18),
]);

function Monument(){
  const mat = { color:"#0e1626", emissive:"#38E8FF", emissiveIntensity:0.18, roughness:0.35, metalness:0.6 } as const;
  const amber = { color:"#1a1206", emissive:"#FFB547", emissiveIntensity:0.55, roughness:0.4, metalness:0.4 } as const;
  return (<group position={[0,0,-24]}>
    <mesh position={[0,0.5,0]}><boxGeometry args={[7,1,7]}/><meshStandardMaterial {...mat}/></mesh>
    <mesh position={[0,2,0]}><boxGeometry args={[4.4,2,4.4]}/><meshStandardMaterial {...mat}/></mesh>
    <mesh position={[0,4.4,0]}><sphereGeometry args={[1.9,32,16,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial {...amber}/></mesh>
    <mesh position={[0,6.6,0]}><cylinderGeometry args={[0.06,0.06,1.4]}/><meshBasicMaterial color="#FFB547"/></mesh>
    {[-3.4,3.4].map(x=>[-3.4,3.4].map(z=>(<group key={`${x}${z}`} position={[x,0,z]}><mesh position={[0,2.6,0]}><cylinderGeometry args={[0.28,0.36,5.2]}/><meshStandardMaterial {...mat}/></mesh><mesh position={[0,5.6,0]}><sphereGeometry args={[0.55,16,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial {...amber}/></mesh></group>)))}
    <pointLight position={[0,3,4]} intensity={30} color="#FFB547" distance={22}/>
  </group>);
}
function Road(){
  const {geo,lineGeo} = useMemo(()=>{
    const curve = ROAD_CURVE(); const pts = curve.getPoints(80);
    const shape: THREE.Vector3[] = []; const linePts: THREE.Vector3[] = [];
    pts.forEach(p=>{ shape.push(p); linePts.push(new THREE.Vector3(p.x,p.y+0.06,p.z)); });
    const tube = new THREE.TubeGeometry(curve, 80, 0.06, 6, false);
    return { geo: tube, lineGeo: linePts };
  },[]);
  const curve = useMemo(()=>ROAD_CURVE(),[]);
  const roadGeo = useMemo(()=>{
    const pts = curve.getSpacedPoints(60); const verts:number[]=[]; const idx:number[]=[];
    pts.forEach((p,i)=>{ const t=curve.getTangent(i/60); const n=new THREE.Vector3(-t.z,0,t.x).normalize(); verts.push(p.x+n.x*1.6,0.02,p.z+n.z*1.6, p.x-n.x*1.6,0.02,p.z-n.z*1.6); if(i<60){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2);} });
    const g=new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(verts,3)); g.setIndex(idx); g.computeVertexNormals(); return g;
  },[curve]);
  return (<group>
    <mesh geometry={roadGeo}><meshStandardMaterial color="#0a1220" roughness={0.6} metalness={0.3} emissive="#38E8FF" emissiveIntensity={0.05}/></mesh>
    <mesh geometry={geo} position={[1.6,0,0]}><meshBasicMaterial color="#38E8FF"/></mesh>
    <mesh geometry={geo} position={[-1.6,0,0]}><meshBasicMaterial color="#38E8FF"/></mesh>
  </group>);
}
function Car(){
  const ref = useRef<THREE.Group>(null); const curve = useMemo(()=>ROAD_CURVE(),[]);
  useFrame(({clock})=>{
    const t = (clock.elapsedTime*0.028)%0.92; const p = curve.getPoint(t); const tan = curve.getTangent(t);
    if(ref.current){ ref.current.position.set(p.x,0.28,p.z); ref.current.rotation.y = Math.atan2(tan.x,tan.z); }
  });
  return (<group ref={ref}>
    <mesh position={[0,0.22,0]}><boxGeometry args={[1.15,0.42,2.1]}/><meshStandardMaterial color="#101c30" metalness={0.9} roughness={0.22} emissive="#7B5CFF" emissiveIntensity={0.12}/></mesh>
    <mesh position={[0,0.58,-0.1]}><boxGeometry args={[0.95,0.34,1.05]}/><meshStandardMaterial color="#9adfff" metalness={0.4} roughness={0.08} transparent opacity={0.65}/></mesh>
    {[[-0.58,0.62],[0.58,0.62],[-0.58,-0.62],[0.58,-0.62]].map(([x,z],i)=>(<mesh key={i} position={[x,0.05,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.19,0.19,0.12,16]}/><meshStandardMaterial color="#05060A" roughness={0.8}/></mesh>))}
    <mesh position={[-0.36,0.22,1.08]}><sphereGeometry args={[0.09,10,10]}/><meshBasicMaterial color="#FFF3B0"/></mesh>
    <mesh position={[0.36,0.22,1.08]}><sphereGeometry args={[0.09,10,10]}/><meshBasicMaterial color="#FFF3B0"/></mesh>
    <mesh position={[-0.36,0.26,-1.08]}><sphereGeometry args={[0.07,10,10]}/><meshBasicMaterial color="#FF3355"/></mesh>
    <mesh position={[0.36,0.26,-1.08]}><sphereGeometry args={[0.07,10,10]}/><meshBasicMaterial color="#FF3355"/></mesh>
    <pointLight position={[0,0.3,1.6]} intensity={8} color="#FFE9A8" distance={7}/>
  </group>);
}
function CameraRig(){
  const curve = useMemo(()=>ROAD_CURVE(),[]); const {camera, pointer} = useThree();
  useFrame(()=>{
    const hero = document.getElementById("hero"); const h = hero ? hero.offsetHeight : window.innerHeight;
    const prog = THREE.MathUtils.clamp(window.scrollY / Math.max(h,1), 0, 1);
    const t = prog*0.78; const p = curve.getPoint(t); const look = curve.getPoint(Math.min(t+0.14,1));
    camera.position.lerp(new THREE.Vector3(p.x + pointer.x*0.7, 1.55 + pointer.y*0.3, p.z+2.6), 0.06);
    camera.lookAt(look.x, 1.1, look.z);
  });
  return null;
}
export default function HeroScene(){
  return (<Canvas dpr={[1,1.75]} camera={{position:[0,1.6,16], fov:55}} gl={{antialias:true, powerPreference:"high-performance"}} aria-hidden>
    <color attach="background" args={["#05060A"]}/><fog attach="fog" args={["#05060A",10,34]}/>
    <ambientLight intensity={0.35}/><directionalLight position={[4,7,4]} intensity={1.1} color="#FFB547"/>
    <Stars radius={70} depth={30} count={2600} factor={3.2} fade speed={0.6}/>
    <Sparkles count={170} scale={[18,7,30]} position={[0,2,-8]} size={2.4} speed={0.22} color="#38E8FF" opacity={0.65}/>
    <Sparkles count={70} scale={[12,4,20]} position={[0,1.4,-12]} size={5} speed={0.12} color="#FFB547" opacity={0.4}/>
    <Road/><Car/><Float speed={0.7} floatIntensity={0.14}><Monument/></Float><CameraRig/>
    <EffectComposer><><Bloom intensity={0.75} luminanceThreshold={0.22} mipmapBlur/><Vignette darkness={0.62} offset={0.22}/></></EffectComposer>
  </Canvas>);
}

"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { stops } from "@/content/site";

function PathCam({mode, active}:{mode:"car"|"bike"; active:number}){
  const {camera} = useThree(); const curve = useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,10),new THREE.Vector3(-3,0,2),new THREE.Vector3(3,0,-5),new THREE.Vector3(-2,0,-12),new THREE.Vector3(0,0,-19)]),[]);
  useFrame(({clock})=>{
    const t = active/ (stops.length) + 0.06; const p = curve.getPoint(t); const look = curve.getPoint(Math.min(t+0.16,1));
    const shake = mode==="bike" ? Math.sin(clock.elapsedTime*22)*0.025 : 0;
    const h = mode==="bike" ? 1.5 : 1.2;
    camera.position.lerp(new THREE.Vector3(p.x, h+shake, p.z+1.6), 0.05); camera.lookAt(look.x, 1.15+shake, look.z);
  }); return null;
}
function SceneStops({onAdd}:{onAdd:(n:string)=>void}){
  const curve = useMemo(()=>new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,10),new THREE.Vector3(-3,0,2),new THREE.Vector3(3,0,-5),new THREE.Vector3(-2,0,-12),new THREE.Vector3(0,0,-19)]),[]);
  return (<>{stops.map((s,i)=>{ const p=curve.getPoint(i/stops.length+0.08); return (<group key={s.name} position={[p.x+1.9,0,p.z]}>
    <mesh position={[0,1.1,0]}><boxGeometry args={[0.9,2.2,0.9]}/><meshStandardMaterial color="#0e1626" emissive={i%2?"#FFB547":"#38E8FF"} emissiveIntensity={0.35} metalness={0.6} roughness={0.3}/></mesh>
    <Html position={[0,2.7,0]} center distanceFactor={11}><div style={{width:190,background:"rgba(5,10,18,.88)",border:"1px solid rgba(56,232,255,.45)",borderRadius:12,padding:"8px 10px",color:"#fff",fontSize:12,lineHeight:1.35}}><b>{s.name}</b><br/><span style={{opacity:.8}}>{s.desc}</span><br/><button onClick={()=>onAdd(s.name)} style={{marginTop:6,background:"#38E8FF",color:"#04121a",borderRadius:999,padding:"4px 10px",fontWeight:700}}>Add to My Trip</button></div></Html>
  </group>)})}</>);
}
export default function RideScene({mode, active, onAdd}:{mode:"car"|"bike"; active:number; onAdd:(n:string)=>void}){
  return (<Canvas dpr={[1,1.6]} camera={{position:[0,1.3,12],fov:58}} gl={{antialias:true}} aria-hidden>
    <color attach="background" args={["#05060A"]}/><fog attach="fog" args={["#05060A",8,30]}/>
    <ambientLight intensity={0.4}/><directionalLight position={[3,6,3]} intensity={1} color="#FFB547"/>
    <Stars radius={60} depth={20} count={1500} factor={3} fade/>
    <Sparkles count={mode==="bike"?180:80} scale={[16,5,26]} position={[0,1.6,-7]} size={2.2} speed={mode==="bike"?0.7:0.25} color="#38E8FF"/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-6]}><planeGeometry args={[26,38]}/><meshStandardMaterial color="#08101d" roughness={0.9}/></mesh>
    <SceneStops onAdd={onAdd}/><PathCam mode={mode} active={active}/>
    <EffectComposer><Bloom intensity={0.6} luminanceThreshold={0.25} mipmapBlur/></EffectComposer>
  </Canvas>);
}

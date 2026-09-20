"use client";
import {useEffect,useRef,useState} from "react";

type Props={inside:boolean;system:string|null;component:string|null;systems:any[];onEnter:()=>void;onSystem:(id:string)=>void;onComponent:(id:string)=>void;reset:number};
const POS:Record<string,[number,number,number]>={power:[-6,0,-3.4],cooling:[0,0,-3.4],controls:[6,0,-3.4],network:[-6,0,3.4],compute:[0,0,3.4],security:[6,0,3.4]};
const COLORS:Record<string,string>={power:'#ffc36e',cooling:'#6ad7ec',network:'#939dff',compute:'#82d9b1',controls:'#e8a1d5',security:'#f9997d'};
export default function Scene(props:Props){
 const host=useRef<HTMLDivElement>(null),labels=useRef<HTMLDivElement>(null),latest=useRef(props),api=useRef<any>(null);
 const [error,setError]=useState(false),[ready,setReady]=useState(false);latest.current=props;
 useEffect(()=>{let disposed=false;let cleanup=()=>{};
 async function init(){try{
 const T=await import('three');const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');if(disposed||!host.current)return;
 const el=host.current;const scene=new T.Scene();scene.background=null;
 let renderer:any;let software=false;try{renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.setClearColor(0,0)}catch{const {SVGRenderer}=await import('three/addons/renderers/SVGRenderer.js');renderer=new SVGRenderer();renderer.setQuality('high');renderer.setClearColor(new T.Color('#182833'),0);software=true}el.appendChild(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Interactive three-dimensional data center. Use the adjacent buttons to explore with a keyboard.');
 const camera=new T.PerspectiveCamera(37,1,.1,180);camera.position.set(27,25,30);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=7;controls.maxDistance= sixty();controls.maxPolarAngle=Math.PI*.46;controls.target.set(0,0,0);controls.enablePan=false;
 function sixty(){return 60}
 scene.add(new T.HemisphereLight(0xd5efff,0x425571,2.8));const sun=new T.DirectionalLight(0xffe0b2,3.8);sun.position.set(-12,27,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-25;sun.shadow.camera.right=25;sun.shadow.camera.top=25;sun.shadow.camera.bottom=-25;sun.shadow.normalBias=.035;scene.add(sun);
 const fill=new T.DirectionalLight(0x91d5ff,2);fill.position.set(15,10,-14);scene.add(fill);if(software){sun.intensity=.7;fill.intensity=.35;scene.add(new T.AmbientLight(0xc7dfeb,1.0))}
 function box(parent:any,w:number,h:number,d:number,x:number,y:number,z:number,color:string,metal=.15){const g=new T.BoxGeometry(w,h,d,Math.max(1,Math.ceil(w/2)),Math.max(1,Math.ceil(h/2)),Math.max(1,Math.ceil(d/2))),m=new T.MeshLambertMaterial({color});const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function cylinder(parent:any,r:number,h:number,x:number,y:number,z:number,color:string){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,12),new T.MeshLambertMaterial({color}));o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
 function line(parent:any,points:number[][],color:string){const g=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p as [number,number,number])));const o=new T.Line(g,new T.LineBasicMaterial({color,transparent:true,opacity:.7}));parent.add(o)}
 const site=new T.Group();scene.add(site);box(site,26,.4,19,0,-.45,0,'#273846');box(site,22,.35,15,0,-.12,0,'#6b7d87');
 const grid=new T.GridHelper(40,40,0x3d5364,0x2a3c4a);grid.position.y=-.66;scene.add(grid);grid.visible=!software;
 // Equipment is a simplified interactive model, not a vendor design or physical simulation.
 const insideGroup=new T.Group();site.add(insideGroup);const zones:Record<string,any>={};const equipment:Record<string,any[]>={};
 for(const [id,pos] of Object.entries(POS)){
 const zone=new T.Group();zone.position.set(...pos);zone.userData.system=id;insideGroup.add(zone);zones[id]=zone;
 box(zone,5.65,.12,6.1,0,.13,0,'#344858');line(zone,[[-2.8,.23,-3],[2.8,.23,-3],[2.8,.23,3],[-2.8,.23,3],[-2.8,.23,-3]],COLORS[id]);
 equipment[id]=[];
 for(let i=0;i<4;i++){
 const group=new T.Group();group.position.set(i%2===0?-1.4:1.4,.3,i<2?-1.45:1.45);group.userData={system:id,index:i};zone.add(group);equipment[id].push(group);
 const body=box(group,1.25,2,1.4,0,1,0,'#203342',.45);body.userData.part=true;
 const lid=box(group,1.38,.12,1.5,0,2.06,0,COLORS[id]);lid.userData.explode=0.8;
 if(id==='cooling'){
 body.scale.y=.65;body.position.y=.65;lid.position.y=1.38;lid.userData.baseY=1.38;
 for(let f=0;f<2;f++){cylinder(group,.4,.08,0,1.49,(f-.5)*.65,'#111f2b');const fan=box(group,.64,.03,.1,0,1.56,(f-.5)*.65,'#93afbd');fan.userData.fan=true;}
 for(let n=0;n<6;n++)box(group,1.12,.055,.04,0,.25+n*.14,.72,'#86aebf');
 const pipe=cylinder(group,.07,2.4,.8,.55,0,COLORS[id]);pipe.rotation.x=Math.PI/2;
 }else if(id==='power'){
 for(let n=0;n<3;n++){box(group,.9,.35,.08,0,.5+n*.55,.73,'#314858');box(group,.14,.14,.10,.24,.5+n*.55,.8,COLORS[id]);}
 box(group,.08,1.3,.08,-.47,1,.78,'#72899a');
 }else if(id==='controls'){
 box(group,.93,.56,.06,0,1.48,.74,'#7bced1');box(group,.76,.35,.08,0,1.48,.79,'#1a4c5b');
 for(let n=0;n<4;n++)box(group,.13,.2,.06,-.35+n*.23,.78,.76,n%2?'#ffbd6a':'#91bca8');
 }else{
 for(let n=0;n<7;n++){const slot=box(group,1.03,.16,.1,0,.35+n*.22,.76,'#456273');slot.userData.explode=n*.035;for(let k=0;k<3;k++)box(group,.04,.04,.035,-.34+k*.14,.35+n*.22,.82,k===0?COLORS[id]:'#b6d5dc');}
 }
 for(const child of group.children)child.userData.baseY??=child.position.y;
 }
 // A simple service path connects equipment within each functional zone.
 line(zone,[[-1.4,.29,-1.45],[1.4,.29,-1.45],[1.4,.29,1.45],[-1.4,.29,1.45]],COLORS[id]);
 }
 // Structural shell is only a navigation container, not a civil-engineering lesson.
 const shell=new T.Group();site.add(shell);
 box(shell,20.8,3.2,.22,0,1.7,-7.2,'#9daeb6');box(shell,.22,3.2,14.4,-10.3,1.7,0,'#acbac0');
 box(shell,20.8,3.2,.22,0,1.7,7.2,'#95a8b2');box(shell,.22,3.2,14.4,10.3,1.7,0,'#869dab');
 for(let k=0;k<12;k++){box(shell,1.22,.85,.07,-9+k*1.63,2,7.34,'#244758',.5);box(shell,.07,.85,.96,10.44,2,-5.7+k*1.04,'#294d60',.5);}
 box(shell,2.2,2.6,.12,4.3,1.38,7.36,'#284551');box(shell,.06,2.6,.17,4.3,1.38,7.44,'#bfd0d5');box(shell,3,.18,1.4,4.3,2.85,7.8,'#ffbc72');
 const roof=new T.Group();site.add(roof);box(roof,21.4,.4,15.1,0,3.48,0,'#b2c0c5');box(roof,20.7,.07,14.4,0,3.72,0,'#8298a4');
 for(let i=0;i<6;i++){box(roof,2.1,.6,1.5,-6+i%3*3.2,4.01,-3+Math.floor(i/3)*3,'#466171');for(let f=0;f<2;f++)cylinder(roof,.42,.09,-6+i%3*3.2+(f-.5)*.95,4.37,-3+Math.floor(i/3)*3,'#172d3b');}
 line(roof,[[-10.7,3.76,7.5],[10.7,3.76,7.5],[10.7,3.76,-7.5]],'#ffbd73');
 if(software){shell.traverse(o=>{o.renderOrder=80});roof.children.forEach((o,i)=>{o.renderOrder=100+i})}
 // Entry steps and exterior utility equipment establish the building scale.
 box(site,3.8,.15,1.5,4.3,.0,8.1,'#849aa5');for(let i=0;i<3;i++)box(site,1.4,1.1,1.5,-7+i*2,.56,-8.3,'#526e7d');
 let transition=true;let tween=0;let targetCamera=new T.Vector3(27,25,30),targetFocus=new T.Vector3(0,0,0);let prevInside=false;let prevSystem:string|null=null;let prevReset=-1;
 const ray=new T.Raycaster(),pointer=new T.Vector2();let down={x:0,y:0};
 function hit(e:PointerEvent){const r=renderer.domElement.getBoundingClientRect();pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(insideGroup.children,true)[0]}
 function resolve(obj:any){let o=obj;while(o&&!o.userData.system)o=o.parent;return o?.userData}
 const pd=(e:PointerEvent)=>{down={x:e.clientX,y:e.clientY}};
 const pu=(e:PointerEvent)=>{if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>7)return;const p=latest.current;if(!p.inside){p.onEnter();return}const h=hit(e);if(h){const data=resolve(h.object);if(!data)return;if(data.system!==p.system)p.onSystem(data.system);else if(data.index!==undefined){const c=p.systems.find(s=>s.id===data.system)?.components[data.index];if(c)p.onComponent(c.id)}}};
 const move=(e:PointerEvent)=>{renderer.domElement.style.cursor=latest.current.inside?(hit(e)?'pointer':'grab'):'pointer'};
 renderer.domElement.addEventListener('pointerdown',pd);renderer.domElement.addEventListener('pointerup',pu);renderer.domElement.addEventListener('pointermove',move);
 let dirty=true;let lastKey='';let modelFrames=0;controls.addEventListener('change',()=>{dirty=true});controls.addEventListener('start',()=>{transition=false});
 const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()});resize.observe(el);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame=0;let lastFrame=0;
 function animate(){if(disposed)return;frame=requestAnimationFrame(animate);const now=performance.now();if(software&&now-lastFrame<65)return;lastFrame=now;const p=latest.current;controls.update();const key=[p.inside,p.system,p.component,p.reset,p.systems.length].join('|');if(key!==lastKey){lastKey=key;dirty=true;modelFrames=35}const settling=Math.abs(tween-(p.inside?1:0))>.003;if(software&&!dirty&&!transition&&!settling&&modelFrames<=0)return;dirty=false;modelFrames--;
 if(p.inside!==prevInside||p.system!==prevSystem||p.reset!==prevReset){transition=true;prevInside=p.inside;prevSystem=p.system;prevReset=p.reset;const q=p.system?POS[p.system]:[0,0,0];targetFocus.set(q[0],p.system?.9:0,q[2]);const mobile=el.clientWidth<600;targetCamera.set(q[0]+(p.system?8:mobile?30:25),p.system?12:mobile?31:27,q[2]+(p.system?10:mobile?34:29));if(!p.inside)targetCamera.set(mobile?31:27,mobile?30:25,mobile?35:30);}
 if(transition){camera.position.lerp(targetCamera,reduced?1:software?.22:.065);controls.target.lerp(targetFocus,reduced?1:software?.22:.065);if(camera.position.distanceTo(targetCamera)<.04)transition=false}
 tween=T.MathUtils.lerp(tween,p.inside?1:0,reduced?1:software?.22:.07);roof.position.y=tween*9;roof.visible=tween<.98;shell.visible=tween<.8;insideGroup.visible=tween>.15;
 for(const [id,zone] of Object.entries(zones)){const muted=p.system&&p.system!==id;zone.traverse((o:any)=>{if(o.isMesh){o.material.transparent=!!muted;o.material.opacity=muted?.22:1}});equipment[id].forEach((g:any,i:number)=>{const selected=p.systems.find(s=>s.id===id)?.components[i]?.id===p.component;for(const child of g.children){const y=child.userData.baseY??child.position.y;child.position.y=T.MathUtils.lerp(child.position.y,y+(selected?(child.userData.explode||0):0),reduced?1:software?.25:.09);if(child.userData.fan&&!reduced&&!software)child.rotation.y+=.035}})}
 if(labels.current){for(const b of Array.from(labels.current.children) as HTMLElement[]){const id=b.dataset.system!,idx=b.dataset.index;const q=POS[id];if(!q)continue;const point=new T.Vector3(q[0],2.8,q[2]);if(idx!==undefined){const g=equipment[id][Number(idx)];point.set(q[0]+g.position.x,2.7,q[2]+g.position.z)}point.project(camera);b.style.left=((point.x+1)/2*el.clientWidth)+'px';b.style.top=((-point.y+1)/2*el.clientHeight)+'px';b.style.visibility=(point.z>1||point.x>1.05||point.x< -1.05||point.y>1.05||point.y< -1.05)?'hidden':'visible';}}
 controls.update();renderer.render(scene,camera);
 }
 api.current={};animate();setReady(true);
 cleanup=()=>{cancelAnimationFrame(frame);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',pd);renderer.domElement.removeEventListener('pointerup',pu);renderer.domElement.removeEventListener('pointermove',move);scene.traverse((o:any)=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose()}});renderer.dispose?.();renderer.domElement.remove()};
 }catch(e){console.error('3D view unavailable',e);if(!disposed)setError(true)}}init();return()=>{disposed=true;cleanup()};},[]);
 const sys=props.systems.find(s=>s.id===props.system);
 return <><div className="scene" ref={host}/>{!ready&&!error&&<div className="loading-cover">Preparing the building…</div>}{error&&<div className="fallback-scene"><div><h2>Explore by system</h2><p>The 3D view is unavailable in this browser. All lessons and equipment are available using the system buttons.</p></div></div>}{ready&&props.inside&&<div className="hotspots" ref={labels}>{sys?sys.components.map((c:any,i:number)=><button key={c.id} className="scene-label" data-system={sys.id} data-index={i} onClick={()=>props.onComponent(c.id)}>{String(i+1).padStart(2,'0')} · {c.title}</button>):props.systems.map((s:any)=><button key={s.id} className="scene-label" data-system={s.id} onClick={()=>props.onSystem(s.id)} style={{borderColor:COLORS[s.id]}}>{s.title}</button>)}</div>}</>;
}

import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,tag,cam,flash,vign} from './kit';
import WD from './w_bus_de.json'; import WE from './w_bus_en.json';
const L={
 de:{W:WD,dir:-1,city:'BERLIN',col:'#f6c90e',sol:'LÖSUNG',done:'NACH LINKS!',left:'LINKS',right:'RECHTS',other:'ANDERE SEITE',
  cards:{0:['KINDER: 3 SEK.','ERWACHSENE: ???'],1:['EIN BUS','IN BERLIN'],2:['LINKS ODER','RECHTS?'],3:['VORNE = HINTEN'],4:['WOHIN FÄHRT','DER BUS?'],10:['NACH','LINKS!'],11:['KEINE','EINZIGE TÜR'],12:['TÜREN SIND','AUF DER ANDEREN SEITE'],13:['DEUTSCHLAND:','TÜREN RECHTS'],14:['FRONT ZEIGT','NACH LINKS']}},
 en:{W:WE,dir:1,city:'LONDON',col:'#d62828',sol:'ANSWER',done:'TO THE RIGHT!',left:'LEFT',right:'RIGHT',other:'OTHER SIDE',
  cards:{0:['KIDS: 3 SECONDS','ADULTS: ???'],1:['A BUS','IN LONDON'],2:['LEFT OR','RIGHT?'],3:['FRONT = BACK'],4:['WHICH WAY IS','IT GOING?'],10:['TO THE','RIGHT!'],11:['NOT A','SINGLE DOOR'],12:['THE DOORS ARE','ON THE OTHER SIDE'],13:['UK: DOORS','ON THE LEFT'],14:['FRONT POINTS','RIGHT']}},
};
const busSvg=(col:string,doors:boolean,dd:boolean,t:number,moving:number)=>{const w=820,h=dd?560:360,x0=-w/2,y0=-h;
  const wheel=(x:number)=><g transform={`translate(${x} 0) rotate(${moving*t*400})`}><circle r={62} fill="#222" stroke={N} strokeWidth={8}/><circle r={28} fill="#bbb" stroke={N} strokeWidth={6}/><line x1={-26} y1={0} x2={26} y2={0} stroke={N} strokeWidth={6}/><line x1={0} y1={-26} x2={0} y2={26} stroke={N} strokeWidth={6}/></g>;
  return <g>
    <rect x={x0} y={y0} width={w} height={h-30} rx={50} fill={col} stroke={N} strokeWidth={10}/>
    {[0,1,2,3,4,5].map(i=><rect key={i} x={x0+40+i*125} y={y0+40} width={105} height={120} rx={14} fill="#bfe3ff" stroke={N} strokeWidth={7}/>)}
    {dd&&[0,1,2,3,4,5].map(i=><rect key={'u'+i} x={x0+40+i*125} y={y0+220} width={105} height={110} rx={14} fill="#bfe3ff" stroke={N} strokeWidth={7}/>)}
    <rect x={x0} y={-120} width={w} height={26} fill="#fff" opacity={.5}/>
    {doors&&[x0+120,x0+520].map((x,i)=><g key={'d'+i}><rect x={x} y={dd?y0+200:y0+30} width={150} height={dd?330:300} rx={10} fill="#9fd3f0" stroke={N} strokeWidth={8}/><line x1={x+75} y1={dd?y0+200:y0+30} x2={x+75} y2={-30} stroke={N} strokeWidth={6}/></g>)}
    {wheel(x0+170)}{wheel(x0+w-170)}
  </g>;};
const Bus:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(9),dd=lang==='en';
  const flip=t>=s(12)&&t<s(14)?1:0;const fu=t>=s(12)?cl((t-s(12))/.5):0;
  const sx=t>=s(12)&&t<s(12)+.5?Math.abs(Math.cos(fu*Math.PI)):1;
  const showDoors=t>=s(12)+.25&&t<s(14);
  const drive=t>=s(14)+.6?eio(cl((t-s(14)-.6)/2.4)):0;
  const bx=540+X.dir*drive*1100;
  return <AbsoluteFill style={{background:'#9ad1ff'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1250)}>
    <rect width={1080} height={1920} fill="#9ad1ff"/>
    {[[100,300],[600,220],[900,380]].map(([x,y],i)=><g key={i} transform={`translate(${x+Math.sin(t*.3+i)*20} ${y})`}><ellipse rx={110} ry={44} fill="#fff"/><ellipse cx={60} cy={-24} rx={70} ry={40} fill="#fff"/></g>)}
    {[[0,520,230,'#c97b63'],[250,600,200,'#e0b56a'],[470,480,250,'#8fb3a3'],[740,560,200,'#d4a5a5'],[950,620,160,'#b8a1d9']].map(([x,y,w,c],i)=><g key={'h'+i}><rect x={x as number} y={y as number} width={w as number} height={1300-(y as number)} fill={c as string} stroke={N} strokeWidth={8}/>{[0,1,2,3].map(r=>[0,1].map(cc=><rect key={r+'-'+cc} x={(x as number)+30+cc*((w as number)/2-10)} y={(y as number)+40+r*150} width={((w as number)/2)-50} height={90} rx={8} fill="#fff3c4" stroke={N} strokeWidth={5}/>))}</g>)}
    {lang==='en'&&<g transform="translate(860 470)"><rect x={-26} y={-260} width={52} height={360} fill="#d9c08a" stroke={N} strokeWidth={6}/><circle cy={-200} r={40} fill="#fff" stroke={N} strokeWidth={6}/><path d="M-36 -260 L0 -330 L36 -260Z" fill="#7a6a4a" stroke={N} strokeWidth={6}/></g>}
    {lang==='de'&&<g transform="translate(860 470)"><rect x={-60} y={-200} width={120} height={300} fill="#d9c08a" stroke={N} strokeWidth={6}/><rect x={-100} y={-240} width={200} height={50} fill="#bfa36a" stroke={N} strokeWidth={6}/>{[-40,0,40].map(x=><rect key={x} x={x-12} y={-150} width={24} height={240} fill="#bfa36a" stroke={N} strokeWidth={4}/>)}</g>}
    <rect y={1300} width={1080} height={70} fill="#cfcfcf" stroke={N} strokeWidth={6}/>
    <rect y={1370} width={1080} height={550} fill="#4a4e5a"/>
    {[...Array(6)].map((_,i)=><rect key={i} x={i*200+20} y={1640} width={110} height={18} fill="#fff" opacity={.8}/>)}
    <g transform={`translate(${bx} 1600) scale(${sx*1.22} 1.22)`}>{busSvg(X.col,showDoors,dd,t,drive>0?X.dir:0)}</g>
    {t>=s(1)&&t<s(4)&&tag(540,1820,X.city,'#fff',N,48)}
    </g>
    {t>=s(4)&&t<s(10)&&<g>
      <g transform={`translate(160 1000) scale(${.9+.05*Math.sin(t*4)})`}><path d="M60 -50 L-40 -50 L-40 -90 L-120 0 L-40 90 L-40 50 L60 50Z" fill="#fff" stroke={N} strokeWidth={8}/></g>
      <g transform={`translate(920 1000) scale(${.9+.05*Math.sin(t*4+1)})`}><path d="M-60 -50 L40 -50 L40 -90 L120 0 L40 90 L40 50 L-60 50Z" fill="#fff" stroke={N} strokeWidth={8}/></g>
      {qb(t,540,1000)}</g>}
    {t>=s(11)&&t<s(12)&&<g transform={`translate(540 1380) scale(${PB(t,s(11),.3)})`}><circle r={70} fill={R} stroke={N} strokeWidth={8}/><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#fff" strokeWidth={16} strokeLinecap="round"/></g>}
    {showDoors&&tag(540,1800,X.other,Y,N,60)}
    {t>=s(10)&&t<s(14)+.6&&<g transform={`translate(540 1000) scale(${-X.dir} 1) scale(${PB(t,s(10),.35)})`}><path d="M200 -60 L-60 -60 L-60 -120 L-220 0 L-60 120 L-60 60 L200 60Z" fill={G} stroke={N} strokeWidth={10}/></g>}
    {vign}
    {cards(t,S,X.cards,[4])}
    {countdown(t,S,[6,7,8])}
    {stamp(t,sol,1.0,X.sol)}
    {stamp(t,e(14)+.2,2.4,X.done,700,100)}
    {flash(t,s(10))}
   </svg>
  </AbsoluteFill>;
};
export const BusDE:React.FC=()=><Bus lang="de"/>;
export const BusEN:React.FC=()=><Bus lang="en"/>;

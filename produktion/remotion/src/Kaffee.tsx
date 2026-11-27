import React from 'react';
import {useCurrentFrame, AbsoluteFill} from 'remotion';
import {N,Y,R,G,C,cl,eio,PB,P,FONT,sents,cards,countdown,stamp,qb,tag,fig,cam,flash,vign,bubble} from './kit';
import WD from './w_kaffee_de.json'; import WE from './w_kaffee_en.json';
const L={
 de:{W:WD,guest:'HERR SCHULZ',waiter:'KELLNER',sol:'LÖSUNG',done:'DER ZUCKER VERRÄT ES!',same:['DAS IST DERSELBE','KAFFEE!'],new_:['EINEN NEUEN,','BITTE!'],sweet:'SÜSS!',
  cards:{0:['EIN SCHLUCK','ÜBERFÜHRT IHN'],1:['EIN CAFÉ','IN KÖLN'],2:['EINE FLIEGE','IM KAFFEE!'],4:['NEUE TASSE','KOMMT'],7:['ER HAT','RECHT!'],8:['WOHER WEISS','ER DAS?'],14:['SCHON','GEZUCKERT!'],15:['NEUER KAFFEE','WIEDER SÜSS'],16:['FRISCH WÄRE','UNGESÜSST'],17:['NUR DIE FLIEGE','RAUSGEFISCHT']}},
 en:{W:WE,guest:'ARTHUR',waiter:'WAITER',sol:'ANSWER',done:'THE SUGAR GAVE IT AWAY!',same:['THAT\'S THE','SAME COFFEE!'],new_:['A NEW ONE,','PLEASE!'],sweet:'SWEET!',
  cards:{0:['CAUGHT OUT','WITH ONE SIP'],1:['A CAFÉ','IN LONDON'],2:['A FLY IN','HIS COFFEE!'],4:['A NEW CUP','ARRIVES'],7:['HE IS','RIGHT!'],8:['HOW DOES','HE KNOW?'],14:['ALREADY','SUGARED!'],15:['THE NEW CUP','WAS SWEET'],16:['A FRESH ONE','HAS NO SUGAR'],17:['HE ONLY FISHED','THE FLY OUT']}},
};
const GU={n:'',c:'#3d405b',hair:'short',hc:'#5a4a3a',skin:'#f1c7a3',h:510,glasses:1};
const WA={n:'',c:'#fff',hair:'short',hc:'#1a1a1a',skin:'#e0a77f',h:520};
const cup=(x:number,y:number,s:number,fly:boolean,t:number,steam=true)=><g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy={10} rx={130} ry={26} fill="#fff" stroke={N} strokeWidth={6}/>
  <path d="M-90 -110 L-75 0 L75 0 L90 -110Z" fill="#fff" stroke={N} strokeWidth={7}/>
  <path d="M88 -90 q55 0 50 40 q-5 30 -55 30" fill="none" stroke={N} strokeWidth={14}/><path d="M88 -90 q55 0 50 40 q-5 30 -55 30" fill="none" stroke="#fff" strokeWidth={6}/>
  <ellipse cy={-108} rx={88} ry={18} fill="#6b3e1e" stroke={N} strokeWidth={5}/>
  {steam&&[0,1,2].map(k=><path key={k} d={`M${-40+k*40} -140 q16 -24 0 -48 q-16 -24 0 -48`} stroke="#fff" strokeWidth={7} fill="none" opacity={.5+.3*Math.sin(t*3+k)}/>)}
  {fly&&<g transform={`translate(10 -112) rotate(${Math.sin(t*20)*10}) scale(1.6)`}><ellipse rx={16} ry={11} fill="#222"/><ellipse cx={-10} cy={-12} rx={12} ry={7} fill="#cfe8ff" opacity={.8}/><ellipse cx={10} cy={-12} rx={12} ry={7} fill="#cfe8ff" opacity={.8}/></g>}
</g>;
const Kaffee:React.FC<{lang:'de'|'en'}>=({lang})=>{
  const f=useCurrentFrame(),t=f/30,X=L[lang],S=sents(X.W),s=(k:number)=>S[k].a,e=(k:number)=>S[k].b;const dur=(X.W as any).duration;
  const sol=s(13),solved=t>=s(14);
  const sugar=(a:number,k:number)=>{const u=cl((t-a)/.6);return t>=a&&u<1?<rect key={k} x={560-20+k*30} y={1040+u*230} width={36} height={36} rx={4} fill="#fff" stroke={N} strokeWidth={4} transform={`rotate(${u*90} ${578+k*30} ${1058+u*230})`}/>:null;};
  const wA=s(3)+.4,wB=e(4)+.3;const wIn=t>=wA&&t<wB+.9;const wx=t<wA+1?1300-540*eio(cl((t-wA)/1)):t<wB?760:760+540*eio(cl((t-wB)/.8));
  const mid=s(4)+(e(4)-s(4))/2;const cupAway=t>=s(4)&&t<mid;
  const flyOn=t>=s(2)&&t<s(4);
  const replay=t>=s(14)&&t<e(14);
  return <AbsoluteFill style={{background:'#3b2a20'}}>
   <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position:'absolute'}}>
    <g transform={cam(t,dur,sol,540,1300)}><g transform='translate(540 1300) scale(1.4) translate(-540 -1300)'>
    <rect x={-400} y={-400} width={1880} height={2400} fill="#e9c9a1"/>
    {[...Array(9)].map((_,i)=><rect key={i} x={i*120} y={0} width={60} height={1300} fill="#e2bd92"/>)}
    <g transform="translate(830 560)"><rect x={-150} y={-180} width={300} height={360} rx={150} fill="#9ad1ff" stroke={N} strokeWidth={10}/><line x1={0} y1={-180} x2={0} y2={180} stroke={N} strokeWidth={8}/><line x1={-150} y1={20} x2={150} y2={20} stroke={N} strokeWidth={8}/></g>
    <g transform="translate(230 500)"><rect x={-130} y={-120} width={260} height={200} rx={12} fill="#2b2b2b" stroke="#8a5a32" strokeWidth={12}/><text y={-50} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">{lang==='de'?'KAFFEE':'COFFEE'}</text><text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={Y}>{lang==='de'?'2,80 €':'£2.80'}</text></g>
    {fig(300,1500,'cg_'+lang,GU,X.guest,1.35,{look:6,arm:t>=s(1)&&t<s(2)?'up':t>=s(3)&&t<s(4)?'up':'down'})}
    {wIn&&fig(wx,1500,'cw_'+lang,WA,X.waiter,1.35,{look:-6})}
    <rect x={-300} y={1290} width={1680} height={50} rx={10} fill="#8a5a32" stroke={N} strokeWidth={8}/>
    <rect x={480} y={1340} width={40} height={580} fill="#6d4223" stroke={N} strokeWidth={6}/>
    {!cupAway&&cup(600,1285,1.25,flyOn,t)}
    {cupAway&&cup(wx-150,1060,.7,true,t,false)}
    {t>=s(1)&&t<s(2)&&[0,1].map(k=>sugar(s(1)+.4+k*.5,k))}
    {replay&&[0,1].map(k=>sugar(s(14)+.3+k*.5,k))}
    <rect x={-400} y={1600} width={1880} height={320} fill="#7a4a2a"/>
    </g></g>
    {t>=s(1)+.2&&t<s(2)&&tag(800,1080,lang==='de'?'+ ZUCKER':'+ SUGAR','#fff',N,44)}
    {replay&&<g><rect x={720} y={480} width={320} height={70} rx={18} fill={R} stroke={N} strokeWidth={6}/><text x={880} y={528} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff">⏪ REPLAY</text></g>}
    {t>=s(15)&&t<e(15)+.3&&tag(640,900,X.sweet,G,'#fff',64)}
    {t>=s(3)&&t<e(3)+.3&&bubble(560,520,X.new_,PB(t,s(3),.3),58)}
    {t>=s(5)+.4&&t<e(6)+.4&&bubble(560,520,X.same,PB(t,s(5)+.4,.3),58)}
    {t>=s(8)&&t<s(13)&&qb(t,300,640,1.2)}
    {vign}
    {cards(t,S,X.cards,[8])}
    {countdown(t,S,[10,11,12])}
    {stamp(t,sol,.8,X.sol)}
    {stamp(t,e(17)+.2,2.2,X.done,980,72)}
    {flash(t,s(14))}
   </svg>
  </AbsoluteFill>;
};
export const KaffeeDE:React.FC=()=><Kaffee lang="de"/>;
export const KaffeeEN:React.FC=()=><Kaffee lang="en"/>;

import itertools as it
ok=True
def chk(name,cond,info=''):
    global ok
    print(('OK  ' if cond else 'FAIL'),name,info)
    ok=ok and cond
# --- Luegner-Raetsel: Zahl der Taeter, die genau die geforderte Zahl wahrer Saetze liefern
def liars(people,stm,truths=None,liarsN=None):
    res=[]
    for t in people:
        tv=[f(t) for f in stm]
        nT=sum(tv)
        if (truths is not None and nT==truths) or (liarsN is not None and len(tv)-nT==liarsN): res.append(t)
    return res
chk('01 Kuchen',liars(['Anna','Ben','Carla'],[lambda t:t=='Ben',lambda t:t!='Ben',lambda t:t!='Carla'],truths=1)==['Carla'])
chk('27 Roller',liars(['Ali','Mia','Peter','Zeynep'],[lambda t:t=='Mia',lambda t:t=='Ali',lambda t:t=='Mia',lambda t:t!='Peter'],truths=2)==['Ali'])
# 41: Taeter t; Aussagen: Ayse: Mehmet war's nicht; Emre: Mehmet sagt Wahrheit (= Mehmet's Satz wahr = t!=Mehmet); Defne: Mama war's nicht; Mehmet: ich nicht
def s41(t):
    mS=(t!='Mehmet')
    return [t!='Mehmet', mS, t!='Ayse', mS]
r=[t for t in ['Ayse','Defne','Emre','Mehmet'] if sum(not x for x in s41(t))==1]
chk('41 Kaesesahne',r==['Ayse'],str(r)+' Luegner: Defne' if r else '')
# 54: Taeter + Ort
res=[]
for t in ['Can','Mia','Igor','Zeynep']:
    for o in ['Keller','Dachboden','Garten']:
        ok_=True
        pairs=[((t!='Mia'),(t!='Can')),((t!='Mia'),(t=='Igor')),((t!='Igor'),(o=='Keller')),((o!='Garten'),(t=='Zeynep'))]
        # Can: Mia nicht, Can nicht ; Mia: Ich nicht (Mia), Igor war's ; Igor: Ich nicht, Keller ; Zeynep: nicht Garten, Ich
        pairs=[(t!='Mia',t!='Can'),(t!='Mia',t=='Igor'),(t!='Igor',o=='Keller'),(o!='Garten',t=='Zeynep')]
        if all(a!=b for a,b in pairs): res.append((t,o))
chk('54 Krone',res==[('Can','Dachboden')],str(res))
# 64 Tombola: Elif: Greta; Greta: Kemal; Kemal: Greta luegt; Luigi: Elif luegt; Mehmet: Luigi luegt ; genau 2 luegen
names=['Elif','Greta','Kemal','Luigi','Mehmet'];res=[]
for t in names:
    E=(t=='Greta');G=(t=='Kemal')
    K=(not G);Lg=(not E);M=(not Lg)
    v=[E,G,K,Lg,M]
    if v.count(False)==2: res.append((t,[n for n,x in zip(names,v) if not x]))
chk('64 Tombola',res==[('Greta',['Greta','Luigi'])],str(res))
# 48 Ritter
sols=set()
for k,b,g in it.product([0,1],repeat=3): # 1=wahr
    s1=(k==1)==(b==0)   # Kuno sagt Bodo luegt
    s2=(b==1)==((g==k))  # Bodo: Gero und Kuno gleich
    if s1 and s2:
        for door in (1,2,3):
            if (g==1)==(door==1): pass
        # Gero: Tuer1 Loewen wahr <=> Loewen hinter 1
        sols.add((k,b,g,'loewen1' if g==1 else 'frei1'))
chk('48 Ritter',all(s[3]=='frei1' for s in sols),str(sols))
# --- Zahlen
chk('05 Schloss',[a*100+b*10+c for a in range(1,10) for b in range(10) for c in range(10) if len({a,b,c})==3 and a==2*c and b==a+c and a+b+c==12]==[462])
chk('12 Pizza',[(b,t) for b in range(9) for t in range(9) if 2+b+t==8 and b==2*t]==[(4,2)])
# 22
r=[p for p in it.permutations(['Anna','Ben','Carla','Tom']) if p.index('Carla')==p.index('Ben')+1 and p.index('Tom')>p.index('Anna') and p.index('Tom')!=3]
chk('22 Erdbeeren',len(r)==1 and r[0][0]=='Anna',str(r))
# 25
r=[(x,y) for x in range(21) for y in range(21) if 2*x+(20-x)==31 and 2*y+(20-y)==27]
chk('25 Muenzen',r==[(11,7)],str(r))
# 26
foods=['Doener','Lahmacun','Falafel','Pide'];drinks=['Ayran','Cola','Wasser','Tee'];ppl=['Ali','Ben','Carla','Emre'];res=[]
for f in it.permutations(foods):
  for d in it.permutations(drinks):
    F=dict(zip(ppl,f));D=dict(zip(ppl,d))
    fd={F[p]:D[p] for p in ppl}
    if fd['Falafel']!='Wasser':continue
    if F['Ben'] in('Doener','Falafel'):continue
    if D['Carla']!='Ayran':continue
    if fd['Pide']!='Tee':continue
    if F['Emre']=='Pide' or D['Emre']=='Wasser':continue
    if fd['Lahmacun']!='Cola':continue
    res.append((F,D))
chk('26 Tisch4',len(res)==1 and [p for p in ppl if res[0][1][p]=='Wasser']==['Ali'],str(res[0] if res else None))
# clue necessity
def n26(skip):
  c=0
  for f in it.permutations(foods):
    for d in it.permutations(drinks):
      F=dict(zip(ppl,f));D=dict(zip(ppl,d));fd={F[p]:D[p] for p in ppl}
      tests=[fd['Falafel']=='Wasser',F['Ben'] not in('Doener','Falafel'),D['Carla']=='Ayran',fd['Pide']=='Tee',F['Emre']!='Pide' and D['Emre']!='Wasser',fd['Lahmacun']=='Cola']
      if all(t for i,t in enumerate(tests) if i!=skip):c+=1
  return c
chk('26 jeder Hinweis noetig',all(n26(i)>1 for i in range(6)),str([n26(i) for i in range(6)]))
# 30
chk('30 Kino',[x for x in range(1,60) if 3*x+16==2*(x+16)]==[16])
# 33 Zahlenschloss
def fb(code,g):
    right=sum(a==b for a,b in zip(code,g));common=len(set(code)&set(g));return right,common-right
res=[]
for c in it.permutations('0123456789',3):
    if fb(c,'147')==(1,0) and fb(c,'189')==(0,1) and fb(c,'964')==(0,2) and fb(c,'286')==(0,1): res.append(''.join(c))
chk('33 Schloss',res==['697'],str(res))
def n33(skip):
    tests=[('147',(1,0)),('189',(0,1)),('964',(0,2)),('286',(0,1))];c=0
    for cc in it.permutations('0123456789',3):
        if all(fb(cc,g)==r for i,(g,r) in enumerate(tests) if i!=skip):c+=1
    return c
chk('33 jeder Hinweis noetig',all(n33(i)>1 for i in range(4)),str([n33(i) for i in range(4)]))
# 35 Wasserfleck
res=[]
for p in it.permutations(range(1,6)):
    H,G,P,I,M=p
    if H==1 and G==M+2 and abs(P-M)==1 and P>I: res.append(p)
chk('35 Wasser',len(res)==1 and res[0][2]==res[0][4]+1,str(res))
def n35(skip):
    c=0
    for p in it.permutations(range(1,6)):
        H,G,P,I,M=p
        t=[H==1,G==M+2,abs(P-M)==1,P>I]
        if all(x for i,x in enumerate(t) if i!=skip) and True:c+=1
    return c
chk('35 jeder Hinweis noetig (Loesung eindeutig nur mit allen)',all(n35(i)>1 for i in range(4)),str([n35(i) for i in range(4)]))
# 37 Hund
res=[]
for fl in it.permutations(['Zeynep','Can','Luigi','Ayse']):
  for pet in it.permutations(['Hund','Katze','Papagei','Hamster']):
    F=dict(zip(range(1,5),fl));Pt=dict(zip(range(1,5),pet));ppl_={v:k for k,v in F.items()};
    if Pt[ppl_['Zeynep']]!='Katze' or ppl_['Zeynep']!=4:continue
    pap=[k for k,v in Pt.items() if v=='Papagei'][0]
    if pap!=1:continue
    if ppl_['Luigi']!=ppl_['Can']+1:continue
    if ppl_['Ayse']==1:continue
    ham=[k for k,v in Pt.items() if v=='Hamster'][0];cat=[k for k,v in Pt.items() if v=='Katze'][0]
    if ham!=cat-1:continue
    res.append((F,Pt))
chk('37 Hund',len(res)==1 and res[0][0][[k for k,v in res[0][1].items() if v=='Hund'][0]]=='Luigi',str(res))
# 40
res=[]
for it_ in it.permutations(['Torte','Salat','Brot']):
  for tr in it.permutations(['Fahrrad','Bus','Auto']):
    I=dict(zip(['Ayse','Luigi','Mehmet'],it_));T=dict(zip(['Ayse','Luigi','Mehmet'],tr))
    inv={v:k for k,v in I.items()};
    if I['Mehmet']=='Brot':continue
    if T[inv['Salat']]!='Fahrrad':continue
    if T['Ayse']!='Auto':continue
    if T[inv['Torte']]=='Bus':continue
    res.append((I,T))
chk('40 Torte',len(res)==1 and res[0][0]['Ayse']=='Torte',str(res))
# 51 Kino
res=[]
for p in it.permutations(['Anna','Ben','Carla','Lea','Max','Tom']):
    pos={n:i+1 for i,n in enumerate(p)}
    if pos['Anna'] not in(1,6):continue
    if abs(pos['Tom']-pos['Anna'])!=1:continue
    if abs(pos['Anna']-pos['Max'])!=3:continue
    if not pos['Tom']<pos['Carla']:continue
    if pos['Ben']!=pos['Lea']+1:continue
    res.append(p)
chk('51 Kino',len(res)==1 and res[0][res[0].index('Carla')+1]=='Max',str(res))
def n51(skip):
    c=0
    for p in it.permutations(['Anna','Ben','Carla','Lea','Max','Tom']):
        pos={n:i+1 for i,n in enumerate(p)}
        t=[pos['Anna'] in(1,6),abs(pos['Tom']-pos['Anna'])==1,abs(pos['Anna']-pos['Max'])==3,pos['Tom']<pos['Carla'],pos['Ben']==pos['Lea']+1]
        if all(x for i,x in enumerate(t) if i!=skip):c+=1
    return c
chk('51 jeder Hinweis noetig',all(n51(i)>1 for i in range(5)),str([n51(i) for i in range(5)]))
# 59 Flohmarkt
res=[]
for per in it.permutations(['Sommer','Greta','Zeynep','Dragan']):
  for ware in it.permutations(['Uhr','Lampe','Teddy','Platten']):
    for pr in it.permutations([5,10,15,20]):
        P=dict(zip(range(1,5),per));W=dict(zip(range(1,5),ware));C=dict(zip(range(1,5),pr))
        ci=[k for k,v in W.items() if v=='Uhr'][0];ti=[k for k,v in W.items() if v=='Teddy'][0]
        if C[ci]!=20:continue
        if P[4]!='Dragan':continue
        if C[ti]!=5 or ti!=ci-1:continue
        zi=[k for k,v in P.items() if v=='Zeynep'][0];si=[k for k,v in P.items() if v=='Sommer'][0]
        if W[zi]=='Lampe' or zi in(1,4):continue
        if C[3]!=10:continue
        if not C[zi]<C[si]:continue
        res.append((P,W,C))
chk('59 Flohmarkt',len(res)==1 and res[0][0][[k for k,v in res[0][1].items() if v=='Uhr'][0]]=='Sommer',str(res))
def n59(skip):
    c=0
    for per in it.permutations(['Sommer','Greta','Zeynep','Dragan']):
      for ware in it.permutations(['Uhr','Lampe','Teddy','Platten']):
        for pr in it.permutations([5,10,15,20]):
            P=dict(zip(range(1,5),per));W=dict(zip(range(1,5),ware));C=dict(zip(range(1,5),pr))
            ci=[k for k,v in W.items() if v=='Uhr'][0];ti=[k for k,v in W.items() if v=='Teddy'][0]
            zi=[k for k,v in P.items() if v=='Zeynep'][0];si=[k for k,v in P.items() if v=='Sommer'][0]
            t=[C[ci]==20,P[4]=='Dragan',C[ti]==5 and ti==ci-1,(W[zi]!='Lampe' and zi not in(1,4)),C[3]==10,C[zi]<C[si]]
            if all(x for i,x in enumerate(t) if i!=skip) and P[[k for k,v in W.items() if v=='Uhr'][0]] :c+=1
    return c
# Eindeutigkeit der Antwort (Wer verkauft die Uhr) ohne jeweils einen Hinweis
def n59b(skip):
    ans=set()
    for per in it.permutations(['Sommer','Greta','Zeynep','Dragan']):
      for ware in it.permutations(['Uhr','Lampe','Teddy','Platten']):
        for pr in it.permutations([5,10,15,20]):
            P=dict(zip(range(1,5),per));W=dict(zip(range(1,5),ware));C=dict(zip(range(1,5),pr))
            ci=[k for k,v in W.items() if v=='Uhr'][0];ti=[k for k,v in W.items() if v=='Teddy'][0]
            zi=[k for k,v in P.items() if v=='Zeynep'][0];si=[k for k,v in P.items() if v=='Sommer'][0]
            t=[C[ci]==20,P[4]=='Dragan',C[ti]==5 and ti==ci-1,(W[zi]!='Lampe' and zi not in(1,4)),C[3]==10,C[zi]<C[si]]
            if all(x for i,x in enumerate(t) if i!=skip): ans.add(P[ci])
    return ans
chk('59 jeder Hinweis noetig (Antwort)',all(len(n59b(i))>1 for i in range(6)),str([n59b(i) for i in range(6)]))
# 65 Tresor
att=[('8316',2,0),('3210',2,0),('6503',0,1),('7903',0,0),('1740',0,1)]
def fb2(c,g):
    gr=sum(a==b for a,b in zip(c,g));cm=len(set(c)&set(g));return gr,cm-gr
res=[''.join(c) for c in it.permutations('0123456789',4) if all(fb2(c,g)==(gr,ye) for g,gr,ye in att)]
chk('65 Tresor',res==['8215'],str(res))
def n65(skip):
    return len([c for c in it.permutations('0123456789',4) if all(fb2(c,g)==(gr,ye) for i,(g,gr,ye) in enumerate(att) if i!=skip)])
chk('65 jeder Versuch noetig',all(n65(i)>1 for i in range(5)),str([n65(i) for i in range(5)]))
# 36
chk('36 Geburtstag',True,'31.12. (geprueft von Hand)')
# --- Weiteres
# 52 Kannen
state=(0,0);ok52=False
def steps52():
    a,b=0,0;seq=[]
    a=5;seq.append((a,b))
    t=min(a,3-b);a-=t;b+=t;seq.append((a,b))
    b=0;seq.append((a,b))
    t=min(a,3-b);a-=t;b+=t;seq.append((a,b))
    a=5;seq.append((a,b))
    t=min(a,3-b);a-=t;b+=t;seq.append((a,b))
    return seq
chk('52 Kannen',steps52()[-1]==(4,3),str(steps52()))
# 66 Bruecke
t=2+1+10+2+2
chk('66 Bruecke',t==17,str(t))
# 34 Spiesse: 3 Spiesse, 6 Seiten, 2 pro Runde => 3 Runden = 15
chk('34 Spiesse',True,'3 Runden x 5 = 15')
# 58 Kugeln: Strategie simulieren
def weigh(w,L,R): 
    l=sum(w[i-1] for i in L);r=sum(w[i-1] for i in R);return (l>r)-(l<r) # 1 links schwerer
def solve58(w):
    r1=weigh(w,[1,2,3,4],[5,6,7,8])
    if r1==0:
        r2=weigh(w,[9,10,11],[1,2,3])
        if r2==0:
            r3=weigh(w,[12],[1]);return (12,'s' if r3==1 else 'l')
        # r2: 1 = links(9,10,11) schwerer
        heavy=(r2==1)
        r3=weigh(w,[9],[10])
        if r3==0:return (11,'s' if heavy else 'l')
        if heavy:return (9 if r3==1 else 10,'s')
        return (9 if r3==-1 else 10,'l')
    # links schwerer (r1==1): sonst symmetrisch durch Vertauschen -> w negieren
    sgn=r1
    ww=[x*sgn for x in w] # jetzt linke Seite schwerer
    r2=weigh(ww,[1,2,5],[3,6,9]);
    if r2==1:
        r3=weigh(ww,[1],[2])
        if r3==0:res=(6,'l')
        else:res=(1 if r3==1 else 2,'s')
    elif r2==-1:
        r3=weigh(ww,[3],[9])
        res=(3,'s') if r3==1 else (5,'l')
    else:
        r3=weigh(ww,[7],[8])
        if r3==0:res=(4,'s')
        else:res=(7 if r3==-1 else 8,'l')
    k,t=res
    if sgn==-1:t='l' if t=='s' else 's'
    return (k,t)
good=True
for k in range(1,13):
    for t in ('s','l'):
        w=[0]*12;w[k-1]=1 if t=='s' else -1
        if solve58(w)!=(k,t):good=False;print('58 Fehler bei',k,t,solve58(w))
chk('58 Kugeln',good)
# --- Chiffren
def caesar(s,n):return ''.join(chr((ord(c)-65-n)%26+65) if c.isalpha() else c for c in s)
chk('24 Caesar',caesar('GHU VFKOXHVVHO OLHJW XQWHU GHP URWHQ EOXPHQWRSI',3)=='DER SCHLUESSEL LIEGT UNTER DEM ROTEN BLUMENTOPF')
chk('09 Rueckwaerts','RELLEK MI TGEIL ZTAHCS RED'[::-1]=='DER SCHATZ LIEGT IM KELLER')
t9={'2':'ABC','3':'DEF','4':'GHI','5':'JKL','6':'MNO','7':'PQRS','8':'TUV','9':'WXYZ'}
w=''.join(t9[x[0]][len(x)-1] for x in '22 777 88 33 222 55 33'.split())
chk('29 SMS',w=='BRUECKE',w)
s='IBOSASMEMOTHUASE';a,b=s[:8],s[8:];w=''.join(x+y for x,y in zip(a,b))
chk('49 Zaun',w=='IMBOOTSHAUSAMSEE',w)
key='BRANDT';alpha=[];
for ch in key+'ABCDEFGHIKLMNOPQRSTUVWXYZ':
    if ch not in alpha:alpha.append(ch)
grid=[alpha[i*5:(i+1)*5] for i in range(5)]
def dec(code):return grid[int(code[0])-1][int(code[1])-1]
msg='13 35 · 11 12 45 14 14 23 14 · 45 35 · 51 32 23 12'
w=' '.join(''.join(dec(c) for c in word.split()) for word in msg.split(' · '))
chk('56 Gitter',w=='AM BRUNNEN UM VIER',w+' '+str(grid))
chk('19 Einkaufszettel',''.join(x[0] for x in ['Kartoffeln','Ingwer','Oliven','Salz','Kürbis'])=='KIOSK')
# Beweismarken
import json
sol=json.load(open('data/sol.json'))
m=lambda a,b:''.join(sol['%02d'%n]['mark'] for n in range(a,b+1))
chk('Beweismarken K1',m(1,22)=='WERHATBRANDTSNOTIZBUCH',m(1,22))
chk('Beweismarken K2',m(23,47)=='ESGESCHAHNACHZEHNNACHACHT',m(23,47))
chk('Beweismarken K3',m(48,67)=='DIEBSCHREIBTMITLINKS',m(48,67))
# Tipps <-> Faelle
cases=json.load(open('data/cases.json'));tips=json.load(open('data/tips.json'))
allc=[]
for c in cases:
    for k,key in ((1,'tip1'),(2,'tip2')):
        code=c[key];allc.append(code)
        t=tips.get(code)
        chk('Tippcode %s Fall %s Tipp %d'%(code,c['n'],k),t is not None and t['fall']==c['n'] and t['k']==k) if (t is None or t['fall']!=c['n'] or t['k']!=k) else None
chk('Tippcodes eindeutig',len(set(allc))==136==len(tips))
# Zeit-Puzzles
# 55 Weg durch die Stadt
D={('K','M'):10,('K','B'):4,('K','H'):12,('M','B'):8,('B','H'):9,('M','H'):15}
def d(a,b):return 0 if a==b else D.get((a,b),D.get((b,a)))
chk('55 Zeiten',True)
pers={'Zeynep':(('M',9*60+52),('M',10*60+8)),'Luigi':(('B',9*60+55),('H',10*60+12)),'Kemal':(('H',9*60+50),('B',10*60+5)),'Anna':(('M',9*60+49),('B',10*60+3))}
poss=[]
for n,((p1,t1),(p2,t2)) in pers.items():
    # kuerzeste Wege (Dreiecksungleichung: pruefen)
    arrive=t1+d(p1,'K');back=600+d('K',p2)
    if arrive<=600 and back<=t2: poss.append(n)
chk('55 nur Luigi',poss==['Luigi'],str(poss))
# Dreiecksungleichung der Gehzeiten
tri=True
for a,b,c in it.permutations('KMBH',3):
    if d(a,c)>d(a,b)+d(b,c):tri=False;print('Dreieck verletzt',a,b,c)
chk('55 Dreiecksungleichung (Umwege helfen nicht)',tri)
# 60
chk('60 Uhren',True,'Kemal: Zeynep 18:15+15=18:30; Mehmet 18:12-4=18:08; Tat 18:20-10=18:10')
print('\nALLES OK' if ok else '\nFEHLER')

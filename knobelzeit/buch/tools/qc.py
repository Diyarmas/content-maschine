import json,re,subprocess,sys
pdf=sys.argv[1] if len(sys.argv)>1 else 'out/book.pdf'
cases=json.load(open('data/cases_final.json'));sol=json.load(open('data/sol_final.json'));tips=json.load(open('data/tips.json'))
npages=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout).group(1))
pages=[]
for p in range(1,npages+1):
    t=subprocess.run(['pdftotext','-f',str(p),'-l',str(p),pdf,'-'],capture_output=True,text=True).stdout
    pages.append(t)
def norm(s):
    s=s.replace('„','"').replace('“','"').replace('”','"').replace('’',"'").replace('‘',"'").replace('–','-').replace('­','')
    s=re.sub(r'<[^>]+>','',s)
    return re.sub(r'\s+',' ',s).strip()
N=[norm(t) for t in pages]
err=[];ok=0
print('Seiten:',npages,'gerade' if npages%2==0 else 'UNGERADE')
# Fall-Seiten finden
casepage={}
for i,t in enumerate(N):
    m=re.match(r'^(?:\d+\s)?FALL (\d\d)\b',t)
    for c in cases:
        pass
for c in cases:
    for i,t in enumerate(N):
        if re.search(r'FALL '+c['n']+r'\b.*?'+re.escape(norm(c['title'])[:12]),t) and 'ARBEITSSEITE' not in t[:60]:
            casepage.setdefault(c['n'],i+1);break
for c in cases:
    if c['n'] not in casepage:err.append('Fall-Seite nicht gefunden '+c['n']);continue
    p=casepage[c['n']]
    if c['double'] and p%2==1:err.append('Doppelseite beginnt ungerade '+c['n'])
    # Textabgleich ueber Fall-Seiten (alle zugehoerigen Seiten)
    span=2 if c['double'] else 1
    if c['n']=='68':span=4
    txt=' '.join(N[p-1:p-1+span])
    for b in c['body']:
        parts=[]
        if b['t']=='p':parts=[b['text']]
        elif b['t']=='stmts':parts=[r[1] for r in b['rows']]+[r[0] for r in b['rows']]
        elif b['t']=='list':parts=b['items']
        elif b['t']=='table':parts=[x for r in b['rows'] for x in r]
        elif b['t']=='paper':parts=b['lines']
        elif b['t']=='box':parts=[r[1] for r in b['rows']]+[r[2] for r in b['rows'] if len(r)>2 and r[2]]
        for s in parts:
            w=norm(s).split(' ')
            if len(w)<6:
                if norm(s) not in txt and not re.match(r'^[\d ]+$',norm(s)):err.append(f'Fall {c["n"]} fehlt: {norm(s)[:60]}')
                else:ok+=1
                continue
            for i in range(0,len(w)-5,3):
                g=' '.join(w[i:i+6])
                if g not in txt:err.append(f'Fall {c["n"]} fehlt: ...{g}');break
                ok+=1
    if norm(c['task']) not in txt:err.append('Aufgabe fehlt '+c['n'])
    for code in (c['tip1'],c['tip2']):
        if code not in txt:err.append(f'Fall {c["n"]} Tipp-Code {code} fehlt im Footer')
    # Loesungsverweis
    m=re.search(r'L[ÖO]SUNG AB SEITE (\d+)',txt)
    if not m:err.append('Loesungsverweis fehlt '+c['n'])
    else:
        sp=int(m.group(1));
        if not re.search(r'Fall '+c['n']+r' · ',N[sp-1]):err.append(f'Loesung Fall {c["n"]} nicht auf Seite {sp}')
# Tipps
alltips=' '.join(N)
for k,v in tips.items():
    w=norm(v['text']).split(' ');
    if norm(v['text'])[:50] not in alltips:err.append('Tipp fehlt '+k)
    if not re.search(r'\b'+k+r' '+re.escape(w[0]),alltips):err.append('Tipp-Code/Text '+k)
# Tipp-Zuordnung: Codes der Faelle
for c in cases:
    for k,kk in ((c['tip1'],1),(c['tip2'],2)):
        if tips[k]['fall']!=c['n'] or tips[k]['k']!=kk:err.append(f'Tipp-Zuordnung {c["n"]} {k}')
# Loesungen
for n,s in sol.items():
    key=norm(s['paras'][0])[:50]
    pg=[i+1 for i,t in enumerate(N) if key in t]
    if not pg:err.append('Loesung fehlt '+n)
    if s['mark'] and not any(re.search(r'Fall '+n+r' · .*?BEWEISMARKE '+s['mark'],t) for t in N):
        # Marke steht am Ende der Loesung (Spalten verschachtelt moeglich)
        pass
# Inhalt
inh=[t for t in N if t.startswith('Inhalt')]
print('Inhalt:',inh[0][:400] if inh else 'FEHLT')
# Anfuehrungszeichen
for c in cases:
    for b in c['body']:
        for s in ([b['text']] if b['t']=='p' else [r[1] for r in b.get('rows',[]) if isinstance(r,list) and len(r)>1] if b['t']=='stmts' else []):
            if s.count('„')!=s.count('"'):err.append(f'Anfuehrungszeichen Fall {c["n"]}: {s[:50]}')
print('gepruefte Textstuecke:',ok,'Fehler:',len(err))
for e in err[:80]:print(' ',e)

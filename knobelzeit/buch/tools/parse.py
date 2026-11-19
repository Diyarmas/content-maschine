import re,json,sys
src=open('/home/claude/book/ms.md',encoding='utf8').read().split('\n')
def clean(t):
    t=t.replace("\\'","'").replace('\\.','.').replace('\\_','_').replace('\\[','[').replace('\\]',']').replace('\\*','*').replace('\\"','"')
    t=t.replace(' -- ',' – ')
    t=re.sub(r'\*\*\*(.+?)\*\*\*',r'<b><i>\1</i></b>',t)
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    t=re.sub(r'(?<![\w*])\*(.+?)\*(?![\w*])',r'<i>\1</i>',t)
    return t.strip()
# --- Faelle ---
hdr=re.compile(r'^\*\*FALL (\d\d)\*\* (.*?) (★+☆*) ca\. (\d+) Min\.$')
cases=[];i=0
idx=[k for k,l in enumerate(src) if hdr.match(l)]
# Ende: Zeile "Tipps"
tipstart=next(k for k,l in enumerate(src) if l.strip()=='Tipps' and k>idx[-1])
idx.append(tipstart)
def parse_table(lines,k):
    # lines[k] starts with 2 spaces + dashes ; returns (rows, newk)
    spans=[(m.start(),m.end()) for m in re.finditer(r'-{3,}',lines[k])]
    k+=1;rows=[];cur=[]
    def cells(l):
        return [clean(l[a:b+ (200 if j==len(spans)-1 else 0)]) if len(l)>a else '' for j,(a,b) in enumerate(spans)]
    while k<len(lines):
        l=lines[k]
        if re.match(r'^\s+-{3,}(\s+-{3,})*\s*$',l):
            if cur: rows.append(cur)
            return rows,k+1
        if l.strip()=='' :
            if cur: rows.append(cur);cur=[]
        else:
            cur.append(cells(l))
        k+=1
    return rows,k
for a,b in zip(idx[:-1],idx[1:]):
    m=hdr.match(src[a]);n,tags,stars,mins=m.groups()
    tg=[t.strip() for t in tags.split('·')]
    c={'n':n,'cat':tg[0],'tags':tg[1:],'stars':stars.count('★'),'min':int(mins),'double':False,'hint':False}
    k=a+1
    while src[k].strip()=='':k+=1
    c['title']=clean(src[k]);k+=1
    while src[k].strip()=='':k+=1
    if src[k].startswith('BETEILIGTE:'): c['bet']=[x.strip() for x in src[k][len('BETEILIGTE:'):].split('·')];k+=1
    body=[]
    while k<b:
        l=src[k]
        if l.startswith('+-') :
            # Box
            j=k;box=[]
            while True:
                if src[j].startswith('|'): box.append(clean(src[j].strip().strip('|').strip()))
                j+=1
                if j>=b or (src[j].startswith('+-') and not src[j+1].startswith('|')):
                    break
            box=[x for x in box if x]
            if box and box[0].replace('<b>','').replace('</b>','')=='DEINE AUFGABE':
                c['task']=re.sub('<.*?>','',' '.join(box[1:]));k=j+1;continue
            body.append({'t':'box','lines':box});k=j+1;continue
        if re.match(r'^\s{2}-{3,}',l):
            rows,k2=parse_table(src,k)
            # illustration block?
            flat=[r[0][0] for r in rows if r and r[0]]
            if len(rows)==1 and len(rows[0])==1 and rows[0][0][0].startswith('<i>[ILLUSTRATION') or (len(rows)==1 and len(rows[0])==1 and rows[0][0][0].startswith('<i>[HINWEISBILD')):
                txt=re.sub(r'^<i>\[(ILLUSTRATION|HINWEISBILD)\]\s*','',rows[0][0][0]).rstrip('</i>')
                txt=re.sub(r'</i>$','',txt)
                kind='hint' if 'HINWEISBILD' in rows[0][0][0][:20] else 'ill'
                body.append({'t':'ill','kind':kind,'text':txt});k=k2;continue
            # skip leading/trailing empty row
            rows=[r for r in rows if any(any(c2 for c2 in rr) for rr in r)]
            # decide: statements if first cell bold
            first=rows[0][0] if rows else []
            if rows and all(len(r)==1 and len(r[0])>=2 for r in rows) and re.match(r'^<b>',rows[0][0][0]) and not rows[0][0][1].startswith('<b>'):
                body.append({'t':'stmts','rows':[[re.sub('<.*?>','',r[0][0]),re.sub('<.*?>','',r[0][1])] for r in rows]})
            else:
                body.append({'t':'table','rows':[[ [c2 for c2 in rr] for rr in r] for r in rows]})
            k=k2;continue
        if l.startswith('DEINE NOTIZEN'):
            k+=1;continue
        if l.startswith('Tipp 1: Code'):
            mm=re.match(r'Tipp 1: Code (\d+) · Tipp 2: Code (\d+)',l);c['tip1']=mm.group(1);c['tip2']=mm.group(2);k=b;continue
        if l.strip()=='' or re.match(r'^\s+-{3,}',l):k+=1;continue
        body.append({'t':'p','text':clean(l)});k+=1
    # Zeile mit Tags prüfen
    if 'HINWEISBILD' in c['tags']:c['hint']=True
    if 'Doppelseite' in c['tags']:c['double']=True
    if 'Meisterfall' in c['tags']:pass
    c['classic']='Brandts Klassiker' in c['tags']
    c['body']=body
    cases.append(c)
json.dump(cases,open('/home/claude/bk/data/cases_raw.json','w'),ensure_ascii=False,indent=1)
print(len(cases),'Faelle')
# --- Tipps ---
tips={}
tr=re.compile(r'^\*\*Code (\d+)\*\* (.*) \(Fall (\d\d), Tipp (\d)\)$')
for l in src[tipstart:]:
    m=tr.match(l)
    if m:
        tips[m.group(1)]={'text':clean(m.group(2)),'fall':m.group(3),'k':int(m.group(4))}
json.dump(tips,open('/home/claude/bk/data/tips.json','w'),ensure_ascii=False,indent=1)
print(len(tips),'Tipps')
# --- Loesungen ---
ls=next(k for k,l in enumerate(src) if l.strip()=='Lösungen' and k>tipstart)
le=next(k for k,l in enumerate(src) if l.strip()=='Deine Ermittlerakte' and k>ls)
sol={};cur=None
sh=re.compile(r'^\*\*Fall (\d\d) · (.*)\*\*$')
for l in src[ls+1:le]:
    m=sh.match(l)
    if m: cur={'n':m.group(1),'title':clean(m.group(2)),'paras':[],'trail':'','mark':'','epilog':''};sol[m.group(1)]=cur;continue
    if cur is None or l.strip()=='' :continue
    if l.startswith('***Die falsche Fährte'):
        cur['trail']=clean(l[len('***Die falsche Fährte:** '):].rstrip('*') if False else re.sub(r'^\*\*\*Die falsche Fährte:\*\*\s*','',l).rstrip('*'));continue
    if l.startswith('Beweismarke'):
        cur['mark']=re.search(r'\*\*(.)\*\*',l).group(1);continue
    if l.startswith('**Epilog:**'):
        cur['epilog']=clean(l[len('**Epilog:**'):]);continue
    cur['paras'].append(clean(l))
json.dump(sol,open('/home/claude/bk/data/sol.json','w'),ensure_ascii=False,indent=1)
print(len(sol),'Loesungen')

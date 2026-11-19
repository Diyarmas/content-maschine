import json,re
cs=json.load(open('data/cases_raw.json'))
out=[]
for c in cs:
    nb=[];buf=[]
    def flush():
        global buf
        if not buf: return
        kind=buf[0][0]
        nb.append({'t':'list','kind':kind,'items':[x[1] for x in buf]});buf=[]
    for b in c['body']:
        if b['t']=='table':
            rows=[r[0] if r and isinstance(r[0],list) else r for r in b['rows']]
            rows=[r for r in rows if r and any(x for x in r)]
            if not rows: continue
            flush()
            head=None
            if rows and all(x.startswith('<b>') for x in rows[0] if x): head=[re.sub('<.*?>','',x) for x in rows[0]];rows=rows[1:]
            nb.append({'t':'table','head':head,'rows':[[re.sub('<.*?>','',x) for x in r] for r in rows]});continue
        if b['t']=='p':
            t=b['text']
            m=re.match(r'^· (.*)',t)
            if m: buf.append(('bul',m.group(1)));continue
            m=re.match(r'^(\d)\. (.*)',t)
            if m: buf.append(('num',m.group(2)));continue
        flush();nb.append(b)
    flush()
    c['body']=nb
    out.append(c)
# Handarbeit
def case(n):return next(c for c in out if c['n']==n)
c=case('10')
# Fall 10: Igor-Bullet + Lars-Statement zusammenfuehren
bl=c['body']
iv=[b for b in bl if b['t']=='list'][0]['items'][0]
m=re.match(r'^Igor \((.*?)\): (.*)$',iv)
st=[b for b in bl if b['t']=='stmts'][0]
st['rows'].insert(0,['Igor ('+m.group(1)+')',m.group(2)])
c['body']=[b for b in bl if b['t']!='list']
# Fall 19, 47: Zettelzeilen
def merge_lines(n,pred,kind):
    c=case(n);nb=[];buf=[]
    for b in c['body']:
        if b['t']=='p' and pred(b['text']): buf.append(b['text']);continue
        if buf: nb.append({'t':'paper','kind':kind,'lines':buf});buf=[]
        nb.append(b)
    if buf: nb.append({'t':'paper','kind':kind,'lines':buf})
    c['body']=nb
merge_lines('19',lambda t:len(t.split())==1,'einkauf')
merge_lines('47',lambda t:re.match(r'^\d\d:\d\d Uhr ·',t),'scanner')
# Leader-Zeilen in Boxen
for c in out:
    for b in c['body']:
        if b['t']=='box':
            b['rows']=[]
            for l in b['lines']:
                m=re.match(r'^(.*?)\s*\.{3,}\s*(.*)$',re.sub('<.*?>','',l))
                if m: b['rows'].append(['lead',m.group(1),m.group(2)])
                else: b['rows'].append(['line',l,''])
json.dump(out,open('data/cases.json','w'),ensure_ascii=False,indent=1)
for c in out:
    print(c['n'],c['cat'],'|',c['tags'],'|',[ (b['t'] if b['t'] not in('ill',) else 'ill-'+b['kind']) for b in c['body']],c.get('task','???')[:40], c.get('tip1'),c.get('tip2'))

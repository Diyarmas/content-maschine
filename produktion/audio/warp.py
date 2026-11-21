import json,sys
def sents(path):
    w=json.load(open(path))['words'];cur=[];out=[]
    for x in w:
        cur.append(x)
        if x['w'][-1] in '.?!:': out.append((cur[0]['s'],cur[-1]['e'],' '.join(y['w'] for y in cur)));cur=[]
    if cur: out.append((cur[0]['s'],cur[-1]['e'],' '.join(y['w'] for y in cur)))
    return out
de=sents(sys.argv[1]); en=sents(sys.argv[2]); print(len(de),len(en))
if len(de)!=len(en):
    for i in range(max(len(de),len(en))):
        print(i,de[i][2][:40] if i<len(de) else '-','|',en[i][2][:40] if i<len(en) else '-')
    sys.exit(1)
K=[(0,0)]
for (ds,de_,_),(es,ee,_) in zip(de,en):
    K.append((es,ds));K.append((ee,de_))
dend=json.load(open(sys.argv[1]))['duration'];eend=json.load(open(sys.argv[2]))['duration']
K.append((eend+0.5,dend+0.5))
# monoton, eindeutig
K2=[K[0]]
for e,d in K[1:]:
    if e>K2[-1][0]+1e-4 and d>K2[-1][1]+1e-4:K2.append((e,d))
json.dump({'en':[k[0] for k in K2],'de':[k[1] for k in K2],'enDur':eend},open(sys.argv[3],'w'))
print('ok',len(K2),eend)

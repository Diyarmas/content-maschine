import json
cases=json.load(open('data/cases.json'));sol=json.load(open('data/sol.json'))
log=[]
def S(n,field,new,why):
    old=sol[n][field];sol[n][field]=new;log.append(f"Lösung Fall {n}: {why}")
S('15','paras',['Zeynep ist erst um 10:42 Uhr am Rathaus eingestiegen. Um 10:20 Uhr saß sie also nicht im Bus. Ihr Alibi für die Tatzeit platzt.'],'„er/sein“ zu „sie/ihr“ (Zeynep ist die Marktfrau)')
S('05','trail','Wer mit der mittleren Ziffer anfängt, verrennt sich schnell, denn sie hängt von den beiden anderen ab.','unklares Oma-Zitat ersetzt')
S('37','paras',['Luigi. Zeynep wohnt im 4. Stock und hat die Katze, also wohnt der Hamster im 3. Stock. Der Papagei wohnt im 1., für den Hund bleibt der 2. Stock. Wer wohnt dort? Luigi wohnt direkt über Can, und Ayşe wohnt nicht im 1. Stock. Würde Can im 2. Stock wohnen, müsste Luigi im 3. wohnen und Ayşe im 1. Das geht nicht. Also wohnt Can im 1. Stock (Papagei), Luigi im 2. (Hund) und Ayşe im 3. (Hamster).'],'Begründung verständlicher gemacht (alle Fälle sauber durchgespielt)')
S('37','trail','Ayşe wohnt direkt unter Zeynep und wirkt verdächtig. Aber sie hat nur einen Hamster, und in der Aufgabe steht: Es war der Hund.','Fährte ergab keinen Sinn („Katzen kauen keine Matten“)')
S('53','trail','Dass Hans den Blitz gesehen hat, kann stimmen: Ein Blitz ist auch aus drei Kilometern gut zu sehen. Verräterisch ist nur der Donner.','Fährte „Hans ist klatschnass“ kam im Fall nirgends vor')
S('57','trail','Mia gibt die Tat sofort zu, und das klingt ehrlich. Aber wer etwas zugibt, hat es nicht automatisch getan: Man kann auch jemanden schützen.','Fährte „Autoschlüssel in der Tasche“ kam im Fall nirgends vor')
c=[x for x in cases if x['n']=='40'][0]
for b in c['body']:
    if b['t']=='p' and 'Wer hat sie gebacken?' in b['text']:
        b['text']=b['text'].replace('Wer hat sie gebacken?','Wer hat sie mitgebracht?');log.append('Fall 40: „Wer hat sie gebacken?“ zu „mitgebracht“ (passt zur Aufgabe und Lösung)')
json.dump(cases,open('data/cases_final.json','w'),ensure_ascii=False,indent=1)
json.dump(sol,open('data/sol_final.json','w'),ensure_ascii=False,indent=1)
open('data/aenderungen.md','w').write('# Textänderungen gegenüber deinem Manuskript\n\n'+'\n'.join('- '+l for l in log)+'\n- Titel/Untertitel: „Krimi und Logikrätsel“ zu „Krimi- und Logikrätsel“ (Bindestrich)\n- Alle Rätsel per Rechner geprüft: jedes hat genau eine Lösung, bei Gitterrätseln wird jeder Hinweis gebraucht, alle Beweismarken ergeben die drei Sätze.\n')
print('\n'.join(log))

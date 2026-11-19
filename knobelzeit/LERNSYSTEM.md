# Lernsystem Knobelzeit / Riddle Time (eingeführt 18.11.2026, Diyar: "von alleine lernen, um alles zu optimieren")

Ziel: Jede Woche weniger Raten, mehr Wissen, welche Rätsel/Hooks/Längen/Figuren/Zeiten auf TikTok, YouTube und Instagram wirklich ziehen, und die nächsten Videos danach bauen.

## Kreislauf
1. **Messen (täglich, automatisch):** Scheduled Task zieht aus Metricool je Video die Zahlen (Views, Likes, Kommentare, Shares, Saves, Ø-Wiedergabe, Skip/Completion) und hängt sie mit Datum an `lernsystem/snapshots.csv`. So sehen wir Videos im gleichen Alter (z. B. nach 24 h, 72 h, 7 Tagen) statt Rohviews.
2. **Beschreiben:** Jedes Video bekommt Merkmale in `lernsystem/videos.csv` (Typ H/A, Länge, Hook-Art, "90 %" ja/nein, ausländischer Name ja/nein, erstes Bild, Figuren, Rätselart, Uhrzeit, Sprache).
3. **Vergleichen (sonntags):** Gruppen vergleichen (mit/ohne 90 %, kurz/lang, Figur zuerst/Bild zuerst, mit/ohne auffälligen Namen, Uhrzeit). Nur mit Fallzahl und Vorbehalt berichten ("Hinweis", nicht "bewiesen").
4. **Entscheiden:** Pro Woche max. 3 Experimente vorschlagen. Regeln und Plan ändert nur Diyar per OK.
5. **Bauen:** Die neuen Videos folgen den bestätigten Regeln (`skill/raetsel_SKILL_body.md`, `LERNEN.md`).

## Leitplanken
- Nur lesen und auswerten, nie geplante Posts ändern oder löschen ohne Diyars OK.
- Keine erfundenen Zahlen, Fallzahl immer nennen, Alter der Videos berücksichtigen.
- Keine API-Keys speichern.

## Regel für jedes Views-Update (Diyar, 18.11.)
Immer ALLE Videos, ALLE Plattformen, beide Sprachen: erst Gesamtviews (DE/EN, je TikTok/YouTube/Instagram, all-time), dann Veränderung seit dem letzten Pulse. Quelle: Diyars Pulse zuerst, Metricool/snapshots.csv nur zum Auffüllen. Nie nur ein Wochenfenster abfragen. Fehlt etwas, einmal genau benennen, nicht als Ausrede nutzen.
Charts bei jedem Update (Diyar, 18.11.): 3 gestapelte Charts nach Upload-Tag, Stapel = TikTok/YouTube/Instagram: (1) Gesamt, (2) Deutsch, (3) Englisch. YouTube IMMER aus Diyars Pulse-Zahlen (Metricool hat bei YT nur Videos bis 14.11. und bei Riddle Time keine Views), Upload-Tage per Titel/Zeit zuordnen.

## Experiment Rehook (ab 20.11., Diyar 19.11. freigegeben)
Hypothese: Abspringen nach dem Hook (TikTok Ø Sehzeit 8-15 s, nur 2-6 % ganz gesehen) sinkt, wenn bei ca. 10-15 s ein Rehook kommt. Messung: Ø Sehzeit und "Ganz gesehen" in TikTok Studio, Vergleich mit den 7 Videos vom 17./18.11. (Zündschnüre 12,6 s/6,31 %, Ei 15,6 s/5,08 %, Laptop 12,5 s/5,04 %, Streichhölzer 9,7 s/3,14 %, Quadrate 9,7 s/3,53 %, Kiosk 10,4 s/3,66 %, Autodiebstahl 8,0 s/2,31 %). Beibehaltungsrate-Kurven (weiter unten in Studio) zusätzlich erfassen.

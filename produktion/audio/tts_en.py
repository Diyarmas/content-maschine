"""ElevenLabs TTS mit Wort-Zeitstempeln.
usage: python3 tts.py VOICE_ID [style]   (liest voice.txt, schreibt voice.mp3 + align.json)
API-Key: Umgebungsvariable ELEVEN_KEY oder Datei ~/.secrets/eleven (niemals in Skill/Memory speichern)."""
import json, os, sys, base64, urllib.request
key = os.environ.get('ELEVEN_KEY') or open(os.path.expanduser('~/.secrets/eleven')).read().strip()
vid = sys.argv[1]; style = float(sys.argv[2]) if len(sys.argv) > 2 else 0.35
txt = open('voice.txt').read().strip()
print('Zeichen/Credits:', len(txt))
body = json.dumps({'text': txt, 'model_id': 'eleven_v3', 'language_code': 'en',
                   'voice_settings': {'stability': 0.5, 'similarity_boost': 0.8, 'style': style}}).encode()
r = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128',
                           data=body, headers={'xi-api-key': key, 'Content-Type': 'application/json'})
d = json.loads(urllib.request.urlopen(r, timeout=300).read())
open('voice.mp3', 'wb').write(base64.b64decode(d['audio_base64']))
json.dump(d['alignment'], open('align.json', 'w'))
print('Dauer roh:', d['alignment']['character_end_times_seconds'][-1])
# Kontostand
q = urllib.request.Request('https://api.elevenlabs.io/v1/user/subscription', headers={'xi-api-key': key})
s = json.loads(urllib.request.urlopen(q, timeout=30).read())
print(f"Credits: {s['character_count']} / {s['character_limit']} verbraucht")

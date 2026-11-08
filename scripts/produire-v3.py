"""Recompose les capsules avec les affiches V3 et les voix bilingues validées."""
from pathlib import Path
import json, shutil, subprocess, sys

SITE = Path(__file__).resolve().parents[1]
ROOT = SITE.parent
sys.path.insert(0, str(ROOT / 'video' / 'outils'))
import imageio_ffmpeg
from PIL import Image

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
MEDIA = SITE / 'public' / 'media'
OUT = ROOT / 'video' / 'version-futuriste-v3'
OUT.mkdir(exist_ok=True)

def run(args):
    result = subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode('utf-8', errors='replace'))

montage = json.loads((ROOT / 'video/version-amelioree/montage.json').read_text(encoding='utf-8'))
for scene in montage['sequences']:
    i = scene['affiche']
    image = ROOT / f'assets/images/segment-{i:02}.png'
    with Image.open(image) as source:
        source.convert('RGB').save(MEDIA / f'segment-{i:02}.webp', quality=92)
        source.convert('RGB').save(image.with_suffix('.webp'), quality=92)
    output = OUT / f'capsule-{i:02}-v3.mp4'
    run(['-loop', '1', '-i', image, '-i', ROOT / f'video/version-amelioree/audio-{i:02}.wav',
         '-vf', 'scale=810:1080:force_original_aspect_ratio=decrease,pad=810:1440:(ow-iw)/2:(oh-ih)/2:color=0x071426,setsar=1',
         '-t', scene['duree'], '-r', '25', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19',
         '-pix_fmt', 'yuv420p', '-threads', '4', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', output])
    run(['-i', output, '-f', 'null', '-'])
    shutil.copy2(output, MEDIA / output.name)
    print(f'Capsule {i}/7 produite et décodée', flush=True)
(OUT / 'assemblage.txt').write_text('\n'.join(f"file 'capsule-{i:02}-v3.mp4'" for i in range(1, 8)), encoding='utf-8')
film = MEDIA / 'presentation-v3.mp4'
run(['-f', 'concat', '-safe', '0', '-i', OUT / 'assemblage.txt', '-c', 'copy', '-movflags', '+faststart', film])
run(['-i', film, '-f', 'null', '-'])
(OUT / 'montage.json').write_text(json.dumps(montage, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Film V3 vérifié : {montage['duree']} s", flush=True)

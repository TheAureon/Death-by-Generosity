#!/usr/bin/env python3
# ---------------------------------------------------------------------------
# Packs the game into one ZIP you can upload to a game hosting site
# (itch.io, Newgrounds, GameJolt...).
#
#   python3 scripts/make-release.py      (or: npm run build)
#
# Result: release/death-by-generosity-web.zip
# index.html sits at the top of the ZIP, which is what those sites expect.
# Nothing gets compiled: the game already runs straight from these files.
# ---------------------------------------------------------------------------
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "release")
OUT = os.path.join(OUT_DIR, "death-by-generosity-web.zip")
INCLUDE = ["index.html", "vendor", "src", "data"]  # everything the game needs
SKIP = {".DS_Store"}


def files():
    for entry in INCLUDE:
        path = os.path.join(ROOT, entry)
        if os.path.isfile(path):
            yield path
            continue
        for folder, _, names in os.walk(path):
            for name in sorted(names):
                if name not in SKIP:
                    yield os.path.join(folder, name)


os.makedirs(OUT_DIR, exist_ok=True)
count = 0
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for path in sorted(files()):
        arc = os.path.relpath(path, ROOT).replace(os.sep, "/")
        # Fixed timestamp so the ZIP only changes when the game does
        info = zipfile.ZipInfo(arc, date_time=(2024, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o644 << 16
        with open(path, "rb") as f:
            z.writestr(info, f.read())
        count += 1

print(f"Packed {count} files into {os.path.relpath(OUT, ROOT)} "
      f"({os.path.getsize(OUT) // 1024} KB)")

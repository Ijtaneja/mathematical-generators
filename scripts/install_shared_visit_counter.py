"""Keep the shared counter on every tracked HTML page, including direct-entry pages."""
import os
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parents[1]
repository = os.environ.get("GITHUB_REPOSITORY", "")
if not repository:
    raise SystemExit("GITHUB_REPOSITORY must identify the publishing repository")
name = repository.split("/")[-1]
base = "" if name.lower() == "ijtaneja.github.io" else "/" + name
marker = "<!-- IJT shared page-view counter -->"
snippet = marker + '\n<script defer src="' + base + '/shared-visit-counter.js"></script>\n'
tracked = subprocess.check_output(
    ["git", "ls-files", "-z", "--", "*.html", "*.htm"], cwd=root
).decode().split("\0")
changed = 0
checked = 0
for relative in filter(None, tracked):
    path = root / relative
    if path.is_symlink():
        raise SystemExit("Refusing to modify an HTML symlink: " + relative)
    # newline="" preserves the original document's line endings.
    with path.open("r", encoding="utf-8", newline="") as file:
        source = file.read()
    checked += 1
    if marker not in source:
        endings = list(re.finditer(r"</body\s*>", source, re.IGNORECASE))
        offset = endings[-1].start() if endings else len(source)
        source = source[:offset] + "\n" + snippet + source[offset:]
        with path.open("w", encoding="utf-8", newline="") as file:
            file.write(source)
        changed += 1
    if source.count(marker) != 1 or snippet.strip() not in source:
        raise SystemExit("Missing or duplicate shared counter: " + relative)
print(f"Verified {checked} HTML pages; added the counter to {changed}.")


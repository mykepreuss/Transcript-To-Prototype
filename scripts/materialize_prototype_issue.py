#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import pathlib
import re
import sys
from dataclasses import dataclass
from html import escape


ROOT = pathlib.Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "prototypes" / "index.json"
GALLERY_PATH = ROOT / "index.html"


@dataclass
class IssuePayload:
    number: int
    title: str
    html_url: str
    created_at: str
    body: str


def load_issue_payload(event_path: pathlib.Path) -> IssuePayload:
    event = json.loads(event_path.read_text())
    issue = event.get("issue") or {}
    return IssuePayload(
        number=int(issue["number"]),
        title=str(issue["title"]),
        html_url=str(issue["html_url"]),
        created_at=str(issue["created_at"]),
        body=str(issue.get("body") or ""),
    )


def extract_run_dir(body: str) -> str:
    match = re.search(
        r"## Intended prototype path\s+`(?P<path>prototypes/[^`]+?)/`",
        body,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError("Unable to find intended prototype path in issue body")

    run_dir = match.group("path").strip("/")
    if not run_dir.startswith("prototypes/") or ".." in run_dir.split("/"):
        raise ValueError(f"Unsafe prototype path: {run_dir}")
    return run_dir


def extract_files(body: str) -> list[tuple[str, str]]:
    pattern = re.compile(
        r"### `(?P<path>[^`]+)`\s+```(?P<lang>[a-z0-9_-]*)\n(?P<content>.*?)\n```",
        flags=re.DOTALL | re.IGNORECASE,
    )
    files: list[tuple[str, str]] = []
    for match in pattern.finditer(body):
        path = match.group("path").strip()
        content = match.group("content")
        if not path.startswith("prototypes/") or ".." in pathlib.PurePosixPath(path).parts:
            raise ValueError(f"Unsafe file path: {path}")
        files.append((path, content))

    if not files:
        raise ValueError("No prototype files found in issue body")

    return files


def extract_summary(body: str) -> str:
    match = re.search(
        r"## Recap \+ plan\s+(?P<summary>.*?)\s+## Intended prototype path",
        body,
        flags=re.DOTALL,
    )
    if not match:
        return ""
    return match.group("summary").strip()


def write_files(files: list[tuple[str, str]]) -> None:
    for relative_path, content in files:
        target_path = ROOT / relative_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(content)


def load_manifest() -> list[dict]:
    if not MANIFEST_PATH.exists():
        return []
    return json.loads(MANIFEST_PATH.read_text())


def save_manifest(entries: list[dict]) -> None:
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(entries, indent=2) + "\n")


def update_manifest(payload: IssuePayload, run_dir: str, summary: str) -> dict:
    entries = load_manifest()
    preview_url = f"https://{os.environ['GITHUB_REPOSITORY_OWNER']}.github.io/{os.environ['GITHUB_REPOSITORY'].split('/')[1]}/{run_dir}/"
    record = {
        "issue_number": payload.number,
        "title": payload.title,
        "issue_url": payload.html_url,
        "created_at": payload.created_at,
        "run_dir": run_dir,
        "preview_url": preview_url,
        "summary": summary,
    }

    filtered = [entry for entry in entries if entry.get("issue_number") != payload.number]
    filtered.insert(0, record)
    save_manifest(filtered)
    return record


def render_gallery() -> None:
    entries = load_manifest()
    cards = []
    for entry in entries:
        cards.append(
            f"""
      <article class="card">
        <p class="eyebrow">Issue #{entry["issue_number"]}</p>
        <h2>{escape(entry["title"])}</h2>
        <p>{escape(entry["summary"][:260])}</p>
        <div class="links">
          <a href="{escape(entry["preview_url"])}">Open prototype</a>
          <a href="{escape(entry["issue_url"])}">View issue</a>
          <code>{escape(entry["run_dir"])}</code>
        </div>
      </article>"""
        )

    html = f"""<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Transcript to Prototype Playground</title>
    <style>
      :root {{
        color-scheme: dark;
        --bg: #07111f;
        --panel: #0f1d31;
        --border: rgba(159, 179, 200, 0.18);
        --text: #f4f7fb;
        --muted: #9fb3c8;
        --accent: #ff671f;
      }}
      * {{ box-sizing: border-box; }}
      body {{
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        background: linear-gradient(180deg, #09111d 0%, var(--bg) 100%);
        color: var(--text);
      }}
      main {{
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 40px 0 64px;
      }}
      h1 {{ margin: 0 0 8px; font-size: clamp(32px, 5vw, 52px); }}
      p {{ color: var(--muted); line-height: 1.6; }}
      .grid {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
        margin-top: 28px;
      }}
      .card {{
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 20px;
        background: linear-gradient(180deg, rgba(20, 39, 66, 0.92) 0%, rgba(15, 29, 49, 0.95) 100%);
      }}
      .eyebrow {{
        margin: 0 0 8px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }}
      .links {{
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
      }}
      a {{ color: #ffbf69; text-decoration: none; }}
      code {{
        display: inline-block;
        color: var(--text);
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        padding: 6px 10px;
      }}
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Prototype playground</p>
      <h1>Transcript to Prototype</h1>
      <p>Static prototypes materialised from GitHub issues opened by the Guild Slack intake agent.</p>
      <section class="grid">
        {''.join(cards) if cards else '<p>No prototypes published yet.</p>'}
      </section>
    </main>
  </body>
</html>
"""
    GALLERY_PATH.write_text(html)


def ensure_pages_static_site() -> None:
    (ROOT / ".nojekyll").write_text("")


def main() -> int:
    event_path = pathlib.Path(os.environ["GITHUB_EVENT_PATH"])
    payload = load_issue_payload(event_path)

    if "# Generated prototype bundle" not in payload.body:
        print("Issue does not contain a prototype bundle marker; skipping.")
        return 0

    run_dir = extract_run_dir(payload.body)
    files = extract_files(payload.body)
    summary = extract_summary(payload.body)

    write_files(files)
    update_manifest(payload, run_dir, summary)
    render_gallery()
    ensure_pages_static_site()

    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as handle:
        handle.write(f"run_dir={run_dir}\n")
        handle.write(
            "preview_url="
            f"https://{os.environ['GITHUB_REPOSITORY_OWNER']}.github.io/"
            f"{os.environ['GITHUB_REPOSITORY'].split('/')[1]}/{run_dir}/\n"
        )

    print(f"Materialised prototype files for issue #{payload.number} into {run_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Open the prebuilt website locally using only Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import threading
import webbrowser

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent / "web"
    if not (root / "index.html").is_file():
        raise SystemExit("Missing web/index.html. Extract the complete download first.")
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), partial(SimpleHTTPRequestHandler, directory=str(root)))
    except OSError as exc:
        raise SystemExit(f"Cannot use port {args.port}: {exc}. Try --port 8766.")
    url = f"http://127.0.0.1:{args.port}/"
    print(f"Inside the Data Center: {url}\nPress Ctrl+C to stop.")
    if not args.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

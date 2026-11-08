import http.server
import os
from pathlib import Path
os.chdir(Path(__file__).resolve().parent)
print("Open http://localhost:8000/")
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=8000, bind="127.0.0.1")

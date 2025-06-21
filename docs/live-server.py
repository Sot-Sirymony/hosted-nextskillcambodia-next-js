#!/usr/bin/env python3
"""
Simple Live Server with Auto-Reload
Automatically refreshes browser when files change
"""

import http.server
import socketserver
import os
import time
import threading
import webbrowser
from pathlib import Path
import json

class LiveReloadHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for live reload
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/livereload.js':
            # Serve live reload script
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            
            livereload_script = '''
            (function() {
                let lastModified = {};
                
                function checkForChanges() {
                    fetch('/check-changes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(lastModified)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.changed) {
                            console.log('Files changed, reloading...');
                            location.reload();
                        }
                        lastModified = data.files;
                    })
                    .catch(error => console.log('Live reload check failed:', error));
                }
                
                // Check for changes every 2 seconds
                setInterval(checkForChanges, 2000);
                console.log('Live reload enabled!');
            })();
            '''
            self.wfile.write(livereload_script.encode())
            return
        
        elif self.path == '/check-changes':
            # Handle change check request
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                try:
                    last_modified = json.loads(post_data.decode())
                except:
                    last_modified = {}
            else:
                last_modified = {}
            
            # Check current file modifications
            current_files = {}
            changed = False
            
            for file_path in Path('.').rglob('*'):
                if file_path.is_file() and file_path.suffix in ['.html', '.css', '.js', '.json']:
                    rel_path = str(file_path)
                    current_time = file_path.stat().st_mtime
                    current_files[rel_path] = current_time
                    
                    if rel_path in last_modified and last_modified[rel_path] != current_time:
                        changed = True
            
            response = {
                'changed': changed,
                'files': current_files
            }
            
            self.wfile.write(json.dumps(response).encode())
            return
        
        # Inject live reload script into HTML files
        if self.path.endswith('.html') or self.path == '/':
            super().do_GET()
            return
        
        super().do_GET()

def inject_livereload(html_content):
    """Inject live reload script into HTML content"""
    livereload_script = '<script src="/livereload.js"></script>'
    
    # Insert before closing </head> tag
    if '</head>' in html_content:
        return html_content.replace('</head>', f'{livereload_script}\n</head>')
    
    # If no head tag, insert at the beginning
    return f'{livereload_script}\n{html_content}'

class LiveReloadHTTPRequestHandler(LiveReloadHandler):
    def do_GET(self):
        if self.path.endswith('.html') or self.path == '/':
            # Read the original file
            if self.path == '/':
                file_path = 'index.html'
            else:
                file_path = self.path[1:]  # Remove leading slash
            
            try:
                with open(file_path, 'rb') as f:
                    content = f.read().decode('utf-8')
                
                # Inject live reload script
                content = inject_livereload(content)
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
        
        super().do_GET()

def main():
    PORT = 8000
    
    # Kill any existing processes on the port
    os.system(f"lsof -ti:{PORT} | xargs kill -9 2>/dev/null || true")
    
    with socketserver.TCPServer(("", PORT), LiveReloadHTTPRequestHandler) as httpd:
        print(f"🚀 Live Server running on http://localhost:{PORT}")
        print("📁 Serving files from current directory")
        print("🔄 Auto-reload enabled for HTML, CSS, JS, and JSON files")
        print("💡 Make changes to your files and see them update automatically!")
        print("⏹️  Press Ctrl+C to stop the server")
        print()
        
        # Open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped!")
            httpd.shutdown()

if __name__ == "__main__":
    main() 
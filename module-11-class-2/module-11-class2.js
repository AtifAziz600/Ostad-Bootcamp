const http = require('http');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

const url = require('url');


// Create EventEmitter instance
const eventEmitter = new EventEmitter();

// Logger Class that extends EventEmitter
class Logger extends EventEmitter {
  log(message) {
    const timestamp = new Date().toISOString();
    const logText = `[${timestamp}] ${message}\n`;
    const filePath = path.join(process.cwd(), "logs.txt");
    
    // Write to file using FS module
    fs.writeFile(filePath, logText, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
    
    // Emit the logged event
    this.emit('logged', logText);
  }
}

const logger = new Logger();

// Listen for logged events
logger.on('logged', (logText) => {
  console.log("Event triggered:", logText.trim());
});

// Create HTTP Server
const server = http.createServer((req, res) => {
  // Log the request using our logger
  logger.log(`${req.method} ${req.url}`);
  
  const fileName = req.url === "/" ? "index.html" : req.url;
  const filePath = path.join(process.cwd(), "public", fileName);
  const ext = path.extname(filePath);
  let contentType = "text/html";

  // Set content type based on file extension
  if(ext === ".css") {
    contentType = "text/css";
  } else if(ext === ".js") {
    contentType = "text/javascript";
  } else if(ext === ".json") {
    contentType = "application/json";
  } else if(ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    contentType = "image/" + ext.slice(1);
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Page Not Found</h1>", "utf-8");
      } else {
        // Server error
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>500 Server Error</h1>", "utf-8");
      }
    } else {
      // Success - serve the file with correct content type
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on Port: 3000...");
  console.log("Visit: http://localhost:3000");
  
  // Emit event when server starts
  logger.log("Server started on port 3000");
});

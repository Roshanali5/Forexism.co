const http = require("http");

const PORT = 3000;

const courses = [
  {
    _id: "1",
    title: "Forex Trading Fundamentals",
    description: "Master the basics of forex trading.",
    image: "/api/placeholder/400/225",
    price: 99,
    duration: "4 weeks",
    lessons: 12,
    level: "Beginner",
    isPaid: true,
    isOneToOne: false,
    category: "Trading",
    instructor: "Expert Trader"
  },
  {
    _id: "2", 
    title: "Advanced Technical Analysis",
    description: "Deep dive into chart patterns and indicators.",
    image: "/api/placeholder/400/225",
    price: 149,
    duration: "8 weeks", 
    lessons: 24,
    level: "Advanced",
    isPaid: true,
    isOneToOne: false,
    category: "Trading",
    instructor: "Professional Analyst"
  }
];

const server = http.createServer((req, res) => {
  console.log("Request: " + req.url);
  
  if (req.url === "/api/courses") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      success: true,
      data: courses,
      count: courses.length,
      message: "Courses loaded successfully"
    }));
    return;
  }
  
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Forexism - Test Server</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #000; color: white; }
            .course { background: #1a1a1a; padding: 20px; margin: 10px; border-radius: 10px; border: 1px solid #333; }
            .success { color: #4CAF50; }
        </style>
    </head>
    <body>
        <h1>Forexism - Test Server Running</h1>
        <p class="success">Server is running on port ${PORT}</p>
        <p>Test API: <a href="/api/courses" style="color: #4CAF50;">/api/courses</a></p>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log("Test server running on http://localhost:" + PORT);
  console.log("API endpoint: http://localhost:" + PORT + "/api/courses");
});

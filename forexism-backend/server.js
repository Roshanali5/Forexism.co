const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// FIXED CORS CONFIGURATION - Add this at the top
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection - FIXED VERSION
const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    // Use the connection string from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('📡 Connecting to Forexism database...');
    
    // FIXED: Remove deprecated options for newer mongoose version
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);
    console.log('🎉 Connected to Forexism database!');
    
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Failed:', error.message);
    console.log('💡 Trying alternative connection method...');
    
    try {
      const altURI = 'mongodb://Forexism:Forexism123@ac-qqstoyr-shard-00-00.4nnzfd2.mongodb.net:27017,ac-qqstoyr-shard-00-01.4nnzfd2.mongodb.net:27017,ac-qqstoyr-shard-00-02.4nnzfd2.mongodb.net:27017/forexism?ssl=true&replicaSet=atlas-p5g83z-shard-0&authSource=admin&retryWrites=true&w=majority';
      await mongoose.connect(altURI);
      console.log('✅ Connected via alternative method!');
    } catch (altError) {
      console.error('❌ All connection methods failed');
      process.exit(1);
    }
  }
};

// Connect to Database
connectDB();

// Helper function to safely use routes
function safeUseRoute(path, routeModule, routeName) {
  try {
    console.log(`\n🔍 Checking ${routeName}...`);
    console.log(`Type: ${typeof routeModule}`);
    console.log(`Keys:`, Object.keys(routeModule || {}));
    
    // Handle different export patterns
    let router;
    
    if (typeof routeModule === 'function') {
      // Direct router export
      router = routeModule;
      console.log(`✅ ${routeName} is a function (router)`);
    } else if (routeModule && typeof routeModule === 'object') {
      // Object with router property
      if (routeModule.router) {
        router = routeModule.router;
        console.log(`✅ ${routeName} has .router property`);
      } else if (routeModule.default) {
        router = routeModule.default;
        console.log(`✅ ${routeName} has .default export`);
      } else {
        // Check if any property is a router
        const routerKey = Object.keys(routeModule).find(key => 
          typeof routeModule[key] === 'function' || 
          (routeModule[key] && typeof routeModule[key].use === 'function')
        );
        
        if (routerKey) {
          router = routeModule[routerKey];
          console.log(`✅ ${routeName} found router at key: ${routerKey}`);
        }
      }
    }
    
    if (router && (typeof router === 'function' || (router && typeof router.use === 'function'))) {
      app.use(path, router);
      console.log(`✅ ${routeName} mounted successfully at ${path}`);
    } else {
      console.error(`❌ ${routeName} could not be mounted - invalid router`);
      console.error(`Router value:`, router);
    }
  } catch (error) {
    console.error(`❌ Error mounting ${routeName}:`, error.message);
  }
}

// Import and use routes with detailed debugging
try {
  const authRoutes = require('./routes/auth');
  safeUseRoute('/api/auth', authRoutes, 'Auth routes');
} catch (error) {
  console.error('❌ Error with auth routes:', error.message);
}

try {
  const courseRoutes = require('./routes/courses');
  safeUseRoute('/api/courses', courseRoutes, 'Course routes');
} catch (error) {
  console.error('❌ Error with course routes:', error.message);
}

try {
  const blogRoutes = require('./routes/blogs');
  safeUseRoute('/api/blogs', blogRoutes, 'Blog routes');
} catch (error) {
  console.error('❌ Error with blog routes:', error.message);
}

try {
  const paymentRoutes = require('./routes/payments');
  safeUseRoute('/api/payments', paymentRoutes, 'Payment routes');
} catch (error) {
  console.error('❌ Error with payment routes:', error.message);
}

try {
  const adminRoutes = require('./routes/admin');
  safeUseRoute('/api/admin', adminRoutes, 'Admin routes');
} catch (error) {
  console.error('❌ Error with admin routes:', error.message);
}

console.log('\n✅ All routes processed!\n');

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 Forexism API Server is running!', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    databaseType: 'MongoDB Atlas',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    success: true,
    message: 'Forexism API', 
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      blogs: '/api/blogs',
      payments: '/api/payments',
      admin: '/api/admin'
    },
    status: 'operational'
  });
});

// Database connection status endpoint
app.get('/api/db-status', (req, res) => {
  const status = mongoose.connection.readyState;
  const statusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[status] || 'unknown';
  
  res.json({
    success: status === 1,
    database: statusText,
    readyState: status
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Global Error Handler:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start Server
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 ================================');
  console.log(`🚀 Forexism Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
  console.log(`📍 CORS Enabled for: http://localhost:3000`);
  console.log('🚀 ================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💤 Process terminated');
  });
});

module.exports = app;
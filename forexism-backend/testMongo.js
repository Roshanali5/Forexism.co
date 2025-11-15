// testMongo.js
const { MongoClient, ServerApiVersion } = require('mongodb');

// ✅ Use your real connection string
const uri = "mongodb+srv://Forexism:Pakistan%40403@cluster0.4nnzfd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Try connecting to MongoDB Atlas
    await client.connect();

    // Send a ping to verify the connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    await client.close();
  }
}

run();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nfyjflh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// async function run() {
//   try {
//     // const categoryCollection = client.db("gearUP").collection("categories");

//     // app.get("/users", async (req, res) => {
//     //   const query = {};
//     //   const cursor = userCollection.find(query);
//     //   const users = await cursor.toArray();
//     //   res.send(users);
//     // });
    
//   } finally {
//   }
// }

// run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Instatown server is running");
});

app.listen(port, () => {
  console.log(`Instatown Server running on port: ${port}`);
});
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

async function run() {
  try {
    const aboutMeCollection = client.db("InstaTown").collection("AboutMe");
    const postCollection = client.db("InstaTown").collection("Posts");

    app.get("/about", async (req, res) => {
      const query = {};
      const cursor = aboutMeCollection.find(query);
      const about = await cursor.toArray();
      res.send(about);
    });

    app.get("/posts", async (req, res) => {
      const query = {};
      const cursor = postCollection.find(query);
      const post = await cursor.toArray();
      res.send(post);
    });

    app.post("/posts", async (req, res) => {
      const post = req.body;
      console.log(post);
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    // app.get('/about/update/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const about = await aboutMeCollection.findOne(query);
    //   console.log('inside update',about)
    //   res.send(about);
    // });

    
  } finally {
    
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Instatown server is running");
});

app.listen(port, () => {
  console.log(`Instatown Server running on port: ${port}`);
});
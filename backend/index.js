const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Message = require("./models/Message.js");
const { response } = require("express");
const server = http.createServer(app)


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.2mhfj.mongodb.net/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)).catch(err => console.error('Error connecting to mongo', err));



app.get("/getPost", (req, res) => Message.find().then((response) => res.json(response)));


// app.patch('/update/:postId', (req, res) => {
//   console.log(req)
//   Message.findByIdAndUpdate(req.params.postId, { $inc: { likes: 1 } }, { new: true })
//     .then((response) => {
//       res.status(200).json(response);
//     })
// })


app.post("/", (req, res) => {
  console.log(req.body)
  Message.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
});

server.listen(5000, () => console.log("Listening on port 5000"));
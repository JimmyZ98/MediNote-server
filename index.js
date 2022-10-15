const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiKey = process.env.COHERE_API_KEY;
const cohere = require("cohere-ai");
const port = process.env.PORT || 8080;
const app = express();

// cohere.init(apiKey);

app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//   const response = await cohere.generate({
//     model: "large",
//     prompt:
//       "This is a spell check generator that capitalizes samples of text.\n\nSample: a new type OF aurora FounD on saturn resolves a planetary mystery\nCapitalized Text: A New Type Of Aurora Found On Saturn Resolves A Planetary Mystery\n--\nSample: online Shopping is ReSHaping Real-world Cities\nTitle Case: Online Shopping Is Reshaping Real-World Cities\n--\nSample: When you close 100 TAbs AFter Finding THE SoluTion To A BuG\nTitle Case: When You Close 100 Tabs After Finding The Solution To A Bug\n--\nSample: mastering DYNAmIC ProGrammING\nTitle Case:",
//     max_tokens: 50,
//     temperature: 0.3,
//     k: 0,
//     p: 0.75,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stop_sequences: ["--"],
//     return_likelihoods: "NONE",
//   });
//   console.log(`Prediction: ${response.body.generations[0].text}`);
//   res.send("works");
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

const axios = require("axios");
const fs = require("fs");
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "e4e9c3804a724c0aae4407ae6a538981",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});
const file = "data/Upload/SampleAudio.mp4";
fs.readFile(file, (err, data) => {
  if (err) return console.error(err);

  // assembly
  //   .post("/upload", data)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.error(err));

  assembly
    .post("/transcript", {
      audio_url:
        "https://cdn.assemblyai.com/upload/c3ad4b08-6cfd-4601-a497-def7819b63dd",
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
});

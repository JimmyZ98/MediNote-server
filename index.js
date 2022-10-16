const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiKey = process.env.COHERE_API_KEY;
const cohere = require("cohere-ai");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());


app.use(cors());
app.use(express.json());

// cohere.init(apiKey);

// app.get("/", async (req, res) => {
//   const response = await cohere.generate({
//     model: "large",
//     prompt: 'Given a medical note, please return the disease diagnosis, symptoms, patient, date, condition, prescription of the patient\n\nMedical Note: \nSo we have Kevin Lin, our patient. Admitted on July 6th, 2021, Not yet discharged. Date of birth is November 12th, 1998 and sex is male. Treatment is right hemi. Symptoms are slight nausea and coughs. Observations are stable. Patient looks generally well or confused. Plan for patient is to repeat U&E, and replace K+ if less than 4, uh - Continue Physio, Leave Catheter, Remove drain, and er- Oral Fluids only for now\n\nTreatment: right hemi\nSymptom: nausea and cough\nPatient: Kevin Lin\nDate: July 6th\nCondition: stable\nPrescription: repeat U&E, and replace K+ if less than 4, uh - Continue Physio, Leave Catheter, Remove drain, and er- Oral Fluids only for now\n\n--\nMedical Note: \nOur Patient is Lydia Shan, Admitted on July 10th, 2021, and discharged on July 7th, 2022. Date of birth is November 11th, 1999 and sex is female. Treatment is not understood. Symtoms are sickness and cold. Observations are unstable. Patient is febrile at uh 1750, mom said she wasn’t taking fluids PO, IV meds at 1800 uh- skipped due to intolerance. Plan for patient is to take meds with applesauce. \n\n', 
//     max_tokens: 200,
//     temperature: 0.3,
//     k: 0,
//     p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stop_sequences: ["--"],
//     return_likelihoods: "NONE",
//   });
//   console.log(${response.body.generations[0].text});
//   res.send("generated")
// });


const axios = require("axios");
const fs = require("fs");
const { get } = require("http");
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "e4e9c3804a724c0aae4407ae6a538981",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});
const file = "data/Upload/SampleAudio1.mp3";

let audioID;

app.get("/", (req, response) => {
  fs.readFile(file, (err, data) => {
    if (err) return console.error(err);
    console.log("audio file uploading...");
    assembly.post("/upload", data).then((res) => {
      assembly
        .post("/transcript", {
          audio_url: res.data.upload_url,
          auto_highlights: true,
          entity_detection: true,
        })
        .then((res) => {
          console.log(res.data);
          audioID = res.data.id;

          const getData = () => {
            console.log("data processing");
            assembly.get(`/transcript/${audioID}`).then((res) => {
              if (res.data.status === "completed") {
                clearInterval(interval);
                console.log(res.data);
                response.send({ data: res.data });
                return res.data;
              }
            });
          };
          const interval = setInterval(getData, 1000);
        })
        .catch((err) => console.error(err));
    });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

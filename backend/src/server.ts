import express from "express";
import * as dotenv from "dotenv";
import bodyParser = require("body-parser");
import cors from "cors";

dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post("/chat", (req, res) => {
  // res.status(200).json(req.body);
  if (!req.body.text) {
    res.status(401).json({ err: "give a prompt" });
  }
  const fun = async () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        temperature: 1,
        max_tokens: 1004,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.status(200).json(completion.data.choices[0].text);
    } catch (error: any) {
      if (error.response) {
        res.status(200).json({ err: error.response.status });
        res.status(200).json({ err: error.response.data });
      } else {
        res.status(200).json({ err: error.response.message });
      }
    }
  };
  fun();
});

app.listen(process.env.PORT, () => {
  console.log("hello world");
});

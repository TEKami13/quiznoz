import express from "express";
import {randomQuestion} from "./questions.js";

const app = express();

app.use(express.static("../client/dist"));

app.get("/api/question/random", (req, res) => {
    res.json(randomQuestion()).send()
})

app.listen(3000)
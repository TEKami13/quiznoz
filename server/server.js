import express from "express";
import bodyParser from "body-parser";
import cookieParse from "cookie-parser";
import {isCorrectAnswer, randomQuestion, Questions} from "./questions.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParse("random-noise-to-sign-cookies"));
app.use(express.static("../client/dist"));

app.get("/api/question/random", (req, res) => {
    const {id, question, answers} = randomQuestion();
    res.json(randomQuestion()).send()
})

app.post("/api/questions/answer", (req, res) => {
    const {id, answer} = req.body;
    const question = Questions.find(q => q.id === id);
    const correct = isCorrectAnswer(question, answer);

    const score = req.signedCookies?.quizScore
        ? JSON.parse(req.signedCookies.quizScore)
        : {answers: 0, correctAnswer: 0}

    const {answers, correctAnswers} = score;
    const newScore = {
        answers: answers+1,
        correctAnswers: correctAnswers + (corrext ? 1 : 0)
    }
    console.log(req.signedCookies, {score, newScore});
    res
        .cookies("quizScore", JSON.stringify(newScore), {signed: true})
        .json({correct})
})

app.get("/api/score", (req, res) => {
    const score = req.signedCookies?.quizScore
        ? JSON.parse(req.signedCookies?.quizScore)
        : {answers: 0, correctAnswers: 0}
    res.json(score);
    res.json({score});
})

app.listen(3000)
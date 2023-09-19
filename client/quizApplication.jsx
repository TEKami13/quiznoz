import {HashRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {isCorrectAnswer} from "../questions";

function FrontPage() {
    return (
        <>
            <h2>Welcome</h2>
            <Link to={"/question"}>Ask a question</Link>
        </>
    );
}

function QuestionAnswerButton({answer, onClick}) {
    return (
        <div>
            <button onClick={onClick}>{answer}</button>
        </div>
    );
}

export function Question({question, onClickAnswer}) {
    if (!question) {
        return <div>Loading...</div>
    }
    return (
        <>
            <h2>Can you answer this?</h2>
            <p>{question.question}</p>
            {Object.keys(question.answers)
                .filter((k) => question.answers[k])
                .map((k) => (
                    <QuestionAnswerButton
                        key={k}
                        answer={question.answers[k]}
                        onClick={() => onClickAnswer(k)}
                    />
                ))}
        </>
    );
}

function ShowAnswer({onAskAnother}) {
    return (
        <>
            <Routes>
                <Route path={"/correct"} element={<h2>That's correct!</h2>} />
                <Route path={"/wrong"} element={<h2>That's wrong!</h2>} />
            </Routes>
            <div>
                <button onClick={onAskAnother}>Ask me another question</button>
            </div>
        </>
    );
}

function Quiz() {
    const [question, setQuestion] = useState();

    async function fetchRandomQuestion() {
        const res = await fetch("/api/questions/random");
        setQuestion(await res.json());
    }

    useEffect(() => {
        fetchRandomQuestion();
    }, [])

    const navigateFn = useNavigate();

    function handleClickAnswer(answer) {
        if (isCorrectAnswer(question, answer)) {
            navigateFn("/answer/correct");
        } else {
            navigateFn("/answer/wrong");
        }
    }

    async function handleAskAnother() {
        await fetchRandomQuestion();
        navigateFn("/question");
    }

    return (
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route
                path={"/answer/*"}
                element={<ShowAnswer onAskAnother={handleAskAnother}/>}
            />
            <Route
                path={"/question"}
                element={
                    <Question question={question} onClickAnswer={handleClickAnswer} />
                }
            />
            <Route path={"*"} element={<h2>Not Found</h2>} />
        </Routes>
    );
}

export function QuizApplication() {
    return (
        <HashRouter>
            <header>
                <h1>React quiz app with express backend</h1>
            </header>
            <nav>
                <Link to={"/"}>Front page</Link>
            </nav>
            <main>
                <Quiz />
            </main>
        </HashRouter>
    );
}
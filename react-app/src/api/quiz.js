import { csrfFetch } from "../store/csrf";

export const getQuiz = async (id) => {
    const res = await csrfFetch(`/api/quizzes/${Number(id)}`);

    const quizData = await res.json();

    return quizData;
  };

  export const getQuestion = async (id) => {
    const res = await csrfFetch(`/api/questions/${Number(id)}`);

    const questionData = await res.json();

    return questionData;
  };
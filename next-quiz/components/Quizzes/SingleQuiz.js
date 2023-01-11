import React, { useEffect, useState } from "react";

// this will display list of all quizzes
const SingleQuiz = ({id}) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`http://localhost:5000/api/quizzes/${id}`);
        const jsonData = await data.json();
        setQuizzes(jsonData.quizzes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData().catch(console.error);
  }, [id]);

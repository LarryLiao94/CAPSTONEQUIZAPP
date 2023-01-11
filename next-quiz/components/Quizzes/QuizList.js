import Link from "next/link";
import React, { useEffect, useState } from "react";

// this will display list of all quizzes
const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const login = await fetch("http://localhost:5000/api/auth/login", {
        //     method:"POST",

        // });
        const data = await fetch("http://localhost:5000/api/quizzes/");
        const jsonData = await data.json();
        setQuizzes(jsonData.quizzes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      {quizzes.map((quiz) => {
        return (
          <div key={quiz.id}>
            <Link href={`/quiz/${quiz.id}`}>{quiz.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuizList;

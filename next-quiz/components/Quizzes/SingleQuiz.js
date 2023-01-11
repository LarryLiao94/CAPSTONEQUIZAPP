import React, { useEffect, useState } from "react";

// this will display list of all quizzes
const SingleQuiz = ({id}) => {
  const { data: quiz } = useSWR(`/api/quizzes/${id}/`);

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <ul>
        {quiz.questions.map(question => (
          <li key={question.id}>{question.question_text}</li>
        ))}
      </ul>
    </div>
  );
}

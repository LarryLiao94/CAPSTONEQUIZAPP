// import { useRouter } from "next/router";
// import DefaultLayout from "../../components/layouts/default-layout";

// const QuizPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <DefaultLayout>
//       <p>Show the Quiz id : {id}</p>
//     </DefaultLayout>
//   );
// };

// export default QuizPage;

import { useRouter } from "next/router";
import useSWR from 'swr'
import { useState } from 'react';
import DefaultLayout from "../../components/layouts/default-layout";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userAnswers,setUserAnswers] = useState({});

  const { data: quiz } = useSWR(
    id ? `http://localhost:5000/api/quizzes/${id}` : null,
    async (url) => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        return json;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    { watch: id }
  );

  if (!quiz) {
    return <div>Loading...</div>;
  }
  function handleChange(e, questionId) {
    setUserAnswers({...userAnswers, [questionId]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/quiz/' + id + '/answer', {
        method: 'POST',
        body: JSON.stringify({ userAnswers }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        router.push('/result/' + id)
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <DefaultLayout>
        <div className="text-center">
          <h1 className="text-3xl font-medium">{quiz.title}</h1>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <p className="text-xl font-medium">{question.question_text}</p>
            <ul className="mt-2">
              {question.choices.map((choice) => (
                <li key={choice.id} className="flex items-center">
                  <input
                    type="radio"
                    id={choice.id}
                    name={question.id}
                    value={choice.choice}
                    onChange={(e) => handleChange(e, question.id)}
                    className="form-radio h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"/>
                  <label htmlFor={choice.id} className="ml-3">{choice.choice}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Submit</button>
        </form>
    </DefaultLayout>
  );
};

export default QuizPage;

// const QuizPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [userAnswers,setUserAnswers] = useState({});

//   const { data: quiz } = useSWR(`/api/quizzes/${id}/`);

//   console.log(quiz)


//   // const { data: quiz } = useQuery(['quiz', id], () =>
//   //   fetch(`/api/quizzes/${id}`).then(res => res.json())
//   // );

  // function handleChange(e, questionId) {
  //   setUserAnswers({...userAnswers, [questionId]: e.target.value });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch('/api/quiz/' + id + '/answer', {
  //       method: 'POST',
  //       body: JSON.stringify({ userAnswers }),
  //       headers: { 'Content-Type': 'application/json' },
  //   })
  //   .then(response => {
  //       router.push('/result/' + id)
  //   }).catch(error => {
  //       console.log(error);
  //   });
  // }
//   return (
//     <DefaultLayout>
//       {/* <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-medium">{quiz.title}</h1>
//         </div>
//         <form className="mt-8" onSubmit={handleSubmit}>
//         {quiz.questions.map((question, index) => (
//           <div key={question.id} className="mb-4">
//             <p className="text-xl font-medium">{question.question_text}</p>
//             <ul className="mt-2">
//               {question.choices.map((choice) => (
//                 <li key={choice.id} className="flex items-center">
//                   <input
//                     type="radio"
//                     id={choice.id}
//                     name={question.id}
//                     value={choice.choice}
//                     onChange={(e) => handleChange(e, question.id)}
//                     className="form-radio h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"/>
//                   <label htmlFor={choice.id} className="ml-3">{choice.choice}</label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Submit</button>
//         </form>
//       </div> */}
//       <div>
//         quiz.title
//       </div>
//     </DefaultLayout>
//   );
// };

// export default QuizPage;

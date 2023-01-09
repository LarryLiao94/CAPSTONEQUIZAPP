import { useState } from "react";

export default function QuestionCreator() {
  const [choices, setChoices] = useState([]);
  const [choice, setChocie] = useState("");
  const [question, setQuestion] = useState("");

  const handleChoiceInputChange = (e) => {
    setChocie(e.target.value);
  };

  const handleQuestionInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddClick = (e) => {
    console.log({ choice });
    setChoices([...choices, choice]);
    setChocie("");
  };

  const handleQuestionSubmit = (e) => {
    // should do a request to the back end
    // post /questions
    console.log(question, choices);

    axios.post('/answers', answers)
  };

  console.log({ choices });

  return (
    <form onSubmit={handleFormSubmit}>
      <input placeholder="who are you?" onChange={handleQuestionInputChange} />

      <div>
        {choices.map((choice) => {
          return <div>{choice}</div>;
        })}
        <input
          value={choice}
          placeholder="otherchoice"
          onChange={handleChoiceInputChange}
        />
        <button onClick={handleAddClick}>add choice</button>
      </div>

      <button onClick={handleQuestionSubmit}>Add Question</button>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { getQuizByIdThunk } from "../../store/quiz";
import {useSelector, useDispatch} from "react-redux"

function Quiz() {
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [color, setColor] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch();
    const quizzes = useSelector((state) => state.quizzes);
  
    useEffect(() => {
      const getQuiz = async () => {
          const quiz = await dispatch(getQuizByIdThunk(id))
          setQuiz(quiz)
      }
      getQuiz(quiz)
      setLoading(false)
    }, [id,dispatch]);

    if (loading) {
        return <div>Loading...</div>;
      }
  
    const handleSubmit = () => {
      // Handle form submission here
      console.log("Form submitted");
      let correctAnswers = 0;
      quizzes.questions.forEach((question) => {
          const chosenAnswer = question.choices.find((choice) => choice.id === selectedAnswers[question.id])
          if(chosenAnswer.is_correct){
                setColor("green")
              correctAnswers++
          }
          else{
            setColor("red")
          }
      });
      console.log(`You got ${correctAnswers} out of ${quizzes.questions.length} correct`);
    };
    
    return (
      <Box>
        <Typography variant="h2" align="center">
          {quizzes?.title}
        </Typography>
        {quizzes?.questions?.map((question, index) => (
          <Box key={question.id} mb={3}>
            <Typography variant="h4">
              {`Question ${index + 1}: ${question.questiontext}`}
            </Typography>
            <RadioGroup name={`question-${question.id}`}>
              {question.choices.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  value={choice.id}
                  control={
                    <Radio
                      checked={selectedAnswers[question.id] === choice.id}
                      onChange={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [question.id]: choice.id
                        })
                      }
                    />
                  }
                  label={choice.choice}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Box mt={3}>
          <button onClick={handleSubmit}>Submit</button>
        </Box>
      </Box>
    );
  }

  export default Quiz
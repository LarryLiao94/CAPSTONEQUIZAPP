import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getQuizByIdThunk } from "../../store/quiz";
import {useSelector, useDispatch} from "react-redux";

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
      <Container maxWidth="false" sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Stack spacing={10} justifyContent="center" alignItems="center">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: '50px' }}>
            <Typography variant="h2">
              {quizzes?.title}
            </Typography>
          </Box>
          {quizzes?.questions?.map((question, index) => (
            <Box 
              key={question.id} 
              mb={3} 
              sx={{
                width: '60%',
                bgcolor: 'white',
                borderRadius: 2
              }}
            >
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <Typography variant="h4">
                  {`Question ${index + 1}: ${question.question_text}`}
                </Typography>
                {/* <FormGroup name={`question-${question.id}`} sx={{paddingTop: '50px' }}>
                  <FormControlLabel value="female" control={<Checkbox />} label="Female" />
                </FormGroup> */}
                <RadioGroup name={`question-${question.id}`} sx={{paddingTop: '20px' }}>
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
              </FormControl>
            </Box>
          ))}
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <Stack direction="row" spacing={2}>
              <Button size="large" variant="contained">Add Question</Button>
              <Button size="large" variant="contained" onClick={handleSubmit} color="secondary">Submit</Button>
            </Stack>
          </FormControl>
        </Stack>
      </Container>
    );
  }

  export default Quiz
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { addQuizThunk } from '../../store/quiz';
import { useDispatch } from 'react-redux';
import { addQuestionThunk } from '../../store/question';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreateQuestion() {
  const classes = useStyles();
  const [quiz, setQuiz] = useState({ title: '', questions: [{ question_text: '', choices: [{ choice: '', is_correct: false }]}]} );
  const [question, setQuestion] = useState({ question_text: '', choices: [{ choice: '', is_correct: false }] });
  const [choice, setChoice] = useState({ choice: '', is_correct: false });
  const [correctChoice, setCorrectChoice] = useState(-1);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleQuizChange = (event) => {
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const handleQuestionChange = (event) => {
    console.log(event)
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };

  const handleChoiceChange = (event) => {
    setChoice({ ...choice, [event.target.name]: event.target.value });
  };

  // const handleCorrectChange = (event) => {
  //   setChoice({ ...choice, is_correct: event.target.checked });
  // };
  const handleCorrectChange = (event, index) => {
    if (index === correctChoice) {
      setCorrectChoice(-1);
    } else {
      setCorrectChoice(index);
    }
  }
  
  const handleAddQuestion = (event) => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ question_text: '', choices: [{ choice: '', is_correct: false }] });
  };

  const handleAddChoice = (event) => {
    console.log(event)
    setQuestion({ ...question, choices: [...question.choices, choice] });
    setChoice({ choice: '', is_correct: false });
  };

  const handleSubmit = async (event, history) => {
    
    event.preventDefault();
    try {
      // send quiz data to server and dispatch addQuiz action
      const newQuiz = await dispatch(addQuestionThunk(question));
      // navigate to the new quiz's page
      history.push(`/dashboard`);
  } catch (res) {
      // handle error
      setErrors([]);
      // const data = await res.json();
      // if (data && data.errors) setErrors(data.errors);
  }
    console.log(quiz);
  };

  return (
    <Container maxWidth="false" sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: '50px' }}>
          <Typography variant="h2" component="h3">
            Create Question
          </Typography>
        </Box>
        <Box
          sx={{
            width: '60%',
            bgcolor: 'white',
            borderRadius: 2
          }}
        >
            <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={1}
                  label="Question #1"
                  name="questiontext"
                  onChange={handleQuestionChange}
                  variant="standard"
                />
              </FormControl>
              {question.choices.map((c, i) => (
                <Box key={i + 1}>
                <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                  <TextField
                    id={i + 1}
                    label={"Choice-" + (i + 1)}
                    name="choice"
                    onChange={handleChoiceChange}
                    variant="standard"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                  <Typography>
                    Is Correct: 
                    <Checkbox
                      checked={i === correctChoice}
                      onChange={(event) => handleCorrectChange(event, i)}
                    />
                  </Typography>
                </FormControl>
              </Box>
              ))}
              <Button sx={{ p: 2 }} endIcon={<AddIcon />} onClick={handleAddChoice}>Add Choice</Button>
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <Stack direction="row" spacing={2}>
              <Button size="large" variant="contained" onClick={handleSubmit} color="secondary">Submit</Button>
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateQuestion;
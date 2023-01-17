import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreateQuiz() {
  const classes = useStyles();
  const [quiz, setQuiz] = useState({ title: '', questions: [] });
  const [question, setQuestion] = useState({ question_text: '', choices: [] });
  const [choice, setChoice] = useState({ choice: '', is_correct: false });

  const handleQuizChange = (event) => {
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const handleQuestionChange = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };

  const handleChoiceChange = (event) => {
    setChoice({ ...choice, [event.target.name]: event.target.value });
  };

  const handleCorrectChange = (event) => {
    setChoice({ ...choice, is_correct: event.target.checked });
  };

  const handleAddQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ questiontext: '', choices: [] });
  };

  const handleAddChoice = () => {
    setQuestion({ ...question, choices: [...question.choices, choice] });
    setChoice({ choice: '', is_correct: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send quiz data to server here
    console.log(quiz);
  };

  return (
    <form className={classes.root}>
      <Card>
        <CardContent>
          <TextField
            label="Quiz Title"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            variant="outlined"
          />

          <List>
            {quiz.questions.map((q, index) => (
              <ListItem key={index}>
                <ListItemText primary={q.questiontext} />
              </ListItem>
            ))}
          </List>

          <TextField
            label="Question"
            name="questiontext"
            value={question.questiontext}
            onChange={handleQuestionChange}
            variant="outlined"
          />

          <List>
            {question.choices.map((c, index) => (
              <ListItem key={index}>
                <ListItemText primary={c.choice} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={c.is_correct}
                    onChange={handleCorrectChange}
                    name="is_correct"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <TextField
            label="Choice"
            name="choice"
            value={choice.choice}
            onChange={handleChoiceChange}
            variant="outlined"
          />
        </CardContent>
        <CardActions>
            <Container>
          <Button onClick={handleAddQuestion}>Add Question</Button>
          <Button onClick={handleAddChoice}>Add Choice</Button>
          </Container>
        </CardActions>
      </Card>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

export default CreateQuiz;
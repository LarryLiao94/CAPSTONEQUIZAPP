import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { addQuizThunk } from "../../store/quiz";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CreateQuiz() {
  const history = useHistory();
  const [quiz, setQuiz] = useState([
    {
      question_text: "",
      choices: [
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
      ],
      name: `name${1}`,
    },
  ]);

  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleAddQuestion = () => {
    const newQuestion = {
      question_text: "",
      choices: [
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
        { choice: "", is_correct: false },
      ],
      name: `name${quiz.length + 1}`,
    };

    setQuiz((prevState) => [...prevState, newQuestion]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizItem = { title, questions: quiz };
    console.log('quizItem!!!', quizItem)
    await dispatch(addQuizThunk({ title }));
    history.push(`/dashboard`);
    console.log(quiz);
  };

  
  const handleTitleChange = (e) => setTitle(e.target.value);
  
  const handleCheckBox = (e, index) => {
    const name = e.target.name;
    const newQuiz = quiz.map((q) => {
      if (q.name === name) {
        q.choices.map((c, i) => {
          if (index === i) {
            c.is_correct = !c.is_correct;
          } else {
            c.is_correct = false;
          }
          return c;
        });
      }
      return q;
    });

    setQuiz(newQuiz);
  };

  const handleChoiceChange = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;
    const newQuiz = quiz.map((q) => {
      if (q.name === name) {
        q.choices.map((c, i) => {
          if (index === i) {
            c.choice = value;
          }
          return c;
        });
      }
      return q;
    });

    setQuiz(newQuiz);
  }

  const handleQuestiontTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newQuiz = quiz.map((q) => {
      if (q.name === name) {
        q.question_text = value;
      }
      return q;
    });

    setQuiz(newQuiz);
  }

  // useEffect(() => {
  //   console.log("quiz>>", quiz)
  // }, [quiz]);

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2" component="h3">
            Create Quiz
          </Typography>
        </Box>
        <Box
          sx={{
            width: "60%",
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <TextField
              id="standard-title"
              label="Quiz Title"
              name="title"
              value={title}
              variant="standard"
              onChange={handleTitleChange}
            />
          </FormControl>
          {quiz.map((question, index) => (
            <Box key={index + 1}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={index + 1}
                  label={"Question #" + (index + 1)}
                  name={question.name}
                  variant="standard"
                  value={question.question_text}
                  onChange={(e) => handleQuestiontTextChange(e)}
                />
              </FormControl>
              {question.choices.map((c, i) => (
                <Box key={i + 1}>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <TextField
                      id={i + 1}
                      label={"Choice-" + (i + 1)}
                      name={question.name}
                      variant="standard"
                      value={c.choice}
                      onChange={(event) => handleChoiceChange(event, i)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <Typography>
                      Is Correct:
                      <Checkbox
                        checked={c.is_correct}
                        name={question.name}
                        onChange={(event) => handleCheckBox(event, i)}
                      />
                    </Typography>
                  </FormControl>
                </Box>
              ))}
            </Box>
          ))}
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <Stack direction="row" spacing={2}>
              <Button
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                color="secondary"
              >
                Submit
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateQuiz;

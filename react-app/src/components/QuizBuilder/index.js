import React, { useState } from "react";
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
      questiontext: "",
      choices: [
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
      ],
      name: `name${1}`,
    },
  ]);

  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleAddQuestion = () => {
    const newQuestion = {
      questiontext: "",
      choices: [
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
        { choice: "", isCorrect: false },
      ],
      name: `name${quiz.length + 1}`,
    };
    setQuiz((prevState) => [...prevState, newQuestion]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizItem = { title, questions: quiz };
    console.log("okay!!", quizItem)
    await dispatch(addQuizThunk({title}));
    history.push(`/dashboard`);
    console.log(quiz);
  };

  const handleCheckBox = (e, index) => {
    const name = e.target.name;
    const newQuiz = quiz.map((q) => {
      if (q.name === name) {
        q.choices.map((c, i) => {
          if (index === i) {
            c.isCorrect = !c.isCorrect;
          } else {
            c.isCorrect = false;
          }
          return c;
        });
      }
      return q;
    });

    setQuiz(newQuiz);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

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
                  name="questiontext"
                  variant="standard"
                />
              </FormControl>
              {question.choices.map((choice, i) => (
                <Box key={i + 1}>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <TextField
                      id={i + 1}
                      label={"Choice-" + (i + 1)}
                      name="choice"
                      variant="standard"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <Typography>
                      Is Correct:
                      <Checkbox
                        checked={choice.isCorrect}
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

import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { addQuizThunk } from "../../store/quiz";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormHelperText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  questionContainer: {
    backgroundColor: "lightgray",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  choiceContainer: {
    marginTop: theme.spacing(2),
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
  const [titleValid, setTitleValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [choiceError, setChoiceError] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showCheckBoxError, setShowCheckBoxError] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const isCorrectAnswerSelected = (choices) => {
    return choices.some((c) => c.is_correct === true);
  };

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

  const handleRemoveQuestion = () => {
    setQuiz((prevState) => {
      if (prevState.length > 0) {
        return prevState.slice(0, prevState.length - 1);
      } else {
        return;
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    let questionTextEmpty = false;
    let choiceEmpty = false;
    let checkboxChecked = false;
    quiz.forEach((q) => {
      if (q.question_text === "") {
        questionTextEmpty = true;
      }

      q.choices.forEach((c) => {
        if (c.choice === "") {
          choiceEmpty = true;
        }
      });
    });
    if(quiz.every(q => isCorrectAnswerSelected(q.choices))){
      checkboxChecked = true
    }

    if (!titleValid) {
      return;
    } else if (questionTextEmpty) {
      return;
    } else if (choiceEmpty) {
      return;
    } else if (!checkboxChecked) {
      return;
    }
    

    

    const quizItem = { title, questions: quiz };
    await dispatch(addQuizThunk({ title, questions: quizItem.questions }));
    history.push(`/dashboard`);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(e.target.value !== "");
  };

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

    const isCorrectChoice = newQuiz.find((q) =>
      q.choices.some((c) => c.is_correct)
    );
    if (!isCorrectChoice) {
      setErrors({ ...errors, [name]: "One choice must be marked as correct." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setQuiz(newQuiz);
  };


  const handleChoiceChange = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value) {
      setChoiceError({ ...choiceError, [index]: "" });
    } else {
      setChoiceError({ ...choiceError, [index]: "This field is required" });
    }
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
  };

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
  };



  return (
    <Container
      maxWidth="false"
      sx={{ bgcolor: "#cfe8fc", height: "unset", minHeight: "100vh" }}
    >
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
              error={formSubmitted && !titleValid}
              helperText={
                formSubmitted && !titleValid ? "Please enter a title" : ""
              }
            />
          </FormControl>
          {quiz.map((question, index) => (
            <Box key={index + 1}>
              <FormControl
                fullWidth
                sx={{ p: 2 }}
                variant="filled"
                className={classes.questionContainer}
              >
                <TextField
                  id={index + 1}
                  label={"Question #" + (index + 1)}
                  name={question.name}
                  variant="standard"
                  value={question.question_text}
                  onChange={(e) => handleQuestiontTextChange(e)}
                  error={formSubmitted && question.question_text === ""}
                  helperText={
                    formSubmitted && question.question_text === ""
                      ? "Please enter a question"
                      : ""
                  }
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
                      error={formSubmitted && c.choice === ""}
                      helperText={
                        formSubmitted && c.choice === ""
                          ? "Please enter a choice"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormControl error={formSubmitted && !isCorrectAnswerSelected(question.choices)} fullWidth sx={{ p: 2 }} variant="filled">
                    <Typography>
                      Is Correct:
                      <Checkbox
                        checked={c.is_correct}
                        name={question.name}
                        onChange={(event) => handleCheckBox(event, i)}
                      />
                    </Typography>
                    {formSubmitted &&
                      !c.is_correct &&
                      !isCorrectAnswerSelected(question.choices) && (
                        <FormHelperText error>
                          Please select a correct answer
                        </FormHelperText>
                      )}
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
              {quiz.length > 1 && (
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveQuestion}
                >
                  Remove Question
                </Button>
              )}

              <Button
                size="large"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                color="secondary"
              >
                Submit
              </Button>

              {/* {showCheckBoxError && (
                <div className="checkbox-error">
                  <small className="text-danger">
                    Please select a checkbox!
                  </small>
                </div>
              )} */}
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateQuiz;

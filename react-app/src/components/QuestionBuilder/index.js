import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionThunk } from "../../store/question";
import { useHistory } from "react-router-dom";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { getProfileQuizThunk } from "../../store/quiz";
import { Grid } from "@mui/material";
import { FormHelperText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CreateQuestion() {
  const classes = useStyles();
  const [question_text, setQuestion_Text] = useState("");
  const [loading, setLoading] = useState(true);
  const [category_id, setCategory_Id] = useState(null);
  const [quiz_id, setQuiz_id] = useState(null);
  const [question, setQuestion] = useState({
    question_text: "",
    category_id: null,
    choices: [
      { choice: "", is_correct: false },
      { choice: "", is_correct: false },
      { choice: "", is_correct: false },
      { choice: "", is_correct: false },
    ],
    name: `name${1}`,
  });
  const [error, setError] = useState({});
  const [showChoiceError, setShowChoiceError] = useState(false);
  const [showCheckBoxError, setShowCheckBoxError] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes.quizzes);

  const categories = useSelector((state) => state.categories.categories);

  const handleQuestiontTextChange = (e) => setQuestion_Text(e.target.value);

  const handleCategoryIdChange = (e) => setCategory_Id(e.target.value);

  const handleQuizIdChange = (e) => setQuiz_id(e.target.value);

  const handleCheckBox = (e, index) => {
    const name = e.target.name;
    const newQuestion = { ...question };
    newQuestion.choices.map((c, i) => {
      if (index === i) {
        c.is_correct = !c.is_correct;
      } else {
        c.is_correct = false;
      }
      return c;
    });
    setQuestion(newQuestion);
  };

  const handleChoiceChange = (e, index) => {
    const value = e.target.value;
    const newQuestion = { ...question };
    newQuestion.choices.map((c, i) => {
      if (index === i) {
        c.choice = value;
      }
      return c;
    });
    setQuestion(newQuestion);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    let isChoiceBlank = false;
    let isCheckBoxChecked = false;
    let questionItem = {};
    if (!question_text) {
      setError({ ...error, question_text: "Question text is required." });
    }

    if (!category_id) {
      setError({ ...error, category_id: "Category is required." });
    }

    question?.choices.forEach((c) => {
      if (c.choice === "") {
        isChoiceBlank = true;
      }
      if (c.is_correct) {
        isCheckBoxChecked = true;
      }
    });
    if (isChoiceBlank) {
      setShowChoiceError(true);
    } else if (!isCheckBoxChecked) {
      setShowCheckBoxError(true);
    } else {
      setShowChoiceError(false);
      setShowCheckBoxError(false);
      // submit the form data
      if (question_text && category_id) {
        if (quiz_id) {
          questionItem = {
            question_text,
            choices: question.choices,
            category_id,
            quiz_id,
          };
          await dispatch(
            addQuestionThunk({
              question_text,
              category_id,
              quiz_id,
              choices: questionItem.choices,
            })
          );
        } else {
          questionItem = {
            question_text,
            choices: question.choices,
            category_id,
          };
          await dispatch(
            addQuestionThunk({
              question_text,
              category_id,
              choices: questionItem.choices,
            })
          );
        }
      }

      history.push(`/dashboard`);
    }
  };

  useEffect(() => {
    const profileQuiz = async () => {
      const profileQuizzes = await dispatch(getProfileQuizThunk());
      setLoading(false);
    };
    profileQuiz();
  }, [dispatch]);

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2" component="h3">
            Create Question
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
              id={1}
              label="Question Text"
              name="questiontext"
              value={question_text}
              onChange={handleQuestiontTextChange}
              variant="standard"
              error={!!error.question_text}
              helperText={error.question_text}
              inputProps={{ maxLength: 255 }}
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category_id}
                  onChange={handleCategoryIdChange}
                  error={!!error.category_id}
                >
                  <MenuItem value="">
                    <em>Choose a category</em>
                  </MenuItem>
                  {Object?.values(categories)?.map((category, index) => (
                    <MenuItem key={index} value={category?.id}>
                      {category?.title}
                    </MenuItem>
                  ))}
                </Select>
                {error.category_id && (
                  <FormHelperText error>{error.category_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <InputLabel id="quiz-select-label">Quiz</InputLabel>
                <Select
                  labelId="quiz-select-label"
                  id="quiz-select"
                  value={quiz_id}
                  onChange={handleQuizIdChange}
                >
                  <MenuItem value="">
                    <em>Choose a quiz</em>
                  </MenuItem>
                  {quizzes?.map((quiz, index) => (
                    <MenuItem key={index} value={quiz.id}>
                      {quiz.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {question?.choices.map((c, i) => (
            <Box key={i + 1}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={i + 1}
                  label={"Choice-" + (i + 1)}
                  name="choice"
                  onChange={(event) => handleChoiceChange(event, i)}
                  variant="standard"
                  value={c.choice}
                  error={c.choice === "" && showChoiceError}
                  helperText={
                    c.choice === "" && showChoiceError
                      ? "Choice cannot be left blank"
                      : ""
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <Typography>
                  Is Correct:
                  <Checkbox
                    checked={c.is_correct}
                    name={question?.name}
                    onChange={(event) => handleCheckBox(event, i)}
                  />
                </Typography>
              </FormControl>
            </Box>
          ))}
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <Stack direction="row" spacing={2}>
              <Button
                size="large"
                variant="contained"
                onClick={handleSubmit}
                color="secondary"
              >
                Submit
              </Button>

              {showCheckBoxError && (
                <div className="checkbox-error">
                  <small className="text-danger">Please select a checkbox!</small>
                </div>
              )}
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateQuestion;

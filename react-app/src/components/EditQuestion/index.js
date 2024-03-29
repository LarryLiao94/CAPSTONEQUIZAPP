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
import { useHistory, useParams } from "react-router-dom";
import { getQuiz } from "../../api/quiz";
import { editQuizThunk } from "../../store/quiz";
import { useDispatch, useSelector } from "react-redux";
import { editQuestionThunk, getQuestionByIdThunk } from "../../store/question";
import { editChoiceThunk } from "../../store/choice";
import { removeQuestionThunk } from "../../store/question";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { getQuestion } from "../../api/quiz";
import { getProfileQuizThunk } from "../../store/quiz";
import { getProfileQuestionThunk } from "../../store/question";
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { FormHelperText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const EditQuestion = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [questionTextValid, setQuestionTextValid] = useState(false);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [quizzes, setQuizzes] = useState([{ title: "You have no quizzes" }]);
  const [error, setError] = useState({});
const [showChoiceError, setShowChoiceError] = useState(false);
const [showCheckBoxError, setShowCheckBoxError] = useState(false);

  // Retrieve questions and quizzes from Redux state
  const allProfileQuestions = useSelector((state) => state.questions.questions);
  const allProfileQuizzes = useSelector((state) => state.quizzes.quizzes);
  const categories = useSelector((state) => state.categories);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // Check if the selected choices include a correct answer
  const isCorrectAnswerSelected = (choices) => {
    return choices.some((c) => c.is_correct === true);
  };

  useEffect(() => {
    // Fetch question details from Redux state based on ID
    if (allProfileQuestions && Object.keys(allProfileQuestions).length && id) {
      const question = Object.values(allProfileQuestions).find(
        (q) => q.id === Number(id)
      );
      setQuestionDetails(question);
      setLoading(false);
    }
  }, [allProfileQuestions, id]);

  useEffect(() => {
    // Fetch all categories from Redux state
    if (!allProfileQuestions) {
      dispatch(getProfileQuestionThunk());
    }
  }, [dispatch, allProfileQuestions]);

  useEffect(() => {
    // Set the selected category details
    if (Object.keys(categories).length) {
      setAllCategories(categories[id]);
    }
  }, [categories]);

  // Handle input change for question details
  const handleChange = (e) =>
    setQuestionDetails({ ...questionDetails, [e.target.name]: e.target.value });

    // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    let choiceEmpty = false;
    let checkboxChecked = false;
    if (questionDetails && questionDetails.choices) {
      questionDetails.choices.forEach((c) => {
        if (c.choice === "") {
          choiceEmpty = true;
        }
      });
      // Check if any choices are empty or no correct answer is selected
      if(isCorrectAnswerSelected(questionDetails.choices)) {
        checkboxChecked = true;
      }
    }
    // Validate form inputs
    if (!questionDetails.question_text) {
      return;
    } else if (choiceEmpty) {
      return;
    } else if (!questionDetails.category_id) {
      return;
    } else if (!checkboxChecked) {
      return;
    }
    let questionItem = {};

    // Determine if the question belongs to a quiz or not
    if (questionDetails.quiz_id) {
      questionItem = {
        question_text: questionDetails.question_text,
        choices: questionDetails.choices,
        category_id: questionDetails.category_id,
        quiz_id: questionDetails.quiz_id,
      };
      await dispatch(
        editQuestionThunk(id, {
          question_text: questionDetails.question_text,
          category_id: Number(questionDetails.category_id),
          quiz_id: Number(questionDetails.quiz_id),
        })
      );
    } else {
      questionItem = {
        question_text: questionDetails.question_text,
        choices: questionDetails.choices,
        category_id: questionDetails.category_id,
      };
      await dispatch(
        editQuestionThunk(Number(id), {
          question_text: questionDetails.question_text,
          category_id: questionDetails.category_id,
        })
      );
    }

    // Update choices for the question
    questionDetails.choices.forEach(async (c) => {
      await dispatch(
        editChoiceThunk(c.id, { choice: c.choice, is_correct: c.is_correct })
      );
    });
    history.push("/profile");
  };

  // Handle choice change
  const handleChoiceChange = (e, itemID) => {
    const value = e.target.value;
    const newQuestion = { ...questionDetails };
    newQuestion.choices.map((c, i) => {
      if (c.id === itemID) {
        c.choice = value;
      }
      return c;
    });

    setQuestionDetails(newQuestion);
  };

  // Handle checkbox selection
  const handleCheckBox = (event, itemID) => {
    const newQuestion = { ...questionDetails };
    newQuestion.choices.map((c, i) => {
      if (c.id === itemID) {
        c.is_correct = !c.is_correct;
      } else {
        c.is_correct = false;
      }
      return c;
    });

    setQuestionDetails(newQuestion);
  };

  useEffect(() => {
    // Fetch quizzes for the user
    const profileQuiz = async () => {
      const profileQuizzes = await dispatch(getProfileQuizThunk());
      if (!profileQuizzes || !profileQuizzes.length) {
        setQuizzes([{ title: "You have no quizzes" }]);
      } else {
        setQuizzes(profileQuizzes);
      }
      setLoading(false);
    };
    profileQuiz();
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        {/* Edit Question Title */}
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2" component="h3">
            Edit Question
          </Typography>
        </Box>

         {/* Question Form */}
        <Box
          sx={{
            width: "60%",
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            {/* Question Text Input */}
            <TextField
              id={1}
              label="Question Text"
              name="question_text"
              defaultValue={questionDetails?.question_text}
              onChange={handleChange}
              variant="standard"
              error={formSubmitted && !questionDetails.question_text}
              helperText={
                formSubmitted && !questionDetails.question_text
                  ? "Question text is required"
                  : ""
              }
            />
          </FormControl>
          <Grid container spacing={2}>
            {/* Category Select */}
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  name="category_id"
                  defaultValue={questionDetails?.category_id}
                  onChange={handleChange}
                  error={formSubmitted && !questionDetails.category_id}
                >
                  <MenuItem defaultValue={questionDetails?.category_id}>
                    <em>Choose a category</em>
                  </MenuItem>
                  {Object.values(categories)?.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
                {formSubmitted && !questionDetails.category_id && (
                  <FormHelperText error>Category must be chosen</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Quiz Select */}
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <InputLabel id="quiz-select-label">Quiz</InputLabel>
                <Select
                  labelId="quiz-select-label"
                  id="quiz-select"
                  name="quiz_id"
                  defaultValue={questionDetails?.quiz_id}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Choose a quiz</em>
                  </MenuItem>
                  {allProfileQuizzes && allProfileQuizzes.length ? (
                    allProfileQuizzes.map((quiz, index) => (
                      <MenuItem key={index} value={quiz.id}>
                        {quiz.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">You have no quizzes</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Choices */}
          {questionDetails?.choices?.map((c, i) => (
            <Box key={i + 1}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={questionDetails.id}
                  label={"Choice-" + (i + 1)}
                  name={questionDetails.name}
                  variant="standard"
                  defaultValue={c.choice}
                  onChange={(event) => handleChoiceChange(event, c.id)}
                  error={formSubmitted && !c.choice}
                  helperText={
                    formSubmitted && !c.choice ? "Choice text is required" : ""
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                {/* Is Correct Checkbox */}
                <Typography>
                  Is Correct:
                  <Checkbox
                    checked={c.is_correct}
                    name={questionDetails.name}
                    onChange={(event) => handleCheckBox(event, c.id)}
                  />
                </Typography>
                {formSubmitted &&
                      !c.is_correct &&
                      !isCorrectAnswerSelected(questionDetails.choices) && (
                        <FormHelperText error>
                          Please select a correct answer
                        </FormHelperText>
                      )}
              </FormControl>
            </Box>
          ))}

          {/* Submit Button */}
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
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditQuestion;

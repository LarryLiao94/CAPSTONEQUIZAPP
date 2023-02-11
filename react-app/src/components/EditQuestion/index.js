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
import {FormHelperText} from "@mui/material";

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
  
  const allProfileQuestions = useSelector((state) => state.questions.questions);
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const categories = useSelector((state) => state.categories);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allProfileQuestions && Object.keys(allProfileQuestions).length && id) {
      const question = Object.values(allProfileQuestions).find(
        (q) => q.id === Number(id)
      );
      setQuestionDetails(question);
      setLoading(false);
    }
  }, [allProfileQuestions, id]);

  useEffect(() => {
    if (!allProfileQuestions) {
      dispatch(getProfileQuestionThunk());
    }
  }, [dispatch, allProfileQuestions]);


  useEffect(() => {
    if (Object.keys(categories).length) {
      setAllCategories(categories[id]);
    }
  }, [categories]);

  const handleChange = (e) =>
    setQuestionDetails({ ...questionDetails, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    let choiceEmpty = false;
    if (questionDetails && questionDetails.choices) {
      questionDetails.choices.forEach((c) => {
        if (c.choice === "") {
          choiceEmpty = true;
        }
      });
    }
    if (!questionDetails.question_text) {
      return;
    } else if(choiceEmpty) {
      return;
    } else if(!questionDetails.category_id){
      return;
    }
    let questionItem = {};
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
    questionDetails.choices.forEach(async (c) => {
      await dispatch(
        editChoiceThunk(c.id, { choice: c.choice, is_correct: c.is_correct })
      );
    });
    history.push("/profile");
  };

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

  const handleCheckBox = (event, itemID) => {
    const newQuestion = { ...questionDetails };
    newQuestion.choices.map((c, i) => {
      if (c.id === itemID) {
        c.is_correct = event.target.checked;
      }
      return c;
    });
  
    setQuestionDetails(newQuestion);
  };

  useEffect(() => {
    if (!quizzes || !quizzes.length) {
      const profileQuiz = async () => {
        const profileQuizzes = await dispatch(getProfileQuizThunk());
        setLoading(false);
      };
      profileQuiz();
    } else {
      setLoading(false);
    }
  }, [dispatch, quizzes]);

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
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2" component="h3">
            Edit Question
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
                  <FormHelperText error>
                    Category must be chosen
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
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
                  {quizzes?.map((quiz, index) => (
                    <MenuItem key={index} value={quiz.id}>
                      {quiz.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
                <Typography>
                  Is Correct:
                  <Checkbox
                    checked={c.is_correct}
                    name={questionDetails.name}
                    onChange={(event) => handleCheckBox(event, c.id)}
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
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditQuestion;

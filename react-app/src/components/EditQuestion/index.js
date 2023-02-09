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
import { Grid, InputLabel, Select, MenuItem } from "@mui/material";

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

  const history = useHistory();
  const dispatch = useDispatch();

  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const categories = useSelector((state) => state.categories.categories);

  const { id } = useParams();

  const handleChange = (e) =>
    setQuestions({ ...questions, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let questionItem = {};
    if(questions.quiz_id){
        questionItem = {question_text, choices: questions.choices, category_id: questions.category_id, quiz_id: questions.quiz_id}
        await dispatch(editQuestionThunk(id, {question_text, category_id: Number(questions.category_id), quiz_id: Number(questions.quiz_id)}))
        history.push("/profile")
    } else {
        questionItem = {question_text, choices: questions.choices, category_id: questions.category_id}
        await dispatch(editQuestionThunk(Number(id), {question_text, category_id: questions.category_id}))
        history.push("/profile")
    }
    console.log("questionItem!!!", questionItem);
    console.log("typeof", typeof(questions.category_id))
  };

  const handleChoiceChange = (e, itemID) => {
    const value = e.target.value;
    const newQuestion = {...questions};
    newQuestion.choices.map((c, i) => {
        if (c.id === itemID) {
            c.choice = value;
          }
          return c;
    });

   setQuestions(newQuestion);
  };

  useEffect(async () => {
    const questionData = await getQuestion(id);
    if (questionData?.question_text) {
      setQuestions(questionData);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const profileQuiz = async () => {
      const profileQuizzes = await dispatch(getProfileQuizThunk());
      setLoading(false);
    };
    profileQuiz();
  }, [dispatch]);

  if (loading) {
    return <div style={{
      fontSize: "30px",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      Loading...
    </div>
  }

  const {choices, question_text} = questions

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
              defaultValue={question_text}
              onChange={handleChange}
              variant="standard"
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
                  defaultValue={questions?.category_id}
                  onChange={handleChange}
                >
                  <MenuItem defaultValue={questions?.category_id}>
                    <em>Choose a category</em>
                  </MenuItem>
                  {Object.values(categories)?.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <InputLabel id="quiz-select-label">Quiz</InputLabel>
                <Select
                  labelId="quiz-select-label"
                  id="quiz-select"
                  name="quiz_id"
                  defaultValue={questions?.quiz_id}
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
          {questions?.choices?.map((c, i) => (
            <Box key={i + 1}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={questions.id}
                  label={"Choice-" + (i + 1)}
                  name="choice"
                  variant="standard"
                  defaultValue={c.choice}
                  onChange={(event) => handleChoiceChange(event, c.id)}
                />
              </FormControl>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <Typography>
                  Is Correct:
                  <Checkbox
                    checked={c.is_correct}
                    name={questions.name}
                    //   onChange={(event) => handleCheckBox(event, i)}
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

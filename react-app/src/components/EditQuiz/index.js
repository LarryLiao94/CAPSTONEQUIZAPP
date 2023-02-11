//step 1: grab quiz id from url,
//step 2: load quiz data into the form
//step 3: form validation
//step 4: dispatch put request for any changes made
//step 5: display message for succesful edit

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
import { useDispatch } from "react-redux";
import { editQuestionThunk } from "../../store/question";
import { editChoiceThunk } from "../../store/choice";
import { removeQuestionThunk } from "../../store/question";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import {FormHelperText} from "@mui/material";

function EditQuiz() {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState({ title: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();

  const isCorrectAnswerSelected = (choices) => {
    return choices.some((c) => c.is_correct === true);
  };

  useEffect(async () => {
    const quizData = await getQuiz(id);
    if (quizData?.title) {
      setQuiz(quizData);
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    let questionTextEmpty = false;
    let choiceEmpty = false;
    let checkboxChecked = false;
    if (!quiz.title) {
      setError({ title: "Quiz title is required" });
      return;
    }
    quiz.questions.forEach((q) => {
      if (q.question_text === "") {
        questionTextEmpty = true;
      }

      q.choices.forEach((c) => {
        if (c.choice === "") {
          choiceEmpty = true;
        }
      });
    });
    if (quiz.questions.every((q) => isCorrectAnswerSelected(q.choices))) {
      checkboxChecked = true;
    }
    if (questionTextEmpty) {
      return;
    } else if (choiceEmpty) {
      return;
    } else if (!checkboxChecked) {
      return;
    }
    const quizItem = { title, questions: quiz };
    await dispatch(editQuizThunk(id, { title: quiz.title }));
    quiz.questions.forEach(async (q) => {
      await dispatch(
        editQuestionThunk(q.id, {
          question_text: q.question_text,
          category_id: 1,
          quiz_id: quiz.id,
        })
      );
      q.choices.forEach(async (c) => {
        await dispatch(
          editChoiceThunk(c.id, { choice: c.choice, is_correct: c.is_correct })
        );
      });
    });
    history.push(`/dashboard`);
  };

  //   const handleTitleChange = (e) => setTitle(e.target.value);

  const handleChange = (e) =>
    setQuiz({ ...quiz, [e.target.name]: e.target.value });

  const handleCheckBox = (e, itemID) => {
    const id = e.target.id;
    const name = e.target.name;
    const newQuiz = quiz.questions.map((q) => {
      if (q.id === Number(id)) {
        q.choices = q.choices.map((c) => {
          if (c.id === itemID) {
            c.is_correct = !c.is_correct;
          } else {
            c.is_correct = false;
          }
          return c;
        });
      }
      return q;
    });

    setQuiz({ ...quiz, questions: newQuiz });
  };

  const handleChoiceChange = (e, itemID) => {
    const value = e.target.value;
    const id = e.target.id;
    const newQuiz = quiz.questions.map((q) => {
      if (q.id === Number(id)) {
        q.choices.map((c) => {
          if (c.id === itemID) {
            c.choice = value;
          }
          return c;
        });
      }
      return q;
    });

    let getQuiz = quiz;
    getQuiz.questions = newQuiz;

    setQuiz(getQuiz);
  };

  const handleQuestiontTextChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const newQuiz = quiz.questions.map((q) => {
      if (q.id === Number(id)) {
        q.question_text = value;
      }
      return q;
    });

    let getQuiz = quiz;
    getQuiz.questions = newQuiz;

    setQuiz(getQuiz);
  };

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

  const { questions, title } = quiz;

  //hydrate data
  //make create question callback
  //make delete question callback
  //edit question callback
  //make create and delete choices callback

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "unset", minHeight: "100vh" }}>
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2" component="h3">
            Edit Quiz
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
              onChange={handleChange}
              error={!title}
              helperText={!title && "Quiz title is required"}
            />
          </FormControl>
          {questions?.map((question, index) => (
            <Box key={index + 1}>
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <TextField
                  id={question.id}
                  label={"Question #" + (index + 1)}
                  variant="standard"
                  defaultValue={question.question_text}
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
                <Box key={c.EditQuiz}>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <TextField
                      id={question.id}
                      label={"Choice-" + (i + 1)}
                      variant="standard"
                      defaultValue={c.choice}
                      onChange={(event) => handleChoiceChange(event, c.id)}
                      error={formSubmitted && c.choice === ""}
                      helperText={
                        formSubmitted && c.choice === ""
                          ? "Please enter a choice"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                    <Typography>
                      Is Correct:
                      <Checkbox
                        checked={c.is_correct}
                        id={question.id}
                        name={"quesion-" + question.id}
                        onChange={(event) => handleCheckBox(event, c.id)}
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

export default EditQuiz;

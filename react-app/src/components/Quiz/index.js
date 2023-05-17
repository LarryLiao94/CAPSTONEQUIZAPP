import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getQuizByIdThunk, updateQuizSubmit } from "../../store/quiz";
import { createUserQuestion } from "../../store/user_question";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Quiz.css";
import { Modal } from "../../context/Modal";
import QuizResults from "../Results";

//shuffle function for questions after submission of quiz
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes);

  //dispatch to get quiz data from backend
  useEffect(() => {
    const getQuiz = async () => {
      await dispatch(getQuizByIdThunk(id));
    };
    getQuiz();
    setLoading(false);
  }, [id, dispatch]);

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

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    let selectedAnswersCount = Object.keys(selectedAnswers).length;
    let unansweredQuestions = [];
  
    // If the number of selected answers is equal to the number of questions,
    // check and display correct/incorrect answers
    if (selectedAnswersCount === quizzes.questions.length) {
      let getCorrectAnswers = 0;
      const getCorrectChoices = quizzes.questions.map((q) => {
        const userQuestion = {
          question_id: q.id,
          choice_id: selectedAnswers[q.id] || null,
        };
        q.choices.map((choice) => {
          choice.getClass = ""; // Reset getClass property
          if (
            choice.id === selectedAnswers[choice.question_id] &&
            choice.is_correct
          ) {
            choice.getClass = "correct";
            choice.selected = true;
            getCorrectAnswers++;
          }
  
          if (choice.is_correct) {
            choice.getClass = "correct";
          }
  
          if (
            choice.id === selectedAnswers[choice.question_id] &&
            !choice.is_correct
          ) {
            choice.getClass = "incorrect";
            choice.selected = true;
          }
          return choice;
        });
        if (!selectedAnswers[q.id]) {
          unansweredQuestions.push(q.question_text);
        }

        if (selectedAnswers[q.id]) {
          // Dispatch action to post user question
          const newUserQuestion = {
            question_id: q.id,
            user_choice: selectedAnswers[q.id]
          }
          dispatch(createUserQuestion(newUserQuestion));
        }
        
  
        return q;
      });
  
      if (unansweredQuestions.length > 0) {
        // display an alert with the list of unanswered questions
        const unansweredString = unansweredQuestions.join("\n- ");
        alert(`Please answer the following questions:\n- ${unansweredString}`);
        return;
      }
  
      let getQuizzes = quizzes;
      getQuizzes.questions = getCorrectChoices;
  
      dispatch(updateQuizSubmit(getQuizzes));
      setCorrectChoices(getCorrectChoices);
      setCorrectAnswers(getCorrectAnswers);
      setSubmitted(true);
      setOpen(true);
      handleOpen();
    } else {
      // If the number of selected answers is less than the number of questions,
      // display an alert with the list of unanswered questions
      quizzes.questions.forEach((q) => {
        if (!selectedAnswers[q.id]) {
          unansweredQuestions.push(q.question_text);
        }
      });
  
      const unansweredString = unansweredQuestions.join("\n- ");
      alert(`Please answer the following questions:\n- ${unansweredString}`);
    }
  };

  const handleRetake = async () => {
    //retake button functionality to shuffle questions and reset question states so the colors are back to normal
    await dispatch(getQuizByIdThunk(id));
    setSelectedAnswers({});
    setCorrectAnswers(0);
    setCorrectChoices([]);
    setSubmitted(false);
    setOpen(false);

    let shuffledQuestions = quizzes.questions.map((question) => {
      let shuffledChoices = shuffle([...question.choices]);
      shuffledChoices = shuffledChoices.map((choice) => {
        choice.getClass = "";
        return choice;
      });
      return {
        ...question,
        choices: shuffledChoices,
      };
    });

    let shuffledQuiz = { ...quizzes, questions: shuffledQuestions };

    dispatch(updateQuizSubmit(shuffledQuiz));
  };

  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
  };

  return (
    <Container
      maxWidth="false"
      sx={{ bgcolor: "#cfe8fc", height: "unset", minHeight: "100vh" }}
    >
      <Stack spacing={10} justifyContent="center" alignItems="center">
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
          <Typography variant="h2">{quizzes?.title}</Typography>
        </Box>
        {quizzes?.questions?.map((question, index) => (
          <Box
            key={question.id}
            mb={3}
            sx={{
              width: "60%",
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <FormControl fullWidth sx={{ p: 2 }} variant="filled">
              <Typography variant="h4">
                {`Question ${index + 1}: ${question.question_text}`}
              </Typography>
              <RadioGroup
                name={`question-${question.id}`}
                sx={{ paddingTop: "20px" }}
                required
              >
                {question.choices.map((c) => {
                  const { id, choice, getClass, selected } = c;
                  return (
                    <FormControlLabel
                      key={id}
                      value={id}
                      className={`answer ${getClass}`}
                      control={
                        <Radio
                          checked={selectedAnswers[question.id] === id}
                          onChange={() =>
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [question.id]: id,
                            })
                          }
                        />
                      }
                      label={choice}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}
        <FormControl fullWidth sx={{ p: 2 }} variant="filled">
          <Stack direction="row" spacing={2}>
            {!submitted && (
              <Button
                size="large"
                variant="contained"
                onClick={handleSubmit}
                color="secondary"
              >
                Submit
              </Button>
            )}

            {submitted && (
              <>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleRetake}
                  color="primary"
                >
                  Retake
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => setShowResults(true)}
                  color="secondary"
                >
                  Show Results
                </Button>
                {showResults && (
                  <Modal
                    onClose={() => setShowResults(false)}
                    onClick={handleClose}
                  >
                    <QuizResults
                      correctAnswers={correctAnswers}
                      totalQuestions={quizzes?.questions?.length}
                      questions={correctChoices}
                      selectedAnswers={selectedAnswers}
                      handleClose={() => setShowResults(false)}
                    />
                  </Modal>
                )}
              </>
            )}
          </Stack>
        </FormControl>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={`You got ${correctAnswers} out of ${quizzes?.questions?.length} correct`}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
}

export default Quiz;

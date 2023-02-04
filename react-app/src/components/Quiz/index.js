import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getQuizByIdThunk, updateQuizSubmit } from "../../store/quiz";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Quiz.css";

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes);

  useEffect(() => {
    const getQuiz = async () => {
      await dispatch(getQuizByIdThunk(id));
    };
    getQuiz();
    setLoading(false);
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted");
    let getCorrectAnswers = 0;

    const getCorrectChoices = quizzes.questions.map((q) => {
      q.choices.map((choice) => {
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

      return q;
    });

    let getQuizzes = quizzes;
    getQuizzes.questions = getCorrectChoices;

    dispatch(updateQuizSubmit(getQuizzes));
    setCorrectChoices(getCorrectChoices);
    setCorrectAnswers(getCorrectAnswers);
    setSubmitted(true);
    setOpen(true);
  };

  const handleRetake = async () => {
    await dispatch(getQuizByIdThunk(id));
    setSelectedAnswers({});
    setCorrectAnswers(0);
    setCorrectChoices([]);
    setSubmitted(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
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
              {/* <FormGroup name={`question-${question.id}`} sx={{paddingTop: '50px' }}>
                  <FormControlLabel value="female" control={<Checkbox />} label="Female" />
                </FormGroup> */}
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
            <Button
              size="large"
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              Submit
            </Button>

            {submitted && (
              <Button
                size="large"
                variant="contained"
                onClick={handleRetake}
                color="primary"
              >
                Retake
              </Button>
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

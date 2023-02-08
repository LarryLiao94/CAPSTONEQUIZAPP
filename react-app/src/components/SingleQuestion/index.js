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
import "./SingleQuestion.css";
import { getQuestionByIdThunk, updateQuestionSubmit } from "../../store/question";
// import { getQuestion } from "../../api/quiz";

function SingleQuestion() {
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  const { id } = useParams();
  const dispatch = useDispatch();

  const singularQuestion = useSelector((state) => state.questions)

  useEffect(() => {
    const getQuestion = async () => {
      await dispatch(getQuestionByIdThunk(id));
      
    };
    getQuestion();
    setLoading(false);
  }, [id, dispatch]);

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted");
    let getCorrectAnswers = 0;

    const getCorrectChoices = singularQuestion?.choices.map((choice) => {
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

      
      
      let getQuestions = singularQuestion;
      singularQuestion.choices = getCorrectChoices;
      
      dispatch(updateQuestionSubmit(getQuestions));
      setCorrectChoices(getCorrectChoices);
      setCorrectAnswers(getCorrectAnswers);
      setSubmitted(true);
      setOpen(true);
      return singularQuestion;
  };

  const handleRetake = async () => {
    await dispatch(getQuestionByIdThunk(id));
    setSelectedAnswers({});
    setCorrectAnswers(0);
    setCorrectChoices([]);
    setSubmitted(false);
    setOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Stack spacing={10} justifyContent="center" alignItems="center">
          <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
            <Typography variant="h2">{`Question ${singularQuestion?.id}`}</Typography>
          </Box>
          <Box
            key={singularQuestion?.id}
            mb={3}
            sx={{
              width: "60%",
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <FormControl fullWidth sx={{ p: 2 }} variant="filled">
              <Typography variant="h4">
                {`${singularQuestion.question_text}`}
              </Typography>
              <RadioGroup
                name={`question-${singularQuestion.id}`}
                sx={{ paddingTop: "20px" }}
                required
              >
                {singularQuestion?.choices.map((c) => {
                  const { id, choice, getClass, selected } = c;
                  return (
                    <FormControlLabel
                      key={id}
                      value={id}
                      className={`answer ${getClass}`}
                      control={
                        <Radio
                          checked={selectedAnswers[singularQuestion.id] === id}
                          onChange={() =>
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [singularQuestion.id]: id,
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
      </Container>
    </>
  );
}

export default SingleQuestion;

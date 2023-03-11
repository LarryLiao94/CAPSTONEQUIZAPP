import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import "./results.css"

const QuizResults = ({
  correctAnswers,
  totalQuestions,
  questions,
  selectedAnswers,
  handleClose,
}) => {
  const [expanded, setExpanded] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const handleExpandClick = (questionId) => {
    setExpanded({
      ...expanded,
      [questionId]: !expanded[questionId],
    });
  };

  const incorrectQuestions = questions.filter(
    (question) =>
      question.choices.filter(
        (choice) =>
          choice.id === selectedAnswers[question.id] && !choice.is_correct
      ).length > 0
  );
  const correctQuestions = questions.filter(
    (question) =>
      question.choices.filter(
        (choice) =>
          choice.id === selectedAnswers[question.id] && choice.is_correct
      ).length > 0
  );

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const handleShowConfetti = () => {
    if (percentage === 100) {
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    handleShowConfetti();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: "relative",
        }}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h4" align="center">
              Results
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
            {incorrectQuestions.length === 0
              ? `Great job! You got all the questions correct! ${percentage}%!`
              : `You got ${correctAnswers} out of ${totalQuestions} correct. (${percentage}%)`}
            </Typography>
          </Grid>
          {correctQuestions.length > 0 && (

          <Grid item>
            <Typography variant="h6">Correct Questions:</Typography>
            {correctQuestions.map((question) => (
              <Card
                sx={{
                  bgcolor: "#bfe5b3",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  mb: 2,
                }}
                key={question.id}
              >
                <CardContent>
                  <Typography variant="body1">
                    {question.question_text}
                  </Typography>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleExpandClick(question.id)}
                    >
                      Click to expand
                    </Button>
                    <IconButton
                      onClick={() => handleExpandClick(question.id)}
                      aria-expanded={expanded === question.id}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={expanded[question.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      {question.choices.map((choice) => (
                        <Typography
                          variant="body2"
                          key={choice.id}
                          sx={{
                            color:
                              choice.id === selectedAnswers[question.id]
                                ? "primary"
                                : choice.is_correct
                                ? "success.main"
                                : "text.primary",
                          }}
                        >
                          {choice.id === selectedAnswers[question.id] && (
                            <>
                              <strong>Your Answer: </strong>
                            </>
                          )}
                          {choice.choice}
                          {choice.is_correct && (
                            <>
                              {" "}
                              <strong>(Correct Answer)</strong>
                            </>
                          )}
                        </Typography>
                      ))}
                    </CardContent>
                  </Collapse>
                </CardContent>
              </Card>
            ))}
          </Grid>
          )}
          {incorrectQuestions.length > 0 && (

          <Grid item>
            <Typography variant="h6">Incorrect Questions:</Typography>
            {incorrectQuestions.map((question) => (
              <Card
                sx={{
                  bgcolor: "#cfe8fc",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  mb: 2,
                }}
                key={question.id}
              >
                <CardContent>
                  <Typography variant="body1">
                    {question.question_text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleExpandClick(question.id)}
                  >
                    Click to expand
                  </Button>
                  <IconButton
                    onClick={() => handleExpandClick(question.id)}
                    aria-expanded={expanded === question.id}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse
                  in={expanded[question.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    {question.choices.map((choice) => (
                      <Typography
                        variant="body2"
                        key={choice.id}
                        sx={{
                          color:
                            choice.id === selectedAnswers[question.id]
                              ? "primary"
                              : choice.is_correct
                              ? "success.main"
                              : "text.primary",
                        }}
                      >
                        {choice.id === selectedAnswers[question.id] && (
                          <>
                            <strong>Your Answer: </strong>
                          </>
                        )}
                        {choice.choice}
                        {choice.is_correct && (
                          <>
                            {" "}
                            <strong>(Correct Answer)</strong>
                          </>
                        )}
                      </Typography>
                    ))}
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </Grid>
          )}
          <Grid item sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default QuizResults;

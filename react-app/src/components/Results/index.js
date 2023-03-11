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

const QuizResults = ({ correctAnswers, totalQuestions, questions, selectedAnswers, handleClose }) => {
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (questionId) => {
    setExpanded(expanded === questionId ? null : questionId);
  };

  const incorrectQuestions = questions.filter(
    (question) =>
      question.choices.filter(
        (choice) =>
          choice.id === selectedAnswers[question.id] && !choice.is_correct
      ).length > 0
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Box sx={{ bgcolor: "#ffffff", borderRadius: 2, boxShadow: 24, p: 4 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h4" align="center">
              Results
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              You got {correctAnswers} out of {totalQuestions} correct.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Incorrect Questions:</Typography>
            {incorrectQuestions.map((question) => (
              <Card key={question.id}>
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
                    Show Answer
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
                  in={expanded === question.id}
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
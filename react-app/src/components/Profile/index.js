import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { getAllQuizzesThunk, removeQuizThunk } from "../../store/quiz";
import { editQuizThunk, getProfileQuizThunk } from "../../store/quiz";
import {
  getProfileQuestionThunk,
  removeQuestionThunk,
} from "../../store/question";
import { csrfFetch } from "../../store/csrf";
import { Pagination } from "@mui/material";
import "./profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 12;

  const history = useHistory();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state) => state.quizzes);
  const { questions } = useSelector((state) => state.questions);

  const questionsToShow = questions?.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const profileQuiz = async () => {
      const profileQuizzes = await dispatch(getProfileQuizThunk());
      setLoading(false);
    };
    profileQuiz();
  }, [dispatch]);

  useEffect(() => {
    const profileQuestion = async () => {
      const profileQuestions = await dispatch(getProfileQuestionThunk());
      setLoading(false);
    };
    profileQuestion();
  }, [dispatch]);

  if (loading) {
    return <div>Loading Quiz...</div>;
  }

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Typography variant="h3" align="center">
        My Quizzes
      </Typography>
      <Grid
        id="quiz-card-wrapper"
        container
        spacing={5}
        sx={{ paddingTop: "50px" }}
      >
        {quizzes?.map((quiz) => {
          const { id, title, description, user_id } = quiz;
          return (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <Card sx={{ bgcolor: "#cfe8fc" }} className="quiz-card">
                <CardActionArea onClick={() => history.push(`/quiz/${id}`)}>
                  <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <>
                    <IconButton
                      aria-label="edit"
                      className="edit-icon"
                      onClick={() => history.push(`/quiz/edit/${id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className="delete-icon"
                      onClick={() => {
                        dispatch(removeQuizThunk(id));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h3" align="center" marginTop={5}>
        My Questions
      </Typography>
      <Grid
        id="quiz-card-wrapper"
        container
        spacing={5}
        sx={{ paddingTop: "50px" }}
      >
        {questionsToShow?.map((question) => {
          const { id, question_text, description, user_id } = question;
          return (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <Card sx={{ bgcolor: "#cfe8fc" }} className="quiz-card">
                <CardActionArea onClick={() => history.push(`/question/edit/${id}`)}>
                  <CardContent>
                    <Typography variant="h5">{question_text}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <>
                    <IconButton
                      aria-label="edit"
                      className="edit-icon"
                      onClick={() => history.push(`/question/edit/${id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className="delete-icon"
                      onClick={() => {
                        dispatch(removeQuestionThunk(id));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        sx={{justifyContent: "center", marginTop: "50px"}}
        count={Math.ceil(questions?.length / questionsPerPage)}
        page={currentPage}
        color="primary"
        onChange={handlePageChange}
        className="pagination-class"
      />
    </Container>
  );
}

export default Profile;

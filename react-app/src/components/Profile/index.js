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
import {Tab, Tabs} from "@mui/material";
import {Button} from "@mui/material";
import MyPerformance from "../Performance/Performance";
import "./profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("My Quizzes");
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const questionsPerPage = 9;

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
    if(quizzes){
      setLoading(false);
    }
    const profileQuiz = async () => {
      const profileQuizzes = await dispatch(getProfileQuizThunk());
      setLoading(false);
    };
    profileQuiz();
  }, [dispatch]);

  useEffect(() => {
    if(questions){
      setLoading(false)
    }
    const profileQuestion = async () => {
      const profileQuestions = await dispatch(getProfileQuestionThunk());
      setLoading(false);
    };
    profileQuestion();
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

  return (
    
    <Container sx={{ paddingTop: "50px" }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="My Quizzes" value="My Quizzes" />
        <Tab label="My Questions" value="My Questions" />
        {/* <Tab label="Performance" value="Performance" /> */}
      </Tabs>
      {/* {activeTab === "Performance" && (
  <>
    <Typography variant="h3" align="center">
      Performance
    </Typography>
    <MyPerformance />
  </>
)} */}
      {activeTab === "My Quizzes" && (
  <>
    <Typography variant="h3" align="center">
      My Quizzes
    </Typography>
    <Grid
      id="quiz-card-wrapper"
      container
      spacing={5}
      sx={{ paddingTop: "50px" }}
    >
      {quizzes?.length > 0 ? (
        quizzes.map((quiz) => {
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
        })
      ) : (
          <>
        <Typography variant="h5" align="center" className="no-questions-text" style={{ color: "#bbb" }}>
          Looks like you haven't created any quizzes. Click the button to create your own!
        </Typography>
        <Button
        variant="contained"
        color="primary"
        className="create-question-button"
        onClick={() => history.push("/quiz")}
      >
        Create a Quiz
      </Button>
        </>
      )}
    </Grid>
    
  </>
)}

{activeTab === "My Questions" && (
  <>
    <Typography variant="h3" align="center">
      My Questions
    </Typography>
    <Grid
      id="quiz-card-wrapper"
      container
      spacing={5}
      sx={{ paddingTop: "50px" }}
    >
      {questionsToShow?.length > 0 ? (
        questionsToShow.map((question) => {
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
        })
      ) : (
        <>
        <Typography variant="h5" align="center" className="no-questions-text" style={{ color: "#bbb" }}>
          Looks like you haven't created any questions. Click the button to create your own!
        </Typography>
        <Button
    variant="contained"
    color="primary"
    className="create-question-button"
    onClick={() => history.push("/questions/new")}
  >
    Create a Question
  </Button>
      </>
      )}
    </Grid>
    {questionsToShow?.length > 0 && (
      <Pagination
          sx={{justifyContent: "center", marginTop: "50px"}}
          count={Math.ceil(questions?.length / questionsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
          className="pagination-class"
        />

    )}
  </>
)}
      </Container>
  );
}

export default Profile;

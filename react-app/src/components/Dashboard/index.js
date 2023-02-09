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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { getAllQuizzesThunk, removeQuizThunk } from "../../store/quiz";
import { editQuizThunk } from "../../store/quiz";
import "./Dashboard.css";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("");
  

  const { quizzes } = useSelector((state) => state.quizzes);
  // const { user } = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleTitleChange = (e) => setCurrentTitle(e.target.value);
  // const handleSubmit = () => {
  //   dispatch(editQuizThunk({ id, title: currentTitle }));
  // };
  

  useEffect(() => {
    const allQuiz = async () => {
      const allQuizzes = await dispatch(getAllQuizzesThunk());
      setLoading(false);
    };
    allQuiz();
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
      <Typography variant="h3" align="center">
        All Quizzes
      </Typography>
      <Grid
        id="quiz-card-wrapper"
        container
        spacing={5}
        sx={{ paddingTop: "50px" }}
      >
        {quizzes.map((quiz) => {
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
                {/* <CardActions>
                  
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
                </CardActions> */}
                
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Dashboard;

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
  const { quizzes } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const allQuiz = async () => {
      const allQuizzes = await dispatch(getAllQuizzesThunk());
      setLoading(false);
    };
    allQuiz();
  }, [dispatch]);

  if (loading) {
    return <div>Loading Quiz...</div>;
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
          const { id, title, description } = quiz;
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
                  <IconButton
                    aria-label="edit"
                    className="edit-icon"
                    onClick={() => {
                      // Dispatch 'edit quiz' action
                      // and pass the quiz id and current title as payload
                      dispatch(
                        editQuizThunk({
                          id,
                          title,
                        })
                      );
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className="delete-icon"
                    onClick={() => {
                      // Dispatch 'delete quiz' action and pass the quiz id as payload
                      dispatch(removeQuizThunk(id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* {Object.keys(quizzes).map((key) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Card sx={{ bgcolor: "#cfe8fc" }}>
              <CardActionArea
                onClick={() => history.push(`/quiz/${id}`)}
                className="quiz-card"
              >
                <CardContent>
                  <Typography variant="h5">{title}</Typography>
                  <Typography variant="subtitle1">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="edit"
                    className="edit-icon"
                    onClick={() => {
                      // Dispatch 'edit quiz' action
                      // and pass the quiz id and current title as payload
                      dispatch(
                        editQuizThunk({
                          id: id,
                          title: title,
                        })
                      );
                    }}
                    size="large">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className='delete-icon'
                    onClick={() => {
                      // Dispatch 'delete quiz' action and pass the quiz id as payload
                      dispatch(removeQuizThunk(id));
                    }}
                    size="large">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
  // return (
  //   <Container sx={{ paddingTop: "50px" }}>
  //     <Typography variant="h3" align="center">
  //       All Quizzes
  //     </Typography>
  //     <Grid id="quiz-card-wrapper" container spacing={5} sx={{ paddingTop: "50px" }}>
  //       {Object.keys(quizzes).map((key) => (
  //         <Grid item xs={12} md={6} lg={4} key={key}>
  //           <Card sx={{ bgcolor: "#cfe8fc" }}>
  //             <CardActionArea onClick={() => history.push(`/quiz/${id}`)} className="quiz-card">
  //               <CardContent>
  //                 <Typography variant="h5">{title}</Typography>
  //                 <Typography variant="subtitle1">
  //                   {description}
  //                 </Typography>
  //               </CardContent>
  //             </CardActionArea>
  //             <CardActions>
  //               <IconButton
  //                 aria-label="edit"
  //                 className="edit-icon"
  //                 onClick={() => {
  //                   // Dispatch 'edit quiz' action
  //                   // and pass the quiz id and current title as payload
  //                   dispatch(
  //                     editQuizThunk({
  //                       id: id,
  //                       title: title,
  //                     })
  //                   );
  //                 }}
  //                 size="large">
  //                 <EditIcon />
  //               </IconButton>
  //               <IconButton
  //                 aria-label="delete"
  //                 className="delete-icon"
  //                 onClick={() => {
  //                   // Dispatch 'delete quiz' action and pass the quiz id as payload
  //                   dispatch(removeQuizThunk(id));
  //                 }}
  //                 size="large">
  //                 <DeleteIcon />
  //               </IconButton>
  //             </CardActions>
  //           </Card>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Container>
  // );
}

export default Dashboard;

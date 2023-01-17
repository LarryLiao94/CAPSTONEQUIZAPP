import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  IconButton
} from "@material-ui/core";
import { getAllQuizzesThunk, removeQuizThunk } from "../../store/quiz";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

function Dashboard() {
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const allQuiz = async () => {
        const allQuizzes = await dispatch(getAllQuizzesThunk());
        setQuiz(allQuizzes)
        setLoading(false)
    }
    allQuiz()
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(quizzes)

  return (
    <Box>
      <Typography variant="h2" align="center">
        All Quizzes
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(quizzes).map((key) => (
          <Grid item xs={12} sm={6} lg={4} key={key}>
            <Card>
              <CardActionArea
                onClick={() => history.push(`/quiz/${quizzes[key].id}`)}
              >
                <CardContent>
                  <Typography variant="h5">{quizzes[key].title}</Typography>
                  <Typography variant="subtitle1">
                    {quizzes[key].description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAllQuizzesThunk, removeQuizThunk } from "../../store/quiz";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

function Dashboard() {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const allQuiz = async () => {
      const allQuizzes = await dispatch(getAllQuizzesThunk());
      setQuiz(allQuizzes);
      setLoading(false);
    };
    allQuiz();
  }, [dispatch]);

  if (loading) {
    return <div>Loading Quiz...</div>;
  }

  return (
    <Container sx={{paddingTop: '50px' }}>
      <Typography variant="h3" align="center">
        All Quizzes
      </Typography>
      <Grid container spacing={5} sx={{paddingTop: '50px' }}>
        {Object.keys(quizzes).map((key) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Card sx={{ bgcolor: '#cfe8fc' }}>
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
    </Container>
  );
}

export default Dashboard;

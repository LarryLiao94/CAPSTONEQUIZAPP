import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {
  fetchAllUserQuestions,
  fetchCorrectUserQuestions,
} from "../../store/user_question";

function MyPerformance() {
  const dispatch = useDispatch();
  const [userQuestions, setUserQuestions] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [uniqueQuestions, setUniqueQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const  user_questions = useSelector((state) => state.user_questions);
  const categories = useSelector((state) => state.categories);

  const calculatePercentage = (correct, total) => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  useEffect(() => {
    const fetchUserQuestions = async () => {
      await dispatch(fetchAllUserQuestions());
      setLoading(false);
    };
    fetchUserQuestions();
  }, [dispatch]);

  useEffect(() => {
    if (user_questions && Object.keys(user_questions).length > 0) {
      // Get all unique questions answered by the user
      const uniqueIds = new Set(Object.values(user_questions)?.map((question) => question.question_id));
      const uniqueQs = Object.values(user_questions)?.filter((question) => uniqueIds.has(question.question_id));
      setUniqueQuestions(uniqueQs);
      console.log('uniqueQs:', uniqueQs);
    }
  }, [user_questions]);
  

  if (loading) {
    return (
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Container maxWidth="md">
      {/* <Typography variant="h4" sx={{ mb: 4 }}>
        My Performance
      </Typography>
      <Typography variant="h5" gutterBottom>
        Overall Performance
      </Typography>
      <Typography variant="body1">
        Total Questions Answered: {uniqueQuestions?.length}
      </Typography>
      <Typography variant="body1">
        Correct Answers: {correctQuestions?.length} (
        {correctPercentage}%)
      </Typography>
      <Typography variant="body1">
        Incorrect Answers: {incorrectQuestions?.length} (
        {incorrectPercentage}%)
      </Typography>
      <LinearProgress
        variant="determinate"
        value={correctPercentage}
        sx={{ my: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        Performance by Category
      </Typography>
      {categoryData?.map((category) => (
        <div key={category.id}>
          <Typography variant="body1">
            {category.title}: {category.correctCount} / {category.totalCount} (
            {category.percentage}%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={category.percentage}
            sx={{ my: 2 }}
          />
        </div>
      ))} */}
    </Container>
  );
}

export default MyPerformance;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const { quizzes } = useSelector((state) => state.quizzes);
  // const { user } = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleTitleChange = (e) => setCurrentTitle(e.target.value);
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);

  // const handleSubmit = () => {
  //   dispatch(editQuizThunk({ id, title: currentTitle }));
  // };

  useEffect(() => {
    if (quizzes) {
      setLoading(false);
    }
    const allQuiz = async () => {
      const allQuizzes = await dispatch(getAllQuizzesThunk());
      setLoading(false);
    };
    allQuiz();
  }, [dispatch]);

  const filteredQuizzes = quizzes?.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    // <Container sx={{ paddingTop: "50px" }}>
    //   <Typography variant="h3" align="center">
    //     All Quizzes
    //   </Typography>
    //   <Grid
    //     id="quiz-card-wrapper"
    //     container
    //     spacing={5}
    //     sx={{ paddingTop: "50px" }}
    //   >
    //     {quizzes.map((quiz) => {
    //       const { id, title, description, user_id } = quiz;
    //       return (
    //         <Grid item xs={12} md={6} lg={4} key={id}>
    //           <Card sx={{ bgcolor: "#cfe8fc" }} className="quiz-card">
    //             <CardActionArea onClick={() => history.push(`/quiz/${id}`)}>
    //               <CardContent>
    //                 <Typography variant="h5">{title}</Typography>
    //                 <Typography variant="subtitle1">{description}</Typography>
    //               </CardContent>
    //             </CardActionArea>
    //           </Card>
    //         </Grid>
    //       );
    //     })}
    //   </Grid>
    // </Container>
    <Container sx={{ paddingTop: "50px" }}>
      <Typography
        variant="h3"
        align="center"
        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold" }}
      >
        Quiz Zone
      </Typography>
      <TextField
        id="search"
        label="Search quizzes"
        value={searchTerm}
        onChange={handleSearchTermChange}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
      <FormControl
        variant="outlined"
        style={{ width: "200px", marginRight: "20px" }}
      >
        <Select
          labelId="sort-by"
          id="sort-by"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <MenuItem value="created_at">Date Created</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>
      <Typography style={{ marginRight: "20px", fontWeight: "bold" }}>
        Total Quizzes: {filteredQuizzes.length}
      </Typography>
      <Grid
        id="quiz-card-wrapper"
        container
        spacing={5}
        sx={{ paddingTop: "50px" }}
      >
        {filteredQuizzes
          .sort((a, b) => {
            if (sortBy === "created_at") {
              return new Date(b.created_at) - new Date(a.created_at);
            } else if (sortBy === "title") {
              return a.title.localeCompare(b.title);
            }
          })
          .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
          .map((quiz) => {
            const { id, title, description, user_id } = quiz;
            return (
              <Grid item xs={12} md={6} lg={4} key={id}>
                <Card
                  sx={{
                    bgcolor: "#cfe8fc",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  className="quiz-card"
                >
                  <CardActionArea onClick={() => history.push(`/quiz/${id}`)}>
                    <CardContent>
                      <Typography variant="h5">
                        {title}
                      </Typography>
                      <Typography variant="subtitle1">{description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Pagination
        count={Math.ceil(filteredQuizzes.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        style={{ marginTop: "20px" }}
      />
    </Container>
  );
}

export default Dashboard;

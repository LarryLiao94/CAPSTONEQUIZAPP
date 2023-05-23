import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, IconButton } from "@mui/material";
import {
  getCategoryByIdThunk,
  updateCategorySubmit,
} from "../../store/category";
import CloseIcon from "@mui/icons-material/Close";

// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

function Category() {
  // State variables
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Selected answers state
  const [open, setOpen] = useState(false); // Modal open state
  const [correctAnswers, setCorrectAnswers] = useState(0); // Correct answers count state
  const [correctChoices, setCorrectChoices] = useState([]); // Correct choices state
  const [submitted, setSubmitted] = useState(false); // Submitted state

  // Other hooks and variables
  const { id } = useParams(); // Get route parameter
  const { user } = useSelector((state) => state.session); // Get user from Redux store
  const dispatch = useDispatch(); // Redux dispatch function
  const [categoryDetails, setCategoryDetails] = useState(null); // Category details state
  const categories = useSelector((state) => state.categories); // Categories from Redux store

  // Fetch category details and update loading state
  useEffect(() => {
    if (Object?.keys(categories).length && id) {
      setCategoryDetails(categories[id]);
    }
    setLoading(false);
  }, [categories, id]);

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

  const handleSubmit = () => {
    // Handle form submission here
    let getCorrectAnswers = 0;

    const getCorrectChoices = categoryDetails?.questions?.map((q) => {
      q.choices.map((choice) => {
        if (
          choice.id === selectedAnswers[choice.question_id] &&
          choice.is_correct
        ) {
          choice.getClass = "correct";
          choice.selected = true;
          getCorrectAnswers++;
        }

        if (choice.is_correct) {
          choice.getClass = "correct";
        }

        if (
          choice.id === selectedAnswers[choice.question_id] &&
          !choice.is_correct
        ) {
          choice.getClass = "incorrect";
          choice.selected = true;
        }
        return choice;
      });

      return q;
    });

    let getCategories = categories;
    getCategories.questions = getCorrectChoices;

    dispatch(updateCategorySubmit(getCategories));
    setCorrectChoices(getCorrectChoices);
    setCorrectAnswers(getCorrectAnswers);
    setSubmitted(true);
    setOpen(true);
  };

  const handleRetake = async () => {
    // Reset the quiz and category state for retake
    await dispatch(getCategoryByIdThunk(id));
    setSelectedAnswers({});
    setCorrectAnswers(0);
    setCorrectChoices([]);
    setSubmitted(false);
    setOpen(false);

    // Reset the categories state in Redux store
    const resetCategories = { ...categories };
    resetCategories.questions = resetCategories.questions.map((q) => {
      q.choices = q.choices.map((c) => {
        delete c.getClass;
        delete c.selected;
        return c;
      });
      return q;
    });
    dispatch(updateCategorySubmit(resetCategories));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {/* Main Container */}
      <Container
        maxWidth="false"
        sx={{ bgcolor: "#cfe8fc", height: "unset", minHeight: "100vh" }}
      >
        {/* Stack for centering and spacing */}
        <Stack spacing={10} justifyContent="center" alignItems="center">
          {/* Category title */}
          <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
            <Typography variant="h2">{categoryDetails?.title}</Typography>
          </Box>
          {/* Questions */}
          {categoryDetails?.questions?.map((question, index) => (
            <Box
              key={question.id}
              mb={3}
              sx={{
                width: "60%",
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <FormControl fullWidth sx={{ p: 2 }} variant="filled">
                <Typography variant="h4">
                  {`Question ${index + 1}: ${question.question_text}`}
                </Typography>
                <RadioGroup
                  name={`question-${question.id}`}
                  sx={{ paddingTop: "20px" }}
                  required
                >
                  {question.choices.map((c) => {
                    const { id, choice, getClass, selected } = c;
                    return (
                      <FormControlLabel
                        key={id}
                        value={id}
                        className={`answer ${getClass}`}
                        control={
                          <Radio
                            checked={selectedAnswers[question.id] === id}
                            onChange={() =>
                              setSelectedAnswers({
                                ...selectedAnswers,
                                [question.id]: id,
                              })
                            }
                          />
                        }
                        label={choice}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          {/* Submit or Retake buttons */}
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
            <Stack direction="row" spacing={2}>
              {!submitted && (
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleSubmit}
                  color="secondary"
                >
                  Submit
                </Button>
              )}

              {submitted && (
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleRetake}
                  color="primary"
                >
                  Retake
                </Button>
              )}
            </Stack>
          </FormControl>
        </Stack>
        {/* Snackbar for showing the results */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          // onClose={handleClose}
          message={`You got ${correctAnswers} out of ${categoryDetails?.questions?.length} correct`}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </>
  );
}

export default Category;

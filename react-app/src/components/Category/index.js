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
import CloseIcon from "@mui/icons-material/Close";

// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

function Category() {
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const { id } = useParams();
  const { user } = useSelector((state) => state.session);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const categories = useSelector((state) => state.categories);

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

  return (
    <>
      <Container
        maxWidth="false"
        sx={{ bgcolor: "#cfe8fc", height: "unset", minHeight: "100vh" }}
      >
        <Stack spacing={10} justifyContent="center" alignItems="center">
          <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: "50px" }}>
            <Typography variant="h2">{categoryDetails?.title}</Typography>
          </Box>
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
          <FormControl fullWidth sx={{ p: 2 }} variant="filled">
          <Stack direction="row" spacing={2}>
            {!submitted && (
              <Button
                size="large"
                variant="contained"
                // onClick={handleSubmit}
                color="secondary"
              >
                Submit
              </Button>
            )}

            {submitted && (
              <Button
                size="large"
                variant="contained"
                // onClick={handleRetake}
                color="primary"
              >
                Retake
              </Button>
            )}
        </Stack>
        </FormControl>
      </Stack>
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
            // onClick={handleClose}
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

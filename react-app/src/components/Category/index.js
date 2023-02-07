import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryByIdThunk } from "../../store/category";

function Category() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [color, setColor] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const categoryDetails = useSelector((state) => state.categories.category)

  useEffect(() => {
    const getCategory = async () => {
      const category = await dispatch(getCategoryByIdThunk(id));
      setCategory(category);
    };
    getCategory();
    setLoading(false);
  }, [id, dispatch]);

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted");
    let correctAnswers = 0;
    categoryDetails.questions.forEach((question) => {
        const chosenAnswer = question.choices.find((choice) => choice.id === selectedAnswers[question.id])
        if(chosenAnswer.is_correct){
              setColor("green")
            correctAnswers++
        }
        else{
          setColor("red")
        }
    });
    console.log(`You got ${correctAnswers} out of ${categoryDetails.questions.length} correct`);
  };

  console.log(categoryDetails, 'JOASIFJAW;OEIF')

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h2" align="center">
        {categoryDetails?.title}
      </Typography>
      {categoryDetails?.questions?.map((question, index) => (
        <Box key={question.id} mb={3}>
          <Typography variant="h4">
            {`Question ${index + 1}: ${question.question_text}`}
          </Typography>
          <RadioGroup name={`question-${question.id}`}>
              {question.choices.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  value={choice.id}
                  control={
                    <Radio
                      checked={selectedAnswers[question.id] === choice.id}
                      onChange={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [question.id]: choice.id
                        })
                      }
                    />
                  }
                  label={choice.choice}
                />
              ))}
            </RadioGroup>
        </Box>
      ))}
      <Box mt={3}>
          <button onClick={handleSubmit}>Submit</button>
        </Box>
    </Box>
  );
}

export default Category;

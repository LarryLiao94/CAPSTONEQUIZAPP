import { useState } from 'react';
import { FormControl, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

function SingleQuestion(props) {
  const [question, setQuestion] = useState({ question_text: '', choices: [{ choice: '', is_correct: false }] });
  const [choice, setChoice] = useState({ choice: '', is_correct: false });
  const [correctChoice, setCorrectChoice] = useState(-1);

  const handleQuestionChange = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };

  const handleChoiceChange = (event) => {
    setChoice({ ...choice, [event.target.name]: event.target.value });
  };

  const handleCorrectChange = (event, index) => {
    if (index === correctChoice) {
      setCorrectChoice(-1);
    } else {
      setCorrectChoice(index);
    }
  }

  const handleAddChoice = (event) => {
    setQuestion({ ...question, choices: [...question.choices, choice] });
    setChoice({ choice: '', is_correct: false });
  };

  return (
    <Box>
      <FormControl fullWidth variant="filled">
        <TextField
          id={props.id}
          label={props.label}
          name="question_text"
          onChange={handleQuestionChange}
          variant="standard"
        />
      </FormControl>
      {question.choices.map((c, i) => (
        <Box key={i + 1}>
          <FormControl fullWidth variant="filled">
            <TextField
              id={i + 1}
              label={`Choice ${i + 1}`}
              name="choice"
              onChange={handleChoiceChange}
              value={c.choice}
              variant="standard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={i === correctChoice}
                  onChange={(event) => handleCorrectChange(event, i)}
                  name="is_correct"
                />
              }
              label="Correct Answer"
            />
          </FormControl>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddChoice}>
        Add Choice
      </Button>
    </Box>
  );
}

export default SingleQuestion
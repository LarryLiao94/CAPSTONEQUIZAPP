import React, { useState, useEffect } from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { getAllQuestionsThunk } from "../../store/question";
import { useSelector, useDispatch } from "react-redux";

function Questions() {
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        const getQuestions = async () => {
            await dispatch(getAllQuestionsThunk());
            setLoading(false);
        };
        getQuestions();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            {questions.map((question, index) => (
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
        </Box>
    );
}

export default Questions;
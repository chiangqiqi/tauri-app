import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { styled } from '@mui/system';

const AnswerContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const OptionsContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

function AnswerCard(props) {
  const { questions } = props;
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
  };

  const getResultColor = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      return 'green';
    } else {
      return 'red';
    }
  };

  return (
    <AnswerContainer>
      {questions.map((q, index) => (
        <Box key={q.id} sx={{ display: showResults ? 'flex' : 'none', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body1">{q.id}. {q.question}</Typography>
          {showResults && (
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="body1" style={{ color: getResultColor(answers[index], q.answer[0]) }}>
                ({answers[index] === q.answer[0] ? 'Correct' : 'Incorrect'})
              </Typography>
            </Box>
          )}
        </Box>
      ))}
      {questions.map((q, index) => (
        <Box key={q.id}>
          <Typography variant="body1" gutterBottom>{q.id}. {q.question}</Typography>
          <RadioGroup
            value={answers[index]}
            onChange={(event) => handleChange(event, index)}
          >
            {q.options.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                value={String.fromCharCode(65 + optionIndex)}
                control={<Radio color="primary" disabled={showResults} />}
                label={`${String.fromCharCode(65 + optionIndex)}. ${option}`}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
      {!showResults ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleCheckAnswers}>Check Answers</Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </AnswerContainer>
  );
}

export default AnswerCard;

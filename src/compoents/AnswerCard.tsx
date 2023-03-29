import React, { useState } from "react";
import { Typography, Box, Grid, Paper, Button } from "@mui/material";

interface AnswerCardProps {
    questions: object[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const handleSelectAnswer = (questionIndex: number, answer: string) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = answer;
        setSelectedAnswers(updatedAnswers);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="center">
                {questions.map(({question, options}: any, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper sx={{ padding: "1rem" }}>
                            <Typography variant="body1">{question}</Typography>
                            <Box sx={{ marginTop: "1rem" }}>
                                {
                                    options.map((v,k)=>{
                                        let answer = '';
                                        switch (k){
                                            case 0:
                                                answer = 'A';
                                                break;
                                            case 1:
                                                answer = 'B';
                                                break;
                                            case 2:
                                                answer = 'C';
                                                break;
                                            case 3:
                                                answer = 'D';
                                                break;

                                        }
                                        return (<Button
                                            variant={selectedAnswers[index] === answer ? "contained" : "outlined"}
                                            onClick={() => handleSelectAnswer(index, answer)}
                                        >{answer}</Button>)
                                    })
                                }
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AnswerCard;

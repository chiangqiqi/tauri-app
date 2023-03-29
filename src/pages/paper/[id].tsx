import { Box, Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import AnswerCard from "../../compoents/AnswerCard";
import Navigation from "../../compoents/Navigation";

const passage = {
    title: 'The Benefits of Reading',
    content:
        'Reading is one of the most important skills a person can learn. It is the key to success in school, work, and life. Reading helps us to learn new things, expand our vocabulary, and improve our communication skills. It can also be a great source of entertainment and relaxation.\n\nReading is particularly important for young children. It helps to build their cognitive and language skills, as well as their imagination and creativity. Children who read regularly often perform better in school and have a higher chance of success in life.\n\nHowever, reading is not just important for children. Adults can also benefit from reading. It can help to reduce stress, improve brain function, and increase empathy and understanding of others. Reading can also be a great way to learn about new topics and ideas, and to stay informed about current events and trends.',
    questions: [
        {
            id: 1,
            question: 'What are the benefits of reading?',
            answer: 'Reading helps us to learn new things, expand our vocabulary, and improve our communication skills. It can also be a great source of entertainment and relaxation.'
        },
        {
            id: 2,
            question: 'Why is reading particularly important for young children?',
            answer: 'It helps to build their cognitive and language skills, as well as their imagination and creativity. Children who read regularly often perform better in school and have a higher chance of success in life.'
        },
        {
            id: 3,
            question: 'Can adults benefit from reading as well?',
            answer: 'Yes, reading can help to reduce stress, improve brain function, and increase empathy and understanding of others. Reading can also be a great way to learn about new topics and ideas, and to stay informed about current events and trends.'
        }
    ]
};

const ReadingPassageContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const QuestionsList = styled(List)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const QuestionButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    }
}));

function ReadingPassage() {
    const [selectedQuestion, setSelectedQuestion] = useState(0);

    const handleQuestionClick = (id) => {
        setSelectedQuestion(id);
    };

    return (
        <>
        <Navigation title={'阅读理解'}></Navigation>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ReadingPassageContainer maxWidth="md">
                <Typography variant="h4" gutterBottom>{passage.title}</Typography>
                <Typography variant="body1" gutterBottom>{passage.content}</Typography>
                <QuestionsList>
                    {passage.questions.map(q => (
                        <ListItem key={q.id} disablePadding button onClick={() => handleQuestionClick(q.id)}>
                            <ListItemText primary={q.question} secondary={selectedQuestion === q.id ? q.answer : ''} />
                        </ListItem>
                    ))}
                </QuestionsList>
                <AnswerCard
                    questions={[
                        {
                            id: 1,
                            question:
                                "What is the main idea of the passage?",
                            options: [
                                "The different kinds of video games available.",
                                "The rise in popularity of video games.",
                                "The role of video games in education.",
                                "The benefits of playing video games."
                            ],
                            answer: ["B"]
                        },
                        {
                            id: 2,
                            question:
                                "What does the author mean by the phrase 'mainstream video games' in the first paragraph?",
                            options: [
                                "Video games that are popular with adults.",
                                "Video games that are only played on consoles.",
                                "Video games that have been around for a long time.",
                                "Video games that are popular with a wide audience."
                            ],
                            answer: ["D"]
                        },
                        {
                            id: 3,
                            question:
                                "According to the passage, how can playing video games benefit children?",
                            options: [
                                "By helping them focus for longer periods of time.",
                                "By providing them with an alternative to outdoor play.",
                                "By helping them develop cognitive and social skills.",
                                "By encouraging them to explore different cultures."
                            ],
                            answer: ["C"]
                        }
                    ]}
                />
        </ReadingPassageContainer>
        </Box>
        </>)
}

export default ReadingPassage;

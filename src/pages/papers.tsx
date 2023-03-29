import React from "react";

import useSwr from 'swr'
import {Test} from "../interfaces";
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";
import Navigation from "../compoents/Navigation";

import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import ExamCard from "../compoents/ExamCard";

const Root = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflow: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
}));

const CardGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(4),
}));

const CardItem = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const CardWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
}));

const CardMediaWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    paddingBottom: '56.25%',
}));

const CardMediaImage = styled(CardMedia)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundSize: 'contain',
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const CardContentTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
}));

const CardContentText = styled(Typography)(({ theme }) => ({
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const Papers: React.FC = () => {

    const router = useRouter();
    const { data = [], error, isLoading } = useSwr<Test[]>(`/api/answer/`, (url: string) => fetch(url).then((res) => res.json()));
    return (
        <Root>
            <Navigation title="智能试题" />
            <CardGrid container spacing={4}>

                    {
                        [
                            {
                                title: "数学试卷",
                                description: "这是一份测试数学知识的试卷。",
                                imageUrl: "https://via.placeholder.com/300x150.png?text=Placeholder",
                                id: '1'
                            },
                            {
                                title: "英语试卷",
                                description: "这是一份测试英语能力的试卷。",
                                imageUrl: "https://via.placeholder.com/300x150.png?text=Placeholder",
                                id: '2'
                            },
                            {
                                title: "物理试卷",
                                description: "这是一份测试物理知识的试卷。",
                                imageUrl: "https://via.placeholder.com/300x150.png?text=Placeholder",
                                id: '3'
                            },
                        ].map((exam) => (<CardItem item xs={12} md={6} lg={4}>
                            <ExamCard key={exam.title} title={exam.title}
                                                   description={exam.description}
                                                   imageUrl={exam.imageUrl}
                                      id={exam.id}
                            /></CardItem>)
                        )
                    }

            </CardGrid>
        </Root>)
}



export default Papers;

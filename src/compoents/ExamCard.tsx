import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

// 样式
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: "1rem",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    textAlign: "center",
}));

interface ExamCardProps {
    title: string;
    description: string;
    imageUrl: string;
    id?: string;
}

const ExamCard: React.FC<ExamCardProps> = ({ title, description, imageUrl, id= 0 }) => {
    return (
        <StyledCard>
            <StyledCardHeader title={title} />
            <StyledCardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <img src={imageUrl} alt={title} style={{ width: "100%", margin: "1rem 0" }} />
                <Link href={`/paper/${id}`}>
                  查看详情
                </Link>
            </StyledCardContent>
        </StyledCard>
    );
};

export default ExamCard;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Navigation from "../compoents/Navigation";

const Root = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflow: 'hidden',
}));

const Banner = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    background: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url('https://via.placeholder.com/1500x500?text=Banner+Placeholder') no-repeat center center`,
    backgroundSize: 'cover',
}));

const BannerText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center',
}));

const Products = styled(Box)(({ theme }) => ({
    background: '#f5f5f5',
}));

const ProductCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    margin: 'auto',
    marginBottom: theme.spacing(4),
}));

const ProductMedia = styled(CardMedia)(({ theme }) => ({
    height: 250,
    backgroundSize: 'contain',
}));

const ProductContent = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
}));

const items = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

const CompanyHome: React.FC = () => {
    return (
        <Root>
            <Navigation title={'AI 教育'} ></Navigation>
            <Banner>
                <BannerText >
                    AI智能教育
                </BannerText>
            </Banner>
            <Products>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" align="center" gutterBottom>
                            产品介绍
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProductCard>
                            <ProductMedia
                                image="https://via.placeholder.com/500x250?text=Product+Placeholder"
                                title="Product Image"
                            />
                            <ProductContent>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    产品名称
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    产品描述文字
                                </Typography>
                            </ProductContent>
                        </ProductCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProductCard>
                            <ProductMedia
                                image="https://via.placeholder.com/500x250?text=Product+Placeholder"
                                title="Product Image"
                            />
                            <ProductContent>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    产品名称
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    产品描述文字
                                </Typography>
                            </ProductContent>
                        </ProductCard>
                    </Grid>
                </Grid>
            </Products>
        </Root>
    );
};

export default CompanyHome;

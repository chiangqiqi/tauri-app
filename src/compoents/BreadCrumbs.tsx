import {Breadcrumbs, Link, Typography} from "@mui/joy";
import {useRouter} from "next/router";
const pathMap = {
    '': '首页',
    'home': '主页',
    'paper': '试卷',
};

export default () => {
    const router = useRouter();
    const {
        pathname
    } = router;
    const urlParts = pathname.split('/');
    const breadcrumbItems = urlParts.map((part, index) => {
        const path = urlParts.slice(0, index + 1).join('/');
        const isLast = index === urlParts.length - 1;
        return isLast ? (
            <Typography key={index} color="text.primary">
                {pathMap[part]}
            </Typography>
        ) : (
            <Link key={index} color="inherit" to={path?path: '/'}>
                {
                    pathMap[part]
                }
            </Link>
        );
    });

    return <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems}
    </Breadcrumbs>
}

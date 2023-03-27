import express from 'express';
import weixin from './weixin';
import user from './user';
import toutiao from './toutiao';
import wechat from './wechat';
import douyin from './douyin';

const app = express();
app.use('/weixin', weixin);
app.use('/user', user);
app.use('/toutiao', toutiao);
app.use('/douyin', douyin);
app.use('/wechat', wechat);

export default app;

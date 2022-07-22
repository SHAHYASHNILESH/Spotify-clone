require('dotenv').config();
const express=require('express');
const playModel=require('./models/playModel');
const songModel=require('./models/songModel');
const playlistModel=require('./models/playlistModel');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

const userRouter=require('./Routers/userRouter');
app.use('/users',userRouter);
const songRouter=require('./Routers/songRouter');
app.use('/songs',songRouter);
const playlistRouter=require('./Routers/playlistRouter');
app.use('/playlist',playlistRouter);
const searchRouter=require('./Routers/searchRouter');
app.use('/search',searchRouter);


app.listen(3000); 
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



app.listen(3000); 
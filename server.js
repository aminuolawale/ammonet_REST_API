require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const server = express();
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true}).then(()=>console.log('connected to database'))
.catch(err=>console.log(err));

server.use(express.json());
server.use('/api',require('./routes/api/router'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
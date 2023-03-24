const express=require('express');
const colors =require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


const app=express();

/*app.use((req,res,next)=>{
    console.log("middleware ran");
    req.title="Ansari";
    next();
})*/

app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended:true
}));

dotenv.config({
    path:'./config/config.env'
});

connectDB();

app.get('/',(req,res)=>{
   res.status(200).json({
        msg:"Success"
   });
});


app.use('/api/todo/auth',require('./routes/user'));
/*app.get('/todo',(req,res)=>{
   res.status(200).json({
        "name":"Misbah",
   });
});*/


const PORT=process.env.PORT || 3000;

app.listen(PORT,console.log(`Server running on port:${PORT}`.red.underline.bold));
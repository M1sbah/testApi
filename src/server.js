const express=require('express');
const colors =require('colors');
const morgan = require('morgan');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');

const app=express();

const temperates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
const static_path=path.join(__dirname,".. /public");

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

//set paths
hbs.registerPartials(partials_path);


app.set("views",temperates_path);
app.use(express.static(static_path))
app.set("view engine","hbs");


app.get('/',(req,res)=>{
   res.render("index")
});


app.use('/api/todo/auth',require('../routes/user'));
/*app.get('/todo',(req,res)=>{
   res.status(200).json({
        "name":"Misbah",
   });
});*/


const PORT=process.env.PORT || 3000;

app.listen(PORT,console.log(`Server running on port:${PORT}`.red.underline.bold));
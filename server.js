//Getting the installed packages OR libraries
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser = require('body-parser');

//importing routes
const EmployeeRoute=require('./routes/employee')
const AuthRoute=require('./routes/auth')

//connecting to mongoDB with mongoose
mongoose.connect(`mongodb://localhost:27017/testdb`,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection
//if some error
db.on('error',(err)=>{
    console.log(err)
})
db.once("open",()=>{
    console.log('Database connection established')
})

//Using express
const app=express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
//Port on which app should run
const PORT= process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/employee',EmployeeRoute)
app.use('/api',AuthRoute)
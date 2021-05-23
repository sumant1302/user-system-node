//import the model
const { connections } = require('mongoose')
const Employee= require('../models/Employee')

//show the list of employees
const index= (req,res,next)=>{
    Employee.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
        message:'An error occurred'
        })
    })
}
const show=(req,res,next)=>{
    let employeeID=req.body.employeeID
    Employee.findById(employeeID)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res,json({
        message:'Some error occurred'
        })
    })
}
//Add a employee to database
const store=(req,res,next)=>{
    let employee=new Employee({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    })
    if(req.files){
        let path= ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path+ ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar=path
    }

    employee.save()
    //a promise
    .then(response=>{
        res.json({
            message:'Data added successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'An error occurred'
        })
    })
}

//Updating employee by employeeID
const update=(req,res,next)=>{
    let employeeID=req.body.employeeID

    let updateData={
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updateData})
    .then(response=>{
        res.json({
            message:'Data successfully updated'
        })
    })
    .catch(error=>{
        res.json({
            message:'Error! Data not updated'
        })
    })
}

//to delete data
const destroy=(req,res,next)=>{
    let employeeID=req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message:'Employee deleted successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'There was some error'
        })
    })
}
module.exports={
    index,show,store,update,destroy
}
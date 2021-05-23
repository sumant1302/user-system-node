const express=require('express')
const router=express.Router()

const employeeController=require('../controller/EmployeeController.js')
const upload = require('../middleware/upload.js')
const authenticate = require('../middleware/authenticate')

router.get('/',authenticate, employeeController.index)
router.post('/show',employeeController.show)
router.post('/store',upload.single('avatar'),employeeController.store)
router.post('/update',employeeController.update)
router.post('/destroy',employeeController.destroy)

module.exports=router
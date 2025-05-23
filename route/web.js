const express = require('express')
const SchoolController = require('../Controller/SchoolController')
const route = express.Router()


route.post('/schoolInsert',SchoolController.addSchool)
route.get('/listschool',SchoolController.listSchools)


module.exports = route
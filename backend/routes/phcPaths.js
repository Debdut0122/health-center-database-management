const express = require('express')
const {
    getAllData,
    getData,
    createData,
    deleteData,
    updateData,
    searchData
} = require('../controllers/controller')

const router = express.Router()

//get all datas
router.get('/', getAllData)

//get a single data
router.get('/:id', getData)
//get a single data
router.post('/search', searchData)

//post a new data
router.post('/', createData)

//delete a data
router.delete('/:id', deleteData)

//update a  data
router.patch('/:id', updateData)

module.exports = router
const DB = require('../models/phcDBModel')
const mongoose = require('mongoose')

const getAllData = async(req, res) => {
    const page = req.query.page;
    const datas = await DB.find({}).sort({createdAt: -1}).skip((page-1)*10).limit(10)
    res.status(200).json(datas)
}

const getData = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no such data '})
    }
    const data = await DB.findById(id)
    if(!data) {
        return res.status(404).json({error: 'no such data'})
    }
    res.status(200).json(data)
}

const createData = async(req, res) => {
    const {name, age, sex, email, phone, description} = req.body

    let emptyFields = []

    if(!name) {
        emptyFields.push('name')
    }
    if(!age) {
        emptyFields.push('age')
    }
    if(!sex) {
        emptyFields.push('sex')
    }
    if(!email) {
        emptyFields.push('email')
    }
    
    if(!phone) {
        emptyFields.push('phone')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'please fill in all the fields', emptyFields })
    }

    try {
      const dataD = await DB.create({name, age, sex, email, phone, description})
      res.status(200).json(dataD)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteData = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no such DB '})
    }
    const data = await DB.findOneAndDelete({_id: id})
    if(!data) {
        return res.status(404).json({error: 'no such DB'})
    }
    res.status(200).json(data)
}


const updateData = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no such DB '})
    }
    const data = await DB.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    if(!data) {
        return res.status(404).json({error: 'no such DB'})
    }

    res.status(200).json(data)

}

const searchData = async (req, res) => {

    // console.log("req:",req)
    try {
        const str =req.body.searchTerm;
        console.log("This is printing",req.body.searchTerm)
        // Use regular expressions to search for "Deb" in any of the fields
        const result = await DB.find({
          $or: [
            { name: { $regex: str, $options: 'i' } },
            { email: { $regex: str, $options: 'i' } },
            { phone: { $regex: str, $options: 'i' } }, 
            {age:{$regex: str, $options: 'i'}},
            {sex:{$regex: str, $options: 'i'}},
            {description:{$regex: str, $options: 'i'}}
          ],
        });
        // console.log("result is: ",result)
        res.status(200).json(result);
      } catch (error) {
        //   console.error('Error searching for documents:', error);
        res.status(404).json({error: 'no such data'})
      }    
}


// searchData();
module.exports = {
    getAllData,
    getData,
    createData,
    deleteData,
    updateData,
    searchData
}
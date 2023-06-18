const express = require('express');
const InstModel = require('../models/course.model');
const instRouter = express.Router();

instRouter.post("/add", async(req, res)=>{
    const payload = req.body
    
    const data = new InstModel(payload)
    await data.save()
    res.status(201).send({
        msg:"courses added successfully"
    })
})

instRouter.get("/get", async(req, res)=>{
    const data = await InstModel.find({UserID: req.body.UserID})
    res.send({
        msg:data
    })
});

   instRouter.patch("/update/:id", async (req, res)=>{
          const id = req.params.id
          let payload = req.body
          const data = await InstModel.findByIdAndUpdate({_id:id}, payload)
          res.status(200).send({
              msg:"courses updated successfully"
          })
   })

   instRouter.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id
    const data = await InstModel.findByIdAndDelete({_id:id})
    res.status(200).send({
        msg:"courses deleted successfully"
    })
})

instRouter.get("/getback/:id", async(req, res)=>{
    const id = req.params.id
    const data = await InstModel.find({_id: id})
    res.status(200).send({
        msg:data
    })
})

instRouter.get("/all",async(req,res)=>{

        const course = await InstModel.find()
        
        res.send(course)
})



module.exports = {instRouter};
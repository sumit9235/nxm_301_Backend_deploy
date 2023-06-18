const mongoose = require('mongoose')

const InstSchema = mongoose.Schema({
studentLearn1: String,

studentLearn2: String,

studentLearn3: String,

studentLearn4: String,

prerequisites: String,

courseFor: String,

videoTitle:String,

videoLanguage:String,

videoHours:String,

videoUrl:String,

price : String,

videoCategory:String,

thumbnail:String,

videoDescription:String,

UserID:String ,
})

const InstModel = mongoose.model("course", InstSchema)

module.exports = InstModel
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {type:String,match:/[a-z]+/,max:50,required: true},
  lastName: {type:String,max:50,required: true},
  mobile: {type:Number,match: /\d{10}/,required: true},
  date: {type: Date,default: Date.now},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true,
    max: 50
  },
  role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
});


// Export the model
module.exports = mongoose.model('User', UserSchema);
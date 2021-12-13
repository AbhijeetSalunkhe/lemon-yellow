/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String,match:/[a-z]+/,max:50,required: true}
});


// Export the model
module.exports = mongoose.model('Role', RoleSchema);
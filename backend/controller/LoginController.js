/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const User = require('./../models/user');
const helper = require('./HelperController');

module.exports.signup = function (req, res, next) {
    User.find({email:req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            helper.sendError('','Email already exits!','409',function (result) {
                return res.json(result);
            });
        }
        else{
            bycrpt.hash(req.body.password,10, (err,hash)=>{
                if(err){
                    helper.sendError('','somthing went wrong while signup user!','401',function (result) {
                        return res.json(result);
                    });
                } else {
                    let user = new User(
                        {
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            address: req.body.address,
                            email: req.body.email,
                            password: hash,
                            mobile: req.body.mobile,
                            date: req.body.selectedDate,
                            type: req.body.type
                        }
                    );
                    user.save()
                    .then( result => {
                        if(result)
                            helper.sendResponce('','Register Successfully','200',function (result) {
                                return res.json(result);
                            });
                        else 
                            helper.sendError('','User not created!','404',function (result) {
                                return res.json(result);
                            });
                    })
                    .catch(err => {
                        helper.sendError('',err.message,'500',function (result) {
                            return res.json(result);
                        });
                    });
                }
            });
        }
    });
};

module.exports.login = function (req, res, next) {
    User.find({email:req.body.email})
    .exec()
    .then( user => {
        if(user.length < 1){
            helper.sendError('','Auth Fail','409',function (result) {
              return res.json(result);
            });
        } else {
            if(req.body.type === user[0].type){
                bycrpt.compare(req.body.password,user[0].password, (err,result)=>{
                    if(err){
                        helper.sendError('','Auth Fail','401',function (result) {
                            return res.json(result);
                          });                
                        }                 
                    if(result){
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        config.JWT_TOKEN,
                        {
                            expiresIn: "1d"
                        });
                        helper.sendResponce({token:token},'Auth Success','200',function (result) {
                            return res.json(result);
                        });
                    }
                });
            } else {
                helper.sendError('','Auth Fail','401',function (result) {
                    return res.json(result);
                });
            }
            
        }
    })
    .catch(err => {
        helper.sendError('',err.message,'500',function (result) {
            return res.json(result);
        });
    });
};



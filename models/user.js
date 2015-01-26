/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose=require('mongoose');
var UserSchema=require('../schemas/user');
var User=mongoose.model('User',UserSchema);

module.exports=User;
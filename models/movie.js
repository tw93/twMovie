/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose=require('mongoose');
var MovieSchama=require('../schemas/movie');
var Movie=mongoose.model('Movie',MovieSchama);

module.exports=Movie;
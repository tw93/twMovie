/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose=require('mongoose');
var MovieSchema=require('../schemas/movie');
var Movie=mongoose.model('Movie',MovieSchema);

module.exports=Movie;
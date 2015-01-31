/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    language: String,
    country: String,
    pv: {
        type:Number,
        default:0
    },
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = Date.now();
        this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

MovieSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({
            _id: id
        }).exec(cb);
    }
};
module.exports = MovieSchema;
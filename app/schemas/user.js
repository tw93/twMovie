/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    // 0 nomal user
    // 1 verified user
    // 2 profession user
    // 
    // >10 admin
    // >50 super admin
    role:{
        type:Number,
        default:0
    },
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

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = Date.now();
        this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    var user = this
    var shaSum = crypto.createHash('sha256');
    shaSum.update(user.password);
    user.password = shaSum.digest('hex');
    next();
});

UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({
            _id: id
        }).exec(cb);
    }
};

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(_password);
        if (shaSum.digest('hex') == this.password) {
            cb(1);
        } else {
            cb(0);
        }
    }
}


module.exports = UserSchema;
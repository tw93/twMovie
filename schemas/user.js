/**
 * Created by tangwei on 2015/1/23.
 */
var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var SALT_WORK_FACTORY=10;
var UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=Date.now();
        this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    bcrypt.getSalt(SALT_WORK_FACTORY,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            usr.password=hash;
            next();
        })
    });
    next();
});

UserSchema.statics={
    fetch: function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function (id,cb) {
        return this.findOne({_id:id}).exec(cb);
    }
};
module.exports=UserSchema;
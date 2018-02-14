const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
   email: { type: String, unique: true , lowercase: true},
   password: String
});

//On Save hook, encrypt password
// salt + plain password = hashed password
userSchema.pre('save', function(next){
    console.log(this);
    const user = this;

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err);}

        // hash our password with the salt just generated
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePW, cb) {
    bcrypt.compare(candidatePW, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });    
}

const model = mongoose.model('user', userSchema);

module.exports = model;
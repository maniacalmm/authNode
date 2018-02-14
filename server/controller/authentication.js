const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat:timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: 'email / password cannot be blank'});
    }

    User.findOne({email: email}, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user) {
            console.log(user);
            return res.status(422).send({error: 'email already taken'});
        }

        const newUser = new User({
            email: email,
            password: password
        });

        // after signup, we consider the user logged in
        newUser.save((err) => {
            if (err) return next(err);
            return res.json({token: tokenForUser(newUser)});
        });

    });
}

exports.signin = function(req, res, next) {
    //User already had their email and password auth'ed
    // we just need to give them the token

    res.send(tokenForUser(req.user));
}
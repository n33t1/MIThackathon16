// Contains all database operations using mongoose.
module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server.js")();

    // pass mongoose an instance of the mongoose Schema, in order to define a mongoose Model named "User":
    var User = mongoose.model("User", UserSchema);

    var api = {
        // TODO API for UserSchema
        createUser: createUser,
        findUserById: findUserById,
        findUserByEmail: findUserByEmail,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByTwitterId: findUserByTwitterId
    };
    return api;

    function createUser(user) {
        // Asynchronous network communication to the mongodb
        return User.create(user);
    }

    function findUserById(userId) {
        // This is going to find by id, and return a single user, not an array.
        // Null if no matches.
        return User.findById(userId);
    }

    function findUserByEmail(email) {
        return User.findOne({
            email: email
        });
    }

    // Using email and password pair
    function findUserByCredentials(email, password) {
        return User.findOne({
            email: email,
            password: password
        });
    }

    function updateUser(userId, user) {
        delete user._id;
        return User.update(
            {_id: userId},
            {$set: user}
        );
    }

    function deleteUser(userId) {
        return User.findOneAndRemove({
            _id: userId
        });
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({
            'socialMediaAPIs.facebook.id': facebookId
        });
    }

    function findUserByTwitterId(twitterId) {
        return User.findOne({
            'socialMediaAPIs.twitter.id': twitterId
        });
    }
};
// Contains all database operations using mongoose.
module.exports = function() {

    var mongoose = require("mongoose");

    var EventSchema = require("./event.schema.server.js")();

    // pass mongoose an instance of the mongoose Schema, in order to define a mongoose Model named "User":
    var Event = mongoose.model("Event", EventSchema);

    var api = {
        // TODO API for EventSchema
        // createUser: createUser,
        // findUserById: findUserById,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials,
        // updateUser: updateUser,
        // deleteUser: deleteUser,
        // findUserByFacebookId: findUserByFacebookId
    };
    return api;
};
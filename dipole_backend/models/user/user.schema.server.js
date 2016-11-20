// Create a mongoose Schema that defines what is a user
module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        email: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        phone: {type: Number},
        _profileID: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
        _feedID: {type: mongoose.Schema.Types.ObjectId, ref: "Feed"},

        _wishListID: {type: mongoose.Schema.Types.ObjectId, ref: "WishList"},
        _giveListID: {type: mongoose.Schema.Types.ObjectId, ref: "GiveList"},

        // requestedList: [{type: mongoose.Schema.Types.ObjectId, ref: "Request"}],
        createdEventsList: [{
            _eventID: {type: mongoose.Schema.Types.ObjectId, ref: "GiveList"},
            name: String,
            description: String,
            dateCreated: {type: Date, default: Date.now},
            tags: [String]}],
        socialMediaAPIs: {
            facebook: {id: String, displayName: String},
            twitter: {id: String},
            linkedIn: {id: String}},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "dipole.user"});

    return UserSchema;
};
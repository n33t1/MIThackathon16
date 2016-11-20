module.exports = function() {

    var mongoose = require("mongoose");

    var EventSchema = mongoose.Schema({
            _admin: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            name: String,
            description: String,
            publishStatus : {type: Boolean, enum: {expired, draft, live}},
            // coverPicture = filepath,
            dateCreated : {type: Date, default: Date.now},
            time : {startTime: DateTime, endTime: DateTIme},
            address : {
                street: String,
                number: String,
                zip: String,
                city: String},
            socialMediaAPIs: {
                facebook: {id: String, displayName: String},
                twitter: {id: String},
                linkedIn: {id: String}},
            _wishListID: {type: mongoose.Schema.Types.ObjectId, ref: "WishList"},
            _giveListID: {type: mongoose.Schema.Types.ObjectId, ref: "GiveList"},
            Tags : [String],
            recommendations : [eventID]
            // type: enumeration{“courses”, “activities”},
}, {collection: "dipole.event"});

    return WebsiteSchema;
};

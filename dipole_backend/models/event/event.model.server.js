// Contains all database operations using mongoose.
module.exports = function() {

    var mongoose = require("mongoose");

    var EventSchema = require("./event.schema.server.js")();

    // pass mongoose an instance of the mongoose Schema, in order to define a mongoose Model named "User":
    var Event = mongoose.model("Event", EventSchema);

    var api = {
//        findEventByCreator: findEventByCreator,
        findEventByEventname: findEventByEventname,
        findEventById: findEventById,
        findAllEvents: findAllEvents,
        createEvent: createEvent,
        removeEvent: removeEvent,
        updateEvent: updateEvent,
        getMongooseModel: getMongooseModel
    };
    return api;

    function updateEvent(eventId, event) {
        return EventModel.update({_id: eventId}, {$set: event});
    }

    function removeEvent(eventId) {
        return EventModel.remove({_id: eventId});
    }

    function findAllEvents() {
        return EventModel.find();
    }
    function createEvent(event, _admin) {
        website._admin = userId;
        return EventModel.create(event);
    }

    function findEventByEventname(eventname) {
        return EventModel.findOne({eventname: eventname});
    }

    function getMongooseModel() {
        return EventModel;
    }

    function findEventById(eventId) {
        return EventModel.findById(eventId);
    }

};

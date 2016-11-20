module.exports = function(app,models) {

    var eventModel = models.eventModel;
    var userModel = models.userModel;

    app.post('/api/event', auth, createEvent);
    app.get('/api/event', auth, findAllEvents);
    app.put('/api/event/:id', auth, updateEvent);
    app.delete('/api/event/:id', auth, deleteEvent);

    function createEvent(req, res) {
        var newEvent = JSON.parse(JSON.stringify(req.body));
        var devId = req.params.userId;

        // Null check
        if (newEvent == null || devId == null) {
            res.status(400).send("Event cannot be null!");
            return;
        }

        // 1. Create event in event model
        eventModel
            .createEventForUser(devId, newEvent)
            .then(
                function (event) {

                    userModel
                        .findUserById(devId)
                        .then(
                            function (user) {

                                // User with devId does not exist
                                if (!user) {
                                    res.status(400).send("Given developer id " + devId + " does not exist!");
                                    return;
                                }

                                // Add new event reference to user
                                user.event.push(event._id);
                                console.log(user.events);
                                userModel
                                    .updateUser(devId, user)
                                    .then(
                                        function (user) {
                                            // DO NOTHING
                                        },
                                        function (error) {
                                            // Failed to update the event reference to the user
                                            res.status(404).send(
                                                "Failed to update list of event references to user with id: "
                                                + id + "! " + error.data);
                                        }
                                    );

                                res.json(event);
                            },
                            function (error) {
                                res.status(400).send(error.data);
                            }
                        );
                },
                function (error) {
                    res.status(400).send(
                        "Failed to create event for user with id "
                        + devId + "! " + error.data);
                }
            );
    }

    function findAllEvents(req, res) {
        eventModel
            .findAllEvents()
            .then(
                function (events) {
                    res.json(events);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteEvent(req, res) {
        eventModel
            .removeEvent(req.params.id)
            .then(
                function (event) {
                    return eventModel.findAllEvents();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (events) {
                    res.json(events);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateEvent(req, res) {
        var newEvent = req.body;

        eventModel
            .updateEvent(req.params.id, newEvent)
            .then(
                function (event) {
                    return eventModel.findAllEvents();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (events) {
                    res.json(events);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}

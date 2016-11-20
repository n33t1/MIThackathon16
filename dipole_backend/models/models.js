module.exports = function() {

    var mongoose = require("mongoose");

    var connectionString = "mongodb://dipoleTeam:dipole-team-amber-jeffrey-1@cluster0-shard-00-00-oucec.mongodb.net:27017,cluster0-shard-00-01-oucec.mongodb.net:27017,cluster0-shard-00-02-oucec.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
    // if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var eventModel = require("./event/event.model.server.js")();
    // var websiteModel = require("./website/website.model.server.js")();
    // var pageModel = require("./page/page.model.server.js")();
    // var widgetModel = require("./widget/widget.model.server.js")();

    // Map
    var models = {
        userModel: userModel,
        eventModel: eventModel,
        requestModel: requestModel
    //     websiteModel: websiteModel,
    //     pageModel: pageModel,
    //     widgetModel: widgetModel
    };
    return models;
};
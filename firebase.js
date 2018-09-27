var firebase = require("firebase");
var config = require("./secret");

export const mobileApp = firebase.initializeApp(config);

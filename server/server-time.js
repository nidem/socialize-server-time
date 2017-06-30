Meteor.methods({
    'socialize:getServerTime': function() {
    	Meteor._sleepForMs(1000);
        return Date.now();
    }
});

// Unify client / server api
ServerTime.now = function() {
    return Date.now();
};

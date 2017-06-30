ServerTime.init = function() {
    ServerTime._diffStart = Date.now();

    Meteor.call("socialize:getServerTime", function(error,serverTimeStamp){
        if(!error){
            var now = Date.now();
            var latency = now - ServerTime._diffStart;
            if (latency < 2000 && latency > -999) {
                // nuke the latency if it is less than 2s and (mostly) positive
                latency = 0;
            }
            
            ServerTime._timeDifference = serverTimeStamp + latency - now;
        }else{
            throw(error); 
        }
    });
};

//At startup, wait a couple seconds so that we can get a more accurate latency estimation.
//This is far from optimal but should work.
Meteor.startup(function(){
    Meteor.setTimeout(function(){
        ServerTime.init();
    }, 2000);
});

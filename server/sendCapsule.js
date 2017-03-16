var socket;
var id_capsule = 0;

var fs = Npm.require('fs');
var obj;
Future = Npm.require('fibers/future');
var myFuture = new Future();
fs.readFile('/home/akrem/Akrem/Projects/SmartScreen/server/configuration.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  myFuture.return(obj);
});
var json = myFuture.wait();

Meteor.startup(function () {
    var zmq = Npm.require('zeromq');
    socket = zmq.socket('dealer');
    socket.connect('tcp://'+json.mini_broker.address+':'+json.mini_broker.port);
    // Run mini broker
    const child_process = Npm.require('child_process');
    const exec = child_process.exec;
    // json.mini_broker.run : see configuration file
    exec(json.mini_broker.run, function (error, stdout, stderr) {
      //console.log("STDOUT"+stdout);
      console.log("ERROR"+error);
    });
});
Meteor.methods({
    'sendCapsule': function(capsule){
      id_capsule++;
      var json = {'id_capsule': id_capsule ,'id_sender': capsule.id_sender,'id_receiver': capsule.id_receiver, 'sending_date': capsule.sending_date, 'type': capsule.type,'status_capsule': capsule.status_capsule, 'payload': capsule.payload, 'priority': capsule.priority, 'ACK' : capsule.ACK, 'sort' : capsule.sort, 'tts': capsule.tts};
      console.log("Capsule : ", json);
      socket.send(JSON.stringify(json));
    },
});

var socket;
var id_capsule = 0;
Meteor.startup(function () {
  var zmq = Npm.require('zeromq');
  socket = zmq.socket('dealer');
  socket.connect('tcp://127.0.0.1:7000');
});
Meteor.methods({
    'sendCapsule': function(capsule){
      id_capsule++;
      var json = {'id_capsule': id_capsule ,'id_sender': capsule.id_sender,'id_receiver': capsule.id_receiver, 'sending_date': capsule.sending_date, 'type': capsule.type,'status_capsule': capsule.status_capsule, 'payload': capsule.payload, 'priority': capsule.priority, 'ACK' : capsule.ACK, 'sort' : capsule.sort, 'tts': capsule.tts};
      socket.send(JSON.stringify(json));

    },
});
/*- une connexion lors
et logique
- controle lors de l ajout de role (action = oui et autre action = non -> popup warning) oui & non --> et logique*/

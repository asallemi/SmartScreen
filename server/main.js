Screens = new Mongo.Collection('screens');
Clients = new Mongo.Collection('clients');
Segments = new Mongo.Collection('segments');
Bookings = new Mongo.Collection('bookings');

Bookings.allow({
  insert: function (userId, doc) {
    return true;
  }
});
Segments.allow({
  update: function (userId, doc) {
    return true;
  }
});
if (Meteor.isServer) {
  Meteor.publish('screens', function(){
        return Screens.find({});
  });
  Meteor.publish('segments', function(){
        return Segments.find({});
  });
  Meteor.publish('bookings', function(){
        return Bookings.find({});
  });
  Meteor.startup(function () {
    if (Screens.find().count() === 0) {
      var screen =
      {
          'screenLatitude': 49.0388900,
          'screenLongitude': 2.0770400,
          'screenDimension': '150x100',
          'screenDescription': 'second screen of smart screen solution',
          'screenAddedAt': new Date(),
          'screenStatus': 1,
          'screenAddress':'xxx'
      };
      Screens.insert(screen);
    }
    if (Clients.find().count() === 0) {
        var client =
          {
            'clientShortName': 'ARTI',
            'clientName': 'ARTI',
            'clientCode': 123456,
            'clientDescription': 'Azzzzzzzzzzerttttttttttty',
            'clientSector': 'Alimentation',
            'clientBalance': 2000,
            'clientType':'Corporate'
          };
        Clients.insert(client);
    }
    if (Segments.find().count() === 0) {
        var segment =
          {
            'segmentDate': '30/07/2016',
            'segmentStartTime': '9:30',
            'segmentEndTime': '9:40',
            'segmentDescription': 'Nothing to add',
            'segmentAvailability': 1,
            'segmentFile': '/home/akrem/pic.png',
            'segmentScreenID':'uWhymNmycA8pqSENR'
          };
        Segments.insert(segment);
    }
    if (Bookings.find().count() === 0) {
        var booking =
          {
            'segmentID': '57a896236675fe82c76345cd',
            'screenID': 'uWhymNmycA8pqSENR',
            'bookedDate': new Date(),
          };
        Bookings.insert(booking);
    }
  });
  //*************************************************************************************************************
  /*const child_process = Npm.require('child_process');
  const exec = child_process.exec;

  Future = Npm.require('fibers/future');
  var myFuture = new Future();

  console.log("I am server");
  var jsonArray =[];
  exec('python3.5 /home/akrem/Akrem/Projects/ChanelProjectMeteor/org/swallow_labs/test/T001.3.3-TestClient2Pull.py', function (error, stdout, stderr) {
      console.log("STDOUT"+stdout);
      console.log("ERROR"+error);
      jsonArray = JSON.parse(stdout);
      if(error){
        myFuture.throw(error);
      }else{
        myFuture.return(jsonArray);
      }
  });
  var array = myFuture.wait();
  if(array.length >1){
    for(i=0 ; i< array.length; i++){
      console.log("JSONARRAY[i]"+ array[i].type);
      var screen = {
          '_id': array[i].id_sender.toString(),
          'screenLatitude': array[i].payload.latitude,
          'screenLongitude': array[i].payload.longitude,
          'screenDimension': '150x100',
          'screenDescription': 'Screen added by broker',
          'screenAddedAt': new Date(),
          'screenStatus': 1,
          'screenAddress':'Allahou a3lam'
      };
      if(array[i].type === 'GPS_MESSAGE'){
        Screens.insert(screen);
      }

    }
  }else{
    var screen = {
      '_id': array[i].id_sender,
      'screenLatitude': array[0].payload.latitude,
      'screenLongitude': array[0].payload.longitude,
      'screenDimension': '150x100',
      'screenDescription': 'Screen added by broker',
      'screenAddedAt': new Date(),
      'screenStatus': 1,
      'screenAddress':'Allahou a3lam'
    };
    Screens.insert(array);
  }*/

}

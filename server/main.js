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
      var screen = [
        {
          'screenLatitude': 49.0388900,
          'screenLongitude': 2.0770400,
          'screenDimension': '150x100',
          'screenDescription': 'second screen of smart screen solution',
          'screenAddedAt': new Date(),
          'screenStatus': 1,
          'screenAddress':'xxx'
        }
      ];
      Screens.insert(screen);
    }
    if (Clients.find().count() === 0) {
        var client = [
          {
            'clientShortName': 'ARTI',
            'clientName': 'ARTI',
            'clientCode': 123456,
            'clientDescription': 'Azzzzzzzzzzerttttttttttty',
            'clientSector': 'Alimentation',
            'clientBalance': 2000,
            'clientType':'Corporate'
          }
        ];
        Clients.insert(client);
    }
    if (Segments.find().count() === 0) {
        var segment = [
          {
            'segmentDate': '30/07/2016',
            'segmentStartTime': '9:30',
            'segmentEndTime': '9:40',
            'segmentDescription': 'Nothing to add',
            'segmentAvailability': 1,
            'segmentFile': '/home/akrem/pic.png',
            'segmentScreenID':'uWhymNmycA8pqSENR'
          }
        ];
        Segments.insert(segment);
    }
    if (Bookings.find().count() === 0) {
        var booking = [
          {
            'segmentID': '57a896236675fe82c76345cd',
            'screenID': 'uWhymNmycA8pqSENR',
            'bookedDate': new Date(),
          }
        ];
        Bookings.insert(booking);
    }
  });
}

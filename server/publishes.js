if (Meteor.isServer) {
  Meteor.publish('screensLive', function(){
    return Screens_Live.find({});
  });
  Meteor.publish('usersLive', function(){
    return Users_Live.find({});
  });
  Meteor.publish('usersAuthorization', function(){
    return Users_Authorization.find({});
  });
  Meteor.publish('clientsLive', function(){
    //Meteor._sleepForMs(3000);
    return Clients_Live.find({});
  });
  Meteor.publish('clientsAuthorization', function(){
    return Clients_Authorization.find({});
  });
  Meteor.publish('bookingsLive', function(){
    return Bookings_Live.find({});
  });
  Meteor.publish('bookingsAuthorization', function(){
    return Bookings_Authorization.find({});
  });
  Meteor.publish('screens', function(){
    return Screens_Live.find({});
  });
  Meteor.publish('segmentsAuthorization', function(){
    return Segments_Authorization.find({});
  });
  Meteor.publish('segments', function(){
    return Segments_Live.find({});
  });
  Meteor.publish('bookings', function(){
    return Bookings_Live.find({});
  });
  Meteor.publish('contentsLive', function(){
    return Contents_Live.find({});
  });
  Meteor.publish('contentsAuthorization', function(){
    return Contents_Authorization.find({});
  });
  Meteor.publish('roles', function(){
    return Roles_Live.find({});
  });
  Meteor.publish('roles_authorization', function(){
    return Roles_Authorization.find({});
  });
  Meteor.publish('matrix', function(){
    return Matrix.find({});
  });
  Meteor.publish('plansLive', function(){
    return Plans_Live.find({});
  });
  Meteor.publish('plansAuthorization', function(){
    return Plans_Authorization.find({});
  });
  Meteor.publish('firmwaresLive', function(){
    return Firmwares_Live.find({});
  });
  Meteor.publish('firmwaresAuthorization', function(){
    return Firmwares_Authorization.find({});
  });
}

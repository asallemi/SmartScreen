if (Meteor.isServer) {
  Meteor.publish('usersLive', function(){
    return Users_Live.find({});
  });
  Meteor.publish('usersAuthorization', function(){
    return Users_Authorization.find({});
  });
  Meteor.publish('clientsLive', function(){
    return Clients_Live.find({});
  });
  Meteor.publish('clientsAuthorization', function(){
    return Clients_Authorization.find({});
  });
  Meteor.publish('screens', function(){
    return Screens_Live.find({});
  });
  Meteor.publish('segments', function(){
    return Segments_Live.find({});
  });
  Meteor.publish('bookings', function(){
    return Bookings_Live.find({});
  });
  Meteor.publish('contents', function(){
    return Contents_Live.find({});
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
}

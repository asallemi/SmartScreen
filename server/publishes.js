if (Meteor.isServer) {
  // ***************// Companies publisher //******************
  Meteor.publish('companiesLive', function(){
    return Companies_Live.find({});
  });
  Meteor.publish('companiesAuthorization', function(){
    return Companies_Authorization.find({});
  });
  // ***************// Contracts publisher //******************
  Meteor.publish('contractsLive', function(){
    return Contracts_Live.find({});
  });
  Meteor.publish('contractsAuthorization', function(){
    return Contracts_Authorization.find({});
  });
  Meteor.publish('contractsTypeLive', function(){
    return Contracts_Type_Live.find({});
  });
  Meteor.publish('contractsTypeAuthorization', function(){
    return Contracts_Type_Authorization.find({});
  });
  // ***************// Screens publisher //******************
  Meteor.publish('screensLive', function(){
    return Screens_Live.find({});
  });
  // ***************// Users publisher //******************
  Meteor.publish('usersLive', function(){
    return Users_Live.find({});
  });
  Meteor.publish('usersAuthorization', function(){
    return Users_Authorization.find({});
  });
  // ***************// Clients publisher //******************
  Meteor.publish('clientsLive', function(){
    //Meteor._sleepForMs(3000);
    return Clients_Live.find({});
  });
  Meteor.publish('clientsAuthorization', function(){
    return Clients_Authorization.find({});
  });
  /*Meteor.methods({
    'getClientsByIDCompany': function(id){
      Meteor.publish('clientsLive', function(){
        //Meteor._sleepForMs(3000);
        return Clients_Live.find({ "codeCompany": id });
      });
      Meteor.publish('clientsAuthorization', function(){
        return Clients_Authorization.find({ "codeCompany": id });
      });
    },
  });*/
  // ***************// Bookings publisher //******************
  Meteor.publish('bookingsLive', function(){
    return Bookings_Live.find({});
  });
  Meteor.publish('bookingsAuthorization', function(){
    return Bookings_Authorization.find({});
  });
  // ***************// Segments publisher //******************
  Meteor.publish('segmentsAuthorization', function(){
    return Segments_Authorization.find({});
  });
  Meteor.publish('segments', function(){
    return Segments_Live.find({});
  });
  // ***************// Contents publisher //******************
  Meteor.publish('contentsLive', function(){
    return Contents_Live.find({});
  });
  Meteor.publish('contentsAuthorization', function(){
    return Contents_Authorization.find({});
  });
  // ***************// Roles publisher //******************
  Meteor.publish('roles', function(){
    return Roles_Live.find({});
  });
  Meteor.publish('roles_authorization', function(){
    return Roles_Authorization.find({});
  });
  // ***************// Matrix publisher //******************
  Meteor.publish('matrix', function(){
    return Matrix.find({});
  });
  // ***************// Matrix publisher //******************
  Meteor.publish('languagesLive', function(){
    return Languages_Live.find();
  });
  // ***************// Plans publisher //******************
  Meteor.publish('plansLive', function(){
    return Plans_Live.find({});
  });
  Meteor.publish('plansAuthorization', function(){
    return Plans_Authorization.find({});
  });
  // ***************// Articles publisher //******************
  Meteor.publish('articlesLive', function(){
    return Articles_Live.find({});
  });
  Meteor.publish('articlesAuthorization', function(){
    return Articles_Authorization.find({});
  });
  Meteor.publish('articlesOptionsLive', function(){
    return Articles_Options_Live.find({});
  });
  Meteor.publish('articlesOptionsAuthorization', function(){
    return Articles_Options_Authorization.find({});
  });
  // ***************// Firmwares publisher //******************
  Meteor.publish('firmwaresLive', function(){
    return Firmwares_Live.find({});
  });
  Meteor.publish('firmwaresAuthorization', function(){
    return Firmwares_Authorization.find({});
  });
  Meteor.publish('firmwaresScreensLive', function(){
    return Firmwares_Screens_Live.find({});
  });
  Meteor.publish('firmwaresScreensAuthorization', function(){
    return Firmwares_Screens_Authorization.find({});
  });
  // ***************// Currencies publisher //******************
  Meteor.publish('currenciesLive', function(){
    return Currencies_Live.find({});
  });
  Meteor.publish('currenciesAuthorization', function(){
    return Currencies_Authorization.find({});
  });
}

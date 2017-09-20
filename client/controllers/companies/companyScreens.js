let handle = Meteor.subscribe('screensLive');
let handleSegment = Meteor.subscribe('segments');
let handleFSAuth = Meteor.subscribe('firmwaresScreensAuthorization');
let handleFSLive = Meteor.subscribe('firmwaresScreensLive');
let handleF = Meteor.subscribe('firmwaresLive');

function checkExistingNauList(element){
  var screen = Screens_Live.findOne({ "codeCompany": Session.get("COMPANY_CODE"), "_id": Session.get("SCREEN_ID")});
  if(screen.packagesNAU.indexOf(element) == -1 && screen.packagesAU.indexOf(element) == -1){
    return true;
  }
  return false;
}
// get all Not Assigned Packages
function getNotAssignedPackages(){
  var firmwares = Firmwares_Screens_Authorization.find({ "codeCompany": Session.get("COMPANY_CODE"), "screenID": Session.get("SCREEN_ID") });
  var firmwaresList = [];
  firmwares.forEach(function(doc){
    var pckg = Firmwares_Live.findOne({ "_id": doc.firmwareID });
    var package = {
      'id': doc._id,
      'name': pckg.name
    }
    firmwaresList.push(package);
  });
  Session.set("FirmwaresNotAssignedList", firmwaresList);
}
// get all Assigned Firmwares
function getAssignedPackages(){
  var firmwaresLive = Firmwares_Screens_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "screenID": Session.get("SCREEN_ID") });
  var list = [];
  firmwaresLive.forEach(function(doc){
    var pckg = Firmwares_Live.findOne({ "_id": doc.firmwareID });
    var package = {
      'id': doc._id,
      'name': pckg.name
    }
    list.push(package);
  });
  Session.set("FirmwaresAssignedList", list);
}
// get list of package for selected screen
function getListPackages(){
  var packages = [];
  var pckgs = Firmwares_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  pckgs.forEach(function(doc){
    if(doc.screensID.indexOf(Session.get("SCREEN_ADDRESS")) > -1){
      var package = {
        'id': doc._id,
        'name': doc.name
      }
      packages.push(package);
    }
  });
  Session.set("FirmwaresList", packages);
}
// Verify if the package selected already been assigned
function testExist(id){
  var auth = Firmwares_Screens_Authorization.findOne({ 'firmwareID': id, "screenID": Session.get("SCREEN_ID")});
  var live = Firmwares_Screens_Live.findOne({ 'firmwareID': id, "screenID": Session.get("SCREEN_ID") });
  // undefined = doesn't exist
  if(auth == undefined && live != undefined || live == undefined && auth != undefined){
    return false;
  }
  return true;
}
function sendCapsule(packageName, action){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': Session.get("SCREEN_IDENTITY"),
    'sort': "REPOSITORY_MSG",
    'priority': 1,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  var arrayPayload = {
    "pakage_name": packageName,
    "action": action
  };
  var payload = [];
  payload[0] = arrayPayload;
  capsule.payload = payload;
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      toastrPackageNotAuthorized(pckg.name);
    }else{
      toastrPackageAuthorized(packageName);
    }
  });
}
function verifyDelete(id){
  var association = Firmwares_Screens_Authorization.findOne({ "_id" : id+"#D" });
  return association == undefined;
}
function authorize(association){
  if(association._id.indexOf("#") > 0){
    association._id = association._id.replace("#D", "");
  }
  var associationX = Firmwares_Screens_Live.findOne({ "_id" : association._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(associationX != undefined && association.status == "INAU"){
    association.status = "LIVE";
    association.authorizer = Session.get("UserLogged")._id;
    association.dateTime = getDateNow();
    associationX.status = 'HIS';
    associationX.dateTime = getDateNow();
    associationX.currentNumber = association.currentNumber;
    associationX._id = association._id+"#"+(association.currentNumber-1);
    Firmwares_History.insert(associationX);
    Firmwares_Screens_Live.remove(association._id);
    Firmwares_Screens_Live.insert(association);
    Firmwares_Screens_Authorization.remove(association._id);
  // Authorise deleting association
  }else if(associationX != undefined && association.status == "RNAU"){
    association.authorizer= Session.get("UserLogged")._id;
    association.status = 'DEL';
    association.dateTime = getDateNow();
    Firmwares_History.insert(association);
    Firmwares_Screens_Live.remove(associationX._id);
    Firmwares_Screens_Authorization.remove(association._id);
    Firmwares_Screens_Authorization.remove(association._id+"#D");
    //sendCapsule(association.name, "remove");
  }else{
    association.status = "LIVE";
    association.authorizer = Session.get("UserLogged")._id;
    association.dateTime = getDateNow();
    Firmwares_Screens_Live.insert(association);
    Firmwares_Screens_Authorization.remove(association._id);
  }
}
Template.companyScreens.rendered = function(){
  $('.warningClause').hide();
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
  var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(48.8534100, 2.3488000),
      // Style for Google Maps
      styles: [{
          "featureType": "water",
          "stylers": [{"saturation": 43}, {"lightness": -11}, {"hue": "#0088ff"}]
      }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{"hue": "#ff0000"}, {"saturation": -100}, {"lightness": 99}]
      }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#808080"}, {"lightness": 54}]
      }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#ece2d9"}]
      }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#ccdca1"}]
      }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#808080"}]
      }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#ffffff"}]
      }, {"featureType": "poi", "stylers": [{"visibility": "off"}]}, {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [{"visibility": "on"}, {"color": "#b8cb93"}]
      }, {"featureType": "poi.park", "stylers": [{"visibility": "on"}]}, {
          "featureType": "poi.sports_complex",
          "stylers": [{"visibility": "on"}]
      }, {"featureType": "poi.medical", "stylers": [{"visibility": "on"}]}, {
          "featureType": "poi.business",
          "stylers": [{"visibility": "simplified"}]
      }]
  };
  // Get all html elements for map
  var mapElement = document.getElementById('mapScreen');
  // Create the Google Map using elements
  var mapScreen = new google.maps.Map(mapElement, mapOptions);
  Tracker.autorun(function(c){
   if(handle.ready()){
     var screens = Screens_Live.find();
     //console.log("Rows number :"+ screens.count())
     // set all markers in the Map
     screens.forEach(function(doc){
       // Verify if the COMPANY_CODE exist in the list of companies code
       if( doc.codeCompanies.indexOf(Session.get("COMPANY_CODE")) > -1 ){
           if( doc.screenStatus == 0){
             var marker = new google.maps.Marker({
               position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
               title: "Size : "+doc.screenDimension+"| Address : "+doc.screenAddress,
               address: doc.screenAddress,
               id: doc.screenIdentity,
               idScreen: doc._id,
               icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
             });
            }else{
             var marker = new google.maps.Marker({
               position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
               title: "Size : "+doc.screenDimension+"| Address : "+doc.screenAddress,
               address: doc.screenAddress,
               id: doc.screenIdentity,
               idScreen: doc._id,
               icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
             });
           }
           marker.setMap(mapScreen);
           marker.addListener('click', function() {
                Session.set("SCREEN_ID", marker.idScreen);
                Session.set("SCREEN_ADDRESS", marker.address);
                Session.set("SCREEN_IDENTITY", marker.id);
                $('#listOfConfigurations').modal();
           });
        }
      });
     c.stop();
   }
 });
};
Template.companyScreens.events({
  'click .package'() {
    $('#packages').modal();
    $('.warningClause').hide();
    getNotAssignedPackages();
    getAssignedPackages();
    getListPackages();
  },
  'click .validateAdd'(){
    var IDs = [];
    $('#listCheckBox input:checked').each(function() {
        IDs.push(this.name);
    });
    for(var i=0; i<IDs.length; i++){
      var pckg = Firmwares_Live.findOne({ "_id": IDs[i] });
      if(testExist(IDs[i])){
        var d = new Date().toString();
        var res = d.split(" ");
        var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
        var association =
          {
            'firmwareID' : IDs[i],
            'screenID' : Session.get("SCREEN_ID"),
            'currentNumber': 0,
            'status': 'HLD',
            'inputter': Session.get("UserLogged")._id,
            'authorizer': null,
            'dateTime': getDateNow(),
            'codeCompany': Session.get("COMPANY_CODE")
          };
        Firmwares_Screens_Authorization.insert(association);
        getNotAssignedPackages();
        toastrPackageAssigned(pckg.name);
      }else {
        toastrPackageAlreadyAssigned(pckg.name);
      }
    }
  },
  'click .authorizeAu'() {
    var association = Firmwares_Screens_Authorization.findOne({ "_id": this.id });
    authorize(association);
    getNotAssignedPackages();
    getAssignedPackages();
    sendCapsule(this.name, "install");
  },
  'click .btn-delete'() {
    var association = Firmwares_Screens_Live.findOne({ "_id" : this.id });
    if (verifyDelete(association._id)){
      $('#checkDeleting').modal();
      Session.set("deleteAssociationLive", association);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var association = Session.get("deleteAssociationLive");
    association._id = association._id+"#D"
    association.status = "RNAU";
    association.inputter = Session.get("UserLogged")._id;
    association.dateTime = new Date();
    association.authorizer = null;
    Firmwares_Screens_Authorization.insert(association);
    getNotAssignedPackages();
    getAssignedPackages();
  },
});
Template.companyScreens.helpers({
  packagesNotAssigned (){
    return Session.get("FirmwaresNotAssignedList");
  },
  packagesAssigned (){
    return Session.get("FirmwaresAssignedList");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  company(){
    return Session.get("COMPANY_NAME");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
  },
  screenAdr(){
    return Session.get("SCREEN_ADDRESS");
  },
  firmwares (){
    return Session.get("FirmwaresList");
  },
});

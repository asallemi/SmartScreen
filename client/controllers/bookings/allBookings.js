// Create handlers and subscribers
let handle = Meteor.subscribe('screensLive');
let handleSegmentAuthorization = Meteor.subscribe('segmentsAuthorization');
let handleSegmentLive = Meteor.subscribe('segmentsLive');
let handleBookingAuthorization =  Meteor.subscribe('bookingsAuthorization');
let handleBookingLive =  Meteor.subscribe('bookingsLive');
// A function which return true if slot id exist in LIVE Table
function existLive(id){
  var booking = Bookings_Live.findOne({ "segmentID" : id , "screenID": Session.get("SCREEN_ID")});
  if(booking == undefined){
    return false;
  }
  return true;
}
function existAuthorization(id){
  var booking = Bookings_Authorization.findOne({ "segmentID" : id , "screenID": Session.get("SCREEN_ID")});
  if(booking == undefined){
    return false;
  }
  return true;
}
function initCalender(jsonArr){
    $('#calendar').fullCalendar({
      theme: true,
      lang: Session.get("UserLogged").language,
      header: {
        left: 'prev,next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      droppable: true,
      slotDuration: '00:10:00',
      defaultView: 'agendaDay',
      eventLimit: true,
      editable: false,
      eventOverlap: false,
      events: jsonArr,
      axisFormat: 'H:mm', // uppercase H for 24-hour clock
      timeFormat: 'H:mm',
      eventRender: function (event, element) {
        if (!event.color.localeCompare('#1ab394')){
          var value = event.id+"*"+event.segmentID+"*"+event.segmentDate+"*"+event.segmentStartTime+"*"+event.segmentEndTime+"*"+event.bookedDate+"*"+event.inputter;
          element.html('<input type="checkbox" class="checkbox slots" value="'+value+'" style="align:right; vertical-align:top; padding:0px; margin:0;"/>');
        }
      },
      eventClick: function(event){
        /*if(event.status == 'HLD' && existLive(event.segmentID)){
          $('.new').hide();
        }else {
          $('.new').show();
        }*/
        if(existLive(event.segmentID) && existAuthorization(event.segmentID)){
          $('.editContent').hide();
        }
        if(existLive(event.segmentID) && !existAuthorization(event.segmentID)){
          $('.editContent').show();
        }
        if((event.status == 'HLD' || event.status == 'INAU') && existLive(event.segmentID)){
          $('.cancel').show();
        }else {
          $('.cancel').hide();
        }
         Session.set("ID", event.id);
         Session.set("segmentID", event.segmentID);
         console.log("SEGMENT ID ->", event.segmentID);
         Session.set("segmentDate",event.segmentDate);
         Session.set("segmentStartTime",event.segmentStartTime);
         Session.set("segmentEndTime",event.segmentEndTime);
         Session.set("bookedDate",event.bookedDate.toString().substring(0, 24));
         if(event.inputter.toString().length < 10 ){
           Session.set("inputter","null");
         }else {
           var inputter = Users_Live.findOne({ "_id": event.inputter });
           Session.set("inputter",inputter.fname+" "+inputter.surname);
           Session.set("inputterID",event.inputter);
         }
         if(event.authorizer == null ){
           Session.set("authorizer","null");
         }else {
           var authorizer = Users_Live.findOne({ "_id": event.authorizer });
           Session.set("authorizer",authorizer.fname+" "+authorizer.surname);
         }
         if(event.video.toString().length < 10 ){
           Session.set("video",event.video);
         }else {
           var video = Contents_Live.findOne({ '_id': event.video});
           Session.set("video",video.contentName);
           Session.set("videoID",event.video);
         }
         if(event.image.toString().length < 10 ){
           Session.set("image",event.image);
         }else {
           var image = Contents_Live.findOne({ '_id': event.image});
           Session.set("image",image.contentName);
           Session.set("imageID",event.image);
         }
         if(event.status == "INAU"){
           $('.authorize').show();
           $('.editContent').hide();
           $('.validate').show();
           //$('.editContent').show();
         }else if( event.status == "LIVE" ){
            $('.authorize').hide();
            $('.validate').hide();
         }else {
           $('.authorize').hide();
           $('.editContent').hide();
           $('.validate').show();
         }
     },
    });

}
// A function which return an array to feed Calendar EVENTS
function getAllEvents(screenID){
  //Tracker.autorun(function(x){
  var jsonArr = [];
  // For authorized Bookings
  if(handleBookingLive.ready()){
    var bookingsLive = Bookings_Live.find({ 'screenID' : Session.get("SCREEN_ID"), 'code': Session.get("UserLogged").code });
    bookingsLive.forEach(function(doc){
      // edit strat day
      var result = doc.segmentDate.split("/"); //--> doc.segmentDate return date : MM/DD/YYYY
      var day = result[0];
      var month = result[1];
      var year = result[2];
      var result = doc.segmentStartTime.split(":");
      var hour = result[0];
      var min = result[1];
      var result = doc.segmentEndTime.split(":");
      var h = result[0];
      var m = result[1];
      var title1 ;
      var title2 ;
      if(doc.video.toString().length < 10 ){
        if(Session.get("UserLogged").language == "en"){
          title1 = "No video";
        }else {
          title1 = "Pas de vidèo";
        }

      }else {
        var video = Contents_Live.findOne({ '_id': doc.video});
        title1 = video.contentName;
      }
      if(doc.image.toString().length < 10 ){
        if(Session.get("UserLogged").language == "en"){
          title2 = "No image";
        }else {
          title2 = "Pas d'image";
        }
      }else {
        var image = Contents_Live.findOne({ '_id': doc.image});
        title2 = image.contentName;
      }
      jsonArr.push({
          title: title1+" -- "+title2,
          id: doc._id,
          segmentID: doc.segmentID,
          start: new Date(year, month-1, day, hour, min),
          end: new Date(year, month-1, day, h, m),
          color: '#f23120',//red
          segmentDate: doc.segmentDate,
          segmentStartTime: doc.segmentStartTime,
          segmentEndTime: doc.segmentEndTime,
          inputter: doc.inputter,
          status: doc.status,
          bookedDate: doc.bookedDate,
          authorizer: doc.authorizer,
          video: doc.video,
          image: doc.image,
          allDay: false
      });
    });
  }
  if(handleBookingAuthorization.ready()){
    var bookings = Bookings_Authorization.find({ 'screenID' : Session.get("SCREEN_ID"), 'code': Session.get("UserLogged").code });
    bookings.forEach(function(doc){
      // edit strat day
      var result = doc.segmentDate.split("/");
      var day = result[0];
      var month = result[1];
      var year = result[2];
      var result = doc.segmentStartTime.split(":");
      var hour = result[0];
      var min = result[1];
      var result = doc.segmentEndTime.split(":");
      var h = result[0];
      var m = result[1];
      var title1 ;
      var title2 ;
      if(doc.video.toString().length < 10 ){
        if(Session.get("UserLogged").language == "en"){
          title1 = "No video";
        }else {
          title1 = "Pas de vidèo";
        }

      }else {
        var video = Contents_Live.findOne({ '_id': doc.video});
        title1 = video.contentName;
      }
      if(doc.image.toString().length < 10 ){
        if(Session.get("UserLogged").language == "en"){
          title2 = "No image";
        }else {
          title2 = "Pas d'image";
        }
      }else {
        var image = Contents_Live.findOne({ '_id': doc.image});
        title2 = image.contentName;
      }
      if (doc.status == 'HLD'){
        jsonArr.push({
            id: doc._id,
            segmentID: doc.segmentID,// Segment ID
            start: new Date(year, month-1, day, hour, min),
            end: new Date(year, month-1, day, h, m), //We supposed the max slot is 10 minutes
            color: '#1ab394',//green
            segmentDate: doc.segmentDate,
            segmentStartTime: doc.segmentStartTime,
            segmentEndTime: doc.segmentEndTime,
            inputter: doc.inputter,
            status: doc.status,
            bookedDate: doc.bookedDate,
            authorizer: doc.authorizer,
            video: doc.video,
            image: doc.image,
            allDay: false
        });
      }
      if (doc.status == 'INAU'){
        jsonArr.push({
            title: title1+" -- "+title2,
            id: doc._id,
            segmentID: doc.segmentID,// Segment ID
            start: new Date(year, month-1, day, hour, min),
            end: new Date(year, month-1, day, h, m), //We supposed the max slot is 10 minutes
            color: '#FF8C00',//orange
            segmentDate: doc.segmentDate,
            segmentStartTime: doc.segmentStartTime,
            segmentEndTime: doc.segmentEndTime,
            inputter: doc.inputter,
            status: doc.status,
            bookedDate: doc.bookedDate,
            authorizer: doc.authorizer,
            video: doc.video,
            image: doc.image,
            allDay: false
        });
      }

    });
  }
  return jsonArr;
   //x.stop();
 //});
}
//    function returns a list of videos
function getAllVideos(){
  var contents = Contents_Live.find({ "code": Session.get("UserLogged").code });
  var videosArray = [];
  contents.forEach(function(doc){
    var res = doc.contentType.split("/");
    if(res[0] == "video"){
      var obj = {
        '_id': doc._id,
        'videoName': doc.contentName
      };
      videosArray.push(obj);
    }
  });
  if(videosArray.length > 0){
    return videosArray;
  }else{
    return null;
  }
}
//    function returns a list of images
function getAllImages(){
  var contents = Contents_Live.find({ "code": Session.get("UserLogged").code });
  var imagesArray = [];
  contents.forEach(function(doc){
    var res = doc.contentType.split("/");
    if(res[0] == "image"){
      var obj = {
        '_id': doc._id,
        'imageName': doc.contentName
      };
      imagesArray.push(obj);
    }
  });
  if(imagesArray.length > 0){
    return imagesArray;
  }else{
    return null;
  }
}
function sendCapsule(screenIdentity, code, segmentDate, segmentStartTime, video, photo){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': screenIdentity,
    'sort': null,
    'priority': 1,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  var result = segmentDate.split("/");
  var year = result[2];
  if(parseInt(result[0]) < 10){
    var day = "0"+result[0];
  }else {
    var day = result[0];
  }
  if(parseInt(result[1]) < 10){
    var month = "0"+result[1];
  }else {
    var month = result[1];
  }
  var result = segmentStartTime.split(":");
  var hour = result[0];
  var min = result[1];

  var segment = year+"-"+month+"-"+day+"-"+hour+"-"+min;

  var arrayPayload = {
    "segment_id": segment,
    "holder": code,
    "video": video,
    "photo": photo
  };
  var payload = [];
  payload[0] = arrayPayload;
  capsule.sort = "RESERVATION_MESSAGE";
  capsule.payload = payload;
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      console.log("There is a problem in capsule sending !");
    }else{
      console.log("OK");
    }
  });
}
Template.allBookings.onCreated(function(){

});
Template.allBookings.rendered = function(){
  settingLanguage();
  $('.new').hide();
  $('.cancel').hide();
  $('.authorize').hide();
  $('.editContent').hide();
  $('#agendaPopUp').on('shown.bs.modal', function () {
    $("#calendar").fullCalendar('render');
  });
  console.log("USER -> ",Session.get("UserLogged"));
  var mapOptions = {
      zoom: 9,
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
          "stylers": [{"color": "#767676"}]
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
  var mapElement = document.getElementById('map');
  // Create the Google Map using elements
  var map = new google.maps.Map(mapElement, mapOptions);
  Tracker.autorun(function(c){
   if(handle.ready()){
     var screens = Screens_Live.find();
     // set all markers in the Map
     screens.forEach(function(doc){
       //console.log("RES -> ",doc.clientsIDs.indexOf(Session.get("UserLogged").code));
       if( doc.clientsIDs.indexOf(Session.get("UserLogged").code) > -1 ){
       //if( doc.clientsIDs == Session.get("UserLogged").code ){
         var screen = new google.maps.Marker({
           position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
           title: "Size : "+doc.screenDimension+"| Address : "+doc.screenAddress,
           idScreen: doc._id,
           id: doc.screenIdentity,
           icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|04B486'
         });
        }
       screen.setMap(map);
       screen.addListener('click', function() {
         console.log("SCREEN_ID -> ", screen.idScreen);
         Session.set("SCREEN_ID", screen.idScreen);
         Session.set("SCREEN_IDENTITY", screen.id);
         Session.set("ScreenINFO",doc);
         // Initialize the calendar
         $('#agendaPopUp').modal();

         initCalender(getAllEvents(screen.idScreen));
         $('#calendar').fullCalendar( 'removeEvents');
         $('#calendar').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
         $('#calendar').fullCalendar('render');
         $('#calendar').fullCalendar( 'refetchEvents' );
         Session.set("ALL_VIDEOS", getAllVideos());
         Session.set("ALL_IMAGES", getAllImages());
         Session.set("segmentStartTime","-");
         Session.set("segmentEndTime","-");
         Session.set("segmentDate","-");
         Session.set("bookedDate","-");
         Session.set("inputter","-");
         Session.set("authorizer","-");
         Session.set("video","-");
         Session.set("image","-");
       });

     });
     c.stop()
   }
  });
  // Initialize fooTable
  $('.footable').footable();
  $('.footable2').footable();
};
Template.allBookings.events({
  'click .validate'() {
    var video = $('input[name="video"]:checked').val();
    var image = $('input[name="image"]:checked').val();
    var checkboxes = document.getElementsByClassName('slots');
    if(checkboxes.length == 0){
      $('#warningSelection').modal();
    }else {
      if( video != "null" && image != "null"){
        for(var i=0; i<checkboxes.length; i++){
          if(checkboxes[i].checked){
            var res = checkboxes[i].value.split("*");
            Bookings_Authorization.update({ '_id' : res[0] }, {'$set':{ 'status': "INAU", 'inputter' : Session.get("UserLogged")._id, 'video': video, 'image': image, 'dateTime': new Date()}});
          }
        }
        if(Session.get("UserLogged").language == "en"){
          toastr.success('With success','Content assigned !');
        }else {
          toastr.success('Avec succès','Affectation de contenu fait !');
        }

        $('#calendar').fullCalendar( 'removeEvents');
        $('#calendar').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
        $('#calendar').fullCalendar('render');
        $('#calendar').fullCalendar( 'refetchEvents' );
      }else {
        $('#warning').modal();
      }
    }

    $('#NoVideo').prop('checked',true);
    $('#NoImage').prop('checked',true);
  },
  'click .authorize'() {
    Bookings_Authorization.remove(Session.get("ID"));
    //var b = Bookings_Authorization.findOne({ "segmentID" : Session.get("ID") });
    var booking = {
        'segmentID': Session.get("segmentID"),
        'segmentDate': Session.get("segmentDate"),
        'segmentStartTime': Session.get("segmentStartTime"),
        'segmentEndTime': Session.get("segmentEndTime"),
        'video': Session.get("videoID"),
        'image': Session.get("imageID"),
        'screenID': Session.get("SCREEN_ID"),
        'bookedDate': Session.get("bookedDate"),
        'currentNumber': 1,
        'status': 'LIVE',
        'inputter': Session.get("inputterID"),
        'authorizer': Session.get("UserLogged")._id,
        'dateTime': new Date(),
        'code': Session.get("UserLogged").code
    };
    /*if(existLive(Session.get("segmentID"))){
      Bookings_Live.remove(Session.get("ID"));
    }*/
    Bookings_Live.insert(booking);
    console.log("ID ---->   ", booking.segmentID);
    Segments_Authorization.update({ '_id' : booking.segmentID }, {'$set':{ 'segmentAvailability' : 0 }});
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Reservation authorized !');
    }else {
      toastr.success('Avec succès','Réservation est autorisée !');
    }

    var video = Contents_Live.findOne({ '_id': booking.video});
    var image = Contents_Live.findOne({ '_id': booking.image});
    sendCapsule(parseInt(Session.get("SCREEN_IDENTITY")), booking.code, booking.segmentDate, booking.segmentStartTime, video.contentName, image.contentName);
    $('#calendar').fullCalendar( 'removeEvents');
    $('#calendar').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
    $('#calendar').fullCalendar('render');
    $('#calendar').fullCalendar( 'refetchEvents' );
    $('#NoVideo').prop('checked',true);
    $('#NoImage').prop('checked',true);
  },
  'click .cancel'() {
    Bookings_Authorization.remove(Session.get("ID"));
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Slot edict cancled !');
    }else {
      toastr.success('Avec succès','Modification de créneau annulée !');
    }

    $('#calendar').fullCalendar( 'removeEvents');
    $('#calendar').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
    $('#calendar').fullCalendar('render');
    $('#calendar').fullCalendar( 'refetchEvents' );
    $('#NoVideo').prop('checked',true);
    $('#NoImage').prop('checked',true);
  },
  'click .editContent'() {
    var video = $('input[name="video"]:checked').val();
    var image = $('input[name="image"]:checked').val();
    if( video != "null" && image != "null"){
      var booking = {
          '_id': Session.get("ID"),
          'segmentID': Session.get("segmentID"),
          'segmentDate': Session.get("segmentDate"),
          'segmentStartTime': Session.get("segmentStartTime"),
          'segmentEndTime': Session.get("segmentEndTime"),
          'video': "No video",
          'image': "No image",
          'screenID': Session.get("SCREEN_ID"),
          'bookedDate': Session.get("bookedDate"),
          'currentNumber': 1,
          'status': 'INAU',
          'inputter': Session.get("inputterID"),
          'authorizer': null,
          'dateTime': new Date(),
          'code': Session.get("UserLogged").code
      };
      Bookings_Authorization.insert(booking);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Edict done !');
      }else {
        toastr.success('Avec succès','Modification fait !');
      }

      $('#calendar').fullCalendar( 'removeEvents');
      $('#calendar').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
      $('#calendar').fullCalendar('render');
      $('#calendar').fullCalendar( 'refetchEvents' );
    }else {
      $('#warning').modal();
    }
    $('#NoVideo').prop('checked',true);
    $('#NoImage').prop('checked',true);
  },
  'click .cancelWarning'() {
    $('#agendaPopUp').modal('hide');
    $('#warning').modal('hide');
  },
});
Template.allBookings.helpers({
  // A helper for the specific assigning
  bookingCount() {
    var s1 = Bookings_Live.find({ 'screenID': Session.get("SCREEN_ID"), 'code': Session.get("UserLogged").code }).count();
    var s2 = Bookings_Authorization.find({ 'screenID': Session.get("SCREEN_ID"), 'code': Session.get("UserLogged").code }).count();
    return s1 + s2;
  },
  videos() {
    return getAllVideos();
  },
  images() {
    return Session.get("ALL_IMAGES");
  },
  Screen() {
    return Session.get("ScreenINFO");
  },
  segmentStartTime(){
    return Session.get("segmentStartTime");
  },
  segmentEndTime(){
    return Session.get("segmentEndTime");
  },
  segmentDate(){
    return Session.get("segmentDate");
  },
  bookedDate(){
    return Session.get("bookedDate");
  },
  inputter(){
    return Session.get("inputter");
  },
  authorizer(){
    return Session.get("authorizer");
  },
  video(){
    return Session.get("video");
  },
  image(){
    return Session.get("image");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
});

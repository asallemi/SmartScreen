// Create handlers and subscribers
let handle = Meteor.subscribe('screensLive');
let handleSegment = Meteor.subscribe('segmentsAuthorization');
let handleBooking =  Meteor.subscribe('bookingsAuthorization');
// This function return true if the slot date is lower than the day date (now)
function isValidatedDate(segmentDate){
  var dateOfNow = getDateNow(); // return is : 2017-07-20 14:43:00
  var array = dateOfNow.split(" ");
  //Format the date (exp : segmentDate == 20/7/2017 )
  var x = segmentDate.split("/");
  var date = x[2]+"-"+x[1]+"-"+x[0];
  var date1 = new Date(date);
  var date2 = new Date(array[0]);
  console.log("Date 1 (segmentDate) -> ", date);
  console.log("Date 2 -> ", array[0]);
  if(date1 <= date2){
    return false;
  }else {
    return true;
  }
}
// A function which returns a jsonarray, it's the input of the calendar to display segments corresponds
function getAllEvents(screenID){
  Tracker.autorun(function(c){
    if(handleSegment.ready()){
      //console.log("Code Company > ", Session.get("UserLogged").codeCompany);
      //var segments = Segments_Authorization.find({ "codeCompany": Session.get("UserLogged").codeCompany , "segmentScreenID" : screenID });
      var segments = Segments_Authorization.find({ "segmentScreenID" : screenID });
      console.log("Segments count -> ", segments.count());
      var jsonArr = [];
      segments.forEach(function(doc){
        // test if segmentDate is lower than date now
        console.log("testDate ->>>> ", isValidatedDate(doc.segmentDate));
        //if (isValidatedDate(doc.segmentDate)) {
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
          var seg1 = Bookings_Authorization.findOne({ "segmentID" : doc._id });
          var seg2 = Bookings_Live.findOne({ "segmentID" : doc._id });
          if(seg1 != undefined){
            var client = Clients_Live.findOne({ "code": seg1.code});
          }
          if(seg2 !=undefined){
            var client = Clients_Live.findOne({ "code": seg2.code});
          }
          //Test if the segment is available
          if (doc.segmentAvailability == 1){
            if(client != undefined){
              jsonArr.push({
                  title: client.name,
                  id: doc._id,// Segment ID
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m), //We supposed the max slot is 10 minutes
                  color: '#1ab394',//green -> slot not booked
                  segmentDate: doc.segmentDate,
                  segmentStartTime: doc.segmentStartTime,
                  segmentEndTime: doc.segmentEndTime,
                  allDay: false
              });
            }else {
              jsonArr.push({
                  id: doc._id,// Segment ID
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m), //We supposed the max slot is 10 minutes
                  color: '#1ab394',//green -> slot not booked
                  segmentDate: doc.segmentDate,
                  segmentStartTime: doc.segmentStartTime,
                  segmentEndTime: doc.segmentEndTime,
                  allDay: false
              });
            }
          }else if(doc.segmentAvailability == 0) {
            if(client != undefined){
              jsonArr.push({
                  title: client.name,
                  id: doc._id,
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m),
                  color: '#f23120',//red -> slot booked
                  allDay: false
              });
            }else {
              jsonArr.push({
                  id: doc._id,
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m),
                  color: '#f23120',//red -> slot booked
                  allDay: false
              });
            }
          }else{
            if(client != undefined){
              jsonArr.push({
                  title: client.name,
                  id: doc._id,
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m),
                  color: '#FF8C00',//orange -> slot booked but still not authorized
                  allDay: false
              });
            }else {
              jsonArr.push({
                  id: doc._id,
                  start: new Date(year, month-1, day, hour, min),
                  end: new Date(year, month-1, day, h, m),
                  color: '#FF8C00',//orange -> slot booked but still not authorized
                  allDay: false
              });
            }
          }
        //}

      });
      c.stop();
      Session.set("EVENTS_ARRAY", jsonArr);
    }
  });// End Tracker.autorun
}
/*function displayMapByDate(){
      var mapOptions1 = {
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
      var mapElement1 = document.getElementById('map1');
      // Create the Google Map using elements
      var map1 = new google.maps.Map(mapElement1, mapOptions1);
      Tracker.autorun(function(c){
       if(handleSegment.ready()){
         console.log("Date  ->", Session.get("SEARCH_DATE"));
         var date = Session.get("SEARCH_DATE");
         var res = date.split("/");
         var day = res[0];
         var month = res[1];
         if(parseInt(day) < 10){
           day = parseInt(day);
         }
         if(parseInt(month) < 10){
           month = parseInt(month);
         }
         date = day+"/"+month+"/"+res[2];
         console.log("New date ->", date);
         var segments = Segments_Authorization.find({ "segmentDate": date, "segmentAvailability": 1 }).fetch();
         console.log("ALL slots :", segments);
         c.stop();
      }
      });

}*/
function displayMap(){
  // Options for Google map
  var mapOptions1 = {
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
  var mapElement1 = document.getElementById('map1');
  // Create the Google Map using elements
  var map1 = new google.maps.Map(mapElement1, mapOptions1);

  Tracker.autorun(function(c){
   if(handle.ready()){
     var screens = Screens_Live.find();
     // set all markers in the Map
     screens.forEach(function(doc){
       var array = doc.codeCompanies.split("#");
       // Verify if the COMPANY_CODE exist in the list of companies code
       if( array.indexOf(Session.get("UserLogged").codeCompany) > -1 ){
           if( doc.screenStatus == 0){
             var marker = new google.maps.Marker({
               position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
               title: "Size : "+doc.screenDimension+" | Address : "+doc.screenAddress,
               idScreen: doc._id,
               icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
             });
            }else{
             var marker = new google.maps.Marker({
               position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
               title: "Size : "+doc.screenDimension+" | Address : "+doc.screenAddress,
               idScreen: doc._id,
               icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
             });
           }
           marker.setMap(map1);
           marker.addListener('click', function() {
             console.log("SCREEN_ID -> ", marker.idScreen);
             Session.set("SCREEN_ID", marker.idScreen);
             Session.set("ScreenINFO",doc);
             // Initialize the calendar
             $('#screenDetailsPopup').modal();
           });
        }
      });
     c.stop();
   }
  });
  //return jsonArr;
}
// a function return null if client code doesn't exist in Screens_Live.clientsIDs (list of clients code)
function codeCltExistScreen(code){
  if(handle.ready()){
    var screen = Screens_Live.findOne({ '_id': Session.get("SCREEN_ID") });
    var res = screen.clientsIDs.split(" ");
    console.log("length -> ", res.length);
    if(res.indexOf(code) > -1){
      return null;
    }
  }
  return screen.clientsIDs;
}
// Function returns false if the user didn't select a slot to book
function testSelection(checkboxes){
  for(var i=0; i<checkboxes.length; i++){
    if(checkboxes[i].checked){
      return true;
    }
  }
  return false;
}
Template.home.rendered = function () {
    checkSession();
    welcomeUser();
    settingLanguage();
    $('#calendar2').fullCalendar({
      theme: true,
      lang: Session.get("UserLogged").language,
      header: {
        left: 'prev,next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      slotDuration: '00:10:00',
      defaultView: 'agendaDay',
      eventLimit: true,
      editable: false,
      eventOverlap: false,
      //events: jsonArr,
      axisFormat: 'H:mm', // uppercase H for 24-hour clock
      timeFormat: 'H:mm',
      eventRender: function (event, element) {
        if (!event.color.localeCompare('#1ab394')){
          var value = event.id+"*"+event.segmentDate+"*"+event.segmentStartTime+"*"+event.segmentEndTime;
          element.html('<input type="checkbox" class="checkbox slots" name="segemntSelected" value="'+value+'" style="align:right; vertical-align:top; padding:0px; margin:0;"/>');
        }
      },
    });
    displayMap();
    $('#agendaPopUp').on('shown.bs.modal', function () {
      $("#calendar2").fullCalendar('render');
      $("#calendar2").fullCalendar( 'next' );
      $("#calendar2").fullCalendar( 'prev' );
    });
   $('#data_1 .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      todayBtn: "linked"
   });
};// end Template.home.rendered = function ()
Template.home.events({
    'click .btn-bookingAgenda'() {
      $('#agendaPopUp').modal();
      // Call the function to set in the session "EVENTS_ARRAY" events
      getAllEvents(Session.get("SCREEN_ID"));
      $('#calendar2').fullCalendar( 'removeEvents');
      $('#calendar2').fullCalendar( 'addEventSource', Session.get("EVENTS_ARRAY"));
      $('#calendar2').fullCalendar('render');
      $('#calendar2').fullCalendar( 'refetchEvents' );
    },
    'click .closeDiv'() {
      // when user close the "dispalyDate" DIV, return to initial google maps
      $("#dispalyDate").css("display","none")
      displayMap();
    },
    'click .searchByDate'() {
      if ( $('#searchByDateInput').val().length > 0 ) {
        var searchByDate = document.getElementById("searchByDateInput").value;
        $('#dispalyDate').show();
        Session.set("SEARCH_DATE", searchByDate);
        displayMapByDate();
      }else {
        $('#chooseDate').modal();
      }
      $('#searchByDateInput').val('');
    },
    'click .validateBooking'() {
      var checkboxes = document.getElementsByClassName('slots');
      if(testSelection(checkboxes)){
        $('#loadingBooking').modal();
        //var checkedValues = [];
        for(var i=0; i<checkboxes.length; i++){
          if(checkboxes[i].checked){
            //checkedValues.push(checkboxes[i].value); // inputElements[i].value === segment ID === event (fullcalendar)
            var res = checkboxes[i].value.split("*")
            var booking =
              {
                'segmentID': res[0],
                'segmentDate': res[1],
                'segmentStartTime': res[2],
                'segmentEndTime': res[3],
                'video': "No video",
                'image': "No image",
                'screenID': Session.get("SCREEN_ID"),
                'bookedDate': getDateNow(),
                'currentNumber': 1,
                'status': 'HLD',
                'inputter': Session.get("UserLogged")._id,
                'authorizer': null,
                'dateTime': getDateNow(),
                'code': Session.get("UserLogged").code,
                'codeCompany': Session.get("UserLogged").codeCompany
              };
            if (handleBooking.ready()){
              var cursor = Bookings_Authorization.findOne({ 'segmentID': booking.segmentID });
              if( cursor == undefined){
                Bookings_Authorization.insert(booking);
                if(handleSegment.ready()){
                   Segments_Authorization.update({ '_id' : res[0] }, {'$set':{ 'segmentAvailability' : -1 }});
                }
                // Test if client code not exist in clientId of the screen -> if exist don't add it
                if(codeCltExistScreen(Session.get("UserLogged").code) != null){
                  console.log("OK1");
                  var result = codeCltExistScreen(Session.get("UserLogged").code);
                  var newClientsIDs = result+"#"+Session.get("UserLogged").code;
                  Screens_Live.update({ '_id' : Session.get("SCREEN_ID") }, {'$set':{ 'clientsIDs' : newClientsIDs }});
                }
              }else{
                $('#agendaPopUp').modal('hide');
                $('#slotHasBeenBooked').modal();
                //swal({ title: "Alert !",text: "This slot has been booked few seconds ago !",type: "warning",closeOnConfirm: true });
              }
            }
          }
        }
        //$('#calendar2').fullCalendar( 'rerenderEvents' );
        //$('#calendar2').fullCalendar( 'removeEventSource', getAllEvents(Session.get("OLD_EVENTS")));
        $('#calendar2').fullCalendar( 'removeEvents');
        $('#calendar2').fullCalendar( 'addEventSource', getAllEvents(Session.get("SCREEN_ID")));
        $('#calendar2').fullCalendar('render');
        $('#calendar2').fullCalendar( 'refetchEvents' );
        setTimeout(function () {
          $('#loadingBooking').modal('hide');
          toastrSlotBooked();
        }, 3000);
        $('#agendaPopUp').modal('hide');
      }else{
        toastrNoSlotSelected();
      }
    },
});
Template.home.helpers({
  Screen() {
    return Session.get("ScreenINFO");
  },
  date(){
    return Session.get("SEARCH_DATE");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  /*segments() {
    return Segments.find({ segmentDate : '07/30/2016' });
  },
  segmentCountByDate(){
    return Segments.find({ segmentDate : '07/30/2016' }).count();
  },*/

});

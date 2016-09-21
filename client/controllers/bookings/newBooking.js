// Connection to collections
Screens = new Mongo.Collection('screens');
Segments = new Mongo.Collection('segments');
Bookings = new Mongo.Collection('bookings');

// Create handlers and subscribers
let handle = Meteor.subscribe('screens');
let handleSegment = Meteor.subscribe('segments');
let handleBooking =  Meteor.subscribe('bookings');

Template.newBooking.rendered = function () {
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
         var screens = Screens.find();
         //console.log("Rows number :"+ screens.count())
         // set all markers in the Map
         screens.forEach(function(doc){
           //console.log("Doc id"+doc._id);
               if( doc.screenStatus===0){
                 var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
                   title: "Size : "+doc.screenDimension+"| Address : "+doc.screenAddress,
                   idScreen: doc._id,
                   icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
                 });
                }else{
                 var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(doc.screenLatitude, doc.screenLongitude),
                   title: doc.screenDimension+" "+doc.screenAddress,
                   idScreen: doc._id,
                   icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                 });
               }
               marker.setMap(map1);
               marker.addListener('click', function() {
                   // Display a popup for more details
                    swal({
                        title: "About this screen",
                        text: marker.title ,
                        html: true
                    });
                    Session.set({"screenID": marker.idScreen});
                    if(handleSegment.ready()){
                      var segments = Segments.find({ segmentScreenID : marker.idScreen });
                      var jsonArr = [];
                      segments.forEach(function(doc){
                        // edit strat day
                        var result = doc.segmentDate.split("/"); //--> doc.segmentDate return date : MM/DD/YYYY
                        var day = result[1];
                        var month = result[0];
                        var year = result[2];
                        var result = doc.segmentStartTime.split(":");
                        var hour = result[0];
                        var min = result[1];
                        var result = doc.segmentEndTime.split(":");
                        var h = result[0];
                        var m = result[1];
                        if (doc.segmentAvailability === 1){
                          jsonArr.push({
                              id: doc._id,// Segment ID
                              start: new Date(year, month-1, day, hour, min),
                              end: new Date(year, month-1, day, h, m), //We supposed the max slot is 10 minutes
                              color: '#1ab394',
                              allDay: false
                          });
                        }else {
                          jsonArr.push({
                              id: doc._id,
                              start: new Date(year, month-1, day, hour, min),
                              end: new Date(year, month-1, day, h, m),
                              color: '#ffa696',
                              allDay: false
                          });
                        }
                      });
                    }
                    // Initialize the calendar
                    initCalender(jsonArr);
               });
          });
         c.stop()
       }
     });
//********************* Calendar ***************************
     function initCalender(jsonArr){
       $('#calendar').fullCalendar({
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
           events: jsonArr,
           axisFormat: 'H:mm', // uppercase H for 24-hour clock
	         timeFormat: 'H:mm',
           // add checkbox in every available slot
           eventRender: function (event, element) {
             if (!event.color.localeCompare('#1ab394')){
               element.html('<input type="checkbox" class="eventxxx" name="segemntSelected" value="'+event.id+'" style="align:right; vertical-align:top; padding:0px; margin:0;"/>');
               }
           },
           // DAY click --> show a POPUP
           dayClick: function(date, jsEvent, view) {
             $('#calendarModal').modal();
          }
       });
     }
     // Validate booking by click button
     $(validateBooking).click(function(){
       //Meteor.call('createPlayer');
       var checkedValues = [];
       var checkboxes = document.getElementsByClassName('eventxxx');
       for(var i=0; i<checkboxes.length; i++){
         if(checkboxes[i].checked){
           checkedValues.push(checkboxes[i].value); // inputElements[i].value === segment ID === event (fullcalendar)
           var booking =
             {
               'segmentID': checkboxes[i].value,
               'screenID': Session.get("screenID"),
               'bookedDate': new Date(),
             };
           if (handleBooking.ready()){
             var cursor = Bookings.find({ "segmentID": booking.segmentID });
             if( cursor.count() === 0){
               swal("Done!", "Your slots are booked now!", "success");
               Bookings.insert(booking);
               $('#calendar').fullCalendar('refetchEvents');
             }else{
               swal("Sorry", "This slot has been booked few seconds ago", "success");
             }
           }
           if(handleSegment.ready()){
             Segments.update({'_id' : checkboxes[i].value }, {'$set':{ 'segmentAvailability' : 0}});
           }
         }
       }
     });
     $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
     });
  };// end Template.home.rendered = function ()

Template.newBooking.events({
    'submit .searchByDate'(event) {
      event.preventDefault();
      const target = event.target;
      const date = target.search.value;
      console.log("the date :"+ date);
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
              var segments = Segments.find({ segmentDate: date});
              //alert("Segments screen ID ="+ segments.count());
              segments.forEach(function(doc){
                //console.log("Segments screen ID ="+ doc.segmentScreenID);
                var screen = Screens.findOne({ _id: doc.segmentScreenID});
                //console.log("Rows number :"+ screens.count())
                // set a marker in the Map
                if( screen.screenStatus===0){
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(screen.screenLatitude, screen.screenLongitude),
                    title: "Size : "+screen.screenDimension+"| Address : "+screen.screenAddress,
                    icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
                  });
                }else{
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(screen.screenLatitude, screen.screenLongitude),
                    title: screen.screenDimension+" "+screen.screenAddress,
                    icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  });
                }
                marker.setMap(map1);
                marker.addListener('click', function() {
                    // Display a popup within more details
                     swal({
                         title: "About this screen",
                         text: marker.title ,
                         html: true
                     });
                });
              });
              c.stop();
        }//end if handleSegment
      });//end Tracker
      target.search.value = '';
    }//end submit event
});

Template.newBooking.helpers({
  segments() {
    return Segments.find({ segmentDate : '07/30/2016' });
  },
  segmentCountByDate(){
    return Segments.find({ segmentDate : '07/30/2016' }).count();
  },

});

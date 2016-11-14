// Create handlers and subscribers
let handle = Meteor.subscribe('screens');
let handleSegment = Meteor.subscribe('segments');

Template.segment.rendered = function(){
  // Options for Google map
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
           marker.setMap(map);
           marker.addListener('click', function() {
                Session.set({"screenID": marker.idScreen});
                $('#addSegmentPopUp').modal();
           });
      });
     c.stop()
   }
 });

};
Template.segment.events({
    'submit .addSegment'(event) {
      event.preventDefault();
      const target = event.target;
      const date = target.date.value;
      console.log("the date : "+ date);
      const from = target.from.value;
      console.log("the date from : "+ from);
      var hour1 = from.split(":");
      const to = target.to.value;
      console.log("To :"+ to);
      var hour2 = to.split(":");
      const description = target.description.value;
      console.log("the description : "+ description);
      var result = date.split("/");
      /*for (var i=parseInt(hour1[0]); i< parseInt(hour2[0]); i++){
        if( i <10 ){
          var hour = "0"+i;
        }
        var compteur = 0;
        var h = hour+":"+"0"+compteur;
        for(var j=0; j< 6; i++){
          var segment =
            {
              'segmentDate': date,
              'segmentMonth': parseInt(result[0]),
              'segmentWeek': 0,
              'segmentStartTime': ,
              'segmentEndTime': ,
              'segmentDescription': ,
              'segmentAvailability': 1,
              'segmentScreenID': ,
            };
           compteur = compteur + 10;
           h =
        }
      }*/
    },
});
// Create handlers and subscribers
let handle = Meteor.subscribe('screensLive');
let handleSegment = Meteor.subscribe('segments');

function getValuesFromForm (){
  if (document.getElementById('startDate') != null) {
    var x = document.getElementById("startDate").value;
    var array_X = x.split("/");
    var startDate = array_X[2]+"-"+array_X[1]+"-"+array_X[0];
  }else {
    var startDate = null;
  }
  if (document.getElementById('endDate') != null) {
    var y = document.getElementById("endDate").value;
    var array_Y = y.split("/");
    var endDate = array_Y[2]+"-"+array_Y[1]+"-"+array_Y[0];
  }else {
    var endDate = null;
  }
  if (document.getElementById('slot') != null) {
    var slot = document.getElementById("slot").value;
  }else {
    var slot = null;
  }
  var plan = {
    'screensID': Session.get("SCREEN_ID"),
    'startDate': startDate,
    'endDate': endDate,
    'slot': slot,
    'currentNumber': 1,
    'status': 'HLD',
    'inputter': Session.get("UserLogged")._id,
    'authorizer': null,
    'dateTime': getDateNow(),
    'codeCompany': Session.get("UserLogged").codeCompany
  }
  return plan;
}
function getListOfDates( from, to){
    var day = 1000*60*60*24;
    date1 = new Date(from);
    date2 = new Date(to);
    var array = [];
    var diff = (date2.getTime()- date1.getTime())/day;
    for(var i=0;i<=diff; i++)
    {
       var xx = date1.getTime()+day*i;
       var yy = new Date(xx);
       var item = yy.getDate()+"/"+(yy.getMonth()+1)+"/"+yy.getFullYear();
       array.push(item);
    }
    return array;
}
function getDaysNotAvailable(){
  var plans = Plans_Live.find({ 'screensID': Session.get("SCREEN_ID") });
  var array = [];
  var c = 0;
  plans.forEach(function(doc){
    //console.log("iteration :",c++," startDate :",doc.startDate, " endDate :",doc.endDate);
    var dateFrom = doc.startDate;
    var dateTo = doc.endDate;
    array = array.concat(getListOfDates(dateFrom, dateTo));
  });
  /*console.log("Array length :", array.length);
  for(var i=0; i < array.length; i++){
    console.log("Array[",i,"]:", array[i]);
  }*/
  return array;
}
// A function return if a date exist in start date and end date of LIVE plan
function validateDate(date){
  var plans = Plans_Live.find({ 'screensID': Session.get("SCREEN_ID") });
  var array = [];
  var result = false;
  plans.forEach(function(doc){
    var dateFrom = doc.startDate;
    var dateTo = doc.endDate;
    var dateCheck = date;
    var d1 = dateFrom.split("-");
    var d2 = dateTo.split("-");
    var c = dateCheck.split("-");
    var from = new Date(d1[0], parseInt(d1[1])-1, d1[2]);
    var to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
    var check = new Date(c[0], parseInt(c[1])-1, c[2]);
    if(check > from && check < to){
      array.push(true);
    }else {
      array.push(false);
    }
  });
  for(var i=0; i< array.length; i++){
    if(array[i] == true){
      return false;
    }
  }
  return true;
}
function createListOfMinutes(slot){
  var array = [];
  if(60 % slot == 0){
    var nbrSlot = 60 / slot;
    var compteur = 0;
    for(var i=0; i < nbrSlot; i++){
      array.push(compteur);
      compteur = compteur + slot;
    }
  }
  for(var i=0; i < nbrSlot; i++){
    if(array[i] <10){
      array[i] = "0"+array[i].toString();
    }else {
      array[i]= array[i].toString();
    }
  }
  /*for(var i=0; i<array.length; i++){
    console.log("Array[",i,"]",array[i]);
  }*/
  return array;
}
function createSegments(from, to, slot){
  var segment = {
    '_id': null,
    'segmentDate': null,
    'segmentStartTime': null,
    'segmentEndTime': null,
    'segmentTariff': null,
    'segmentDescription': null,
    'segmentAvailability': null,
    'segmentScreenID': null
  };
  var array = getListOfDates(from, to);
  var min = createListOfMinutes(parseInt(slot));
  //var min = ["00","10","20","30","40","50"];

  var hour = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","00"];
  for(var i=0; i < array.length; i++){
    //console.log("Array[",i,"]:",array[i]);
    var x = array[i].split("/");
    var date = x[2]+x[1]+x[0];
    for(var j=0; j< hour.length-1; j++){
      for(var c=0; c < (min.length - 1); c++){
        //console.log("Minutes :",min[c+1]);
        var segment = {
          '_id': Session.get("SCREEN_ID")+date+hour[j]+min[c],
          'segmentDate': array[i],
          'segmentStartTime': hour[j]+":"+min[c],
          'segmentEndTime': hour[j]+":"+min[c+1],
          'segmentTariff': 0,
          'segmentDuration': slot,
          'segmentDescription': "Nothing!",
          'segmentAvailability': 1,
          'segmentScreenID': Session.get("SCREEN_ID"),
          'currentNumber': 0,
          'status': 'HLD',
          'inputter': 'Vvv',
          'authorizer': null,
          'dateTime': date
        };
        //console.log("Segment :", segment);
        Segments_Authorization.insert(segment);
      }
      var segment = {
        '_id': Session.get("SCREEN_ID")+date+hour[j]+min[min.length-1],
        'segmentDate': array[i],
        'segmentStartTime': hour[j]+":"+min[min.length-1],
        'segmentEndTime': hour[j+1]+":00",
        'segmentTariff': 0,
        'segmentDuration': slot,
        'segmentDescription': "Nothing!",
        'segmentAvailability': 1,
        'segmentScreenID': Session.get("SCREEN_ID"),
        'currentNumber': 0,
        'status': 'HLD',
        'inputter': 'Vvv',
        'authorizer': null,
        'dateTime': date
      };
      //console.log("Segment :", segment);
      Segments_Authorization.insert(segment);
    }
  }
}
function sendCapsule(from, to, slot){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': parseInt(Session.get("SCREEN_IDENTITY")),
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
  var array = [];
  array[0] = from+"..."+to;
  var interval = array;
  var payload = {
    "slot": interval,
    "segment_duration_min": slot
  };
  capsule.sort = "TREE_GENERATOR";
  capsule.payload = payload;
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Error');
    }else{
      console.log("OK");
    }
  });
}
Template.segment.onCreated(function() { });
Template.segment.rendered = function(){
  settingLanguage();
  //getListOfDates('2017-01-20', '2017-02-20')
  //createListOfMinutes(5);
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
     var screens = Screens_Live.find();
     //console.log("Rows number :"+ screens.count())
     // set all markers in the Map
     screens.forEach(function(doc){
       // Verify if the COMPANY_CODE exist in the list of companies code
       if( doc.codeCompanies.indexOf(Session.get("UserLogged").codeCompany) > -1 ){
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
         marker.setMap(map);
         marker.addListener('click', function() {
              Session.set("SCREEN_ID", marker.idScreen);
              Session.set("SCREEN_IDENTITY", marker.id);
              Session.set("SCREEN_ADDRESS", marker.address);
              console.log("SCREEN_ID", marker.idScreen);
              $('.footable').footable();
              $('.footable2').footable();
              $('#addSegmentPopUp').modal();
              var array = getDaysNotAvailable();
              $('#data_1 .input-group.date').datepicker({
                format: "dd/mm/yyyy",
                 autoclose: true,
                 minDate: '01/01/2017',
                 todayHighlight: true,
                 beforeShowDay: function(date){
                   var active_dates = array;
                     var d = date;
                     var curr_date = d.getDate();
                     var curr_month = d.getMonth() + 1; //Months are zero based
                     var curr_year = d.getFullYear();
                     var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                       if ($.inArray(formattedDate, active_dates) != -1){
                           return {
                              classes: 'activeClass'
                           };
                       }
                      return;
                  }
              });
         });
       }

      });
     c.stop()
   }
 });

};
Template.segment.events({
    'click .newPlan'(){
      $('#startDate').val("");
      $('#endDate').val("");
      $('#newPlan').modal();
      var array = getDaysNotAvailable();
      $('#data_1 .input-group.date').datepicker({
        format: "dd/mm/yyyy",
         autoclose: true,
         minDate: '01/01/2017',
         todayHighlight: true,
         beforeShowDay: function(date){
           var active_dates = array;
             var d = date;
             var curr_date = d.getDate();
             var curr_month = d.getMonth() + 1; //Months are zero based
             var curr_year = d.getFullYear();
             var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

               if ($.inArray(formattedDate, active_dates) != -1){
                   return {
                      classes: 'activeClass'
                   };
               }
              return;
          }
      });
    },
    'click .saveAdd'(){
      var plan = getValuesFromForm();
        if(validateDate(plan.startDate) && validateDate(plan.endDate) ){
          Plans_Authorization.insert(plan);
          toastrSaveDone();
        }else{
          $('#verifyPlan').modal();
        }
    },
    'click .validateAdd'(){
      var plan = getValuesFromForm();
        if(validateDate(plan.startDate) && validateDate(plan.endDate) ){
          plan.status = "INAU";
          Plans_Authorization.insert(plan);
          toastrValidatonDone();
        }else{
          $('#verifyPlan').modal();
        }
    },
    //        Authorization events       //
    'click .cancelAu'() {
      var plan = Plans_Authorization.findOne({ "_id" : this._id });
      if (userAuthorized(plan.inputter)) {
        Session.set("deletePlanAu",plan);
        $('#checkCancel').modal();
      }else {
        toastrWarningAccessDenied();
      }
    },
    'click .BtnCancel'() {
      var plan = Session.get("deletePlanAu");
      Plans_Authorization.remove(plan._id);
      toastrSuppression();
    },
    'click .validateAu'() {
      var plan = Plans_Authorization.findOne({ "_id" : this._id });
      if (userAuthorized(plan.inputter)) {
        Plans_Authorization.update({'_id' : plan._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
      }else {
        toastrWarningAccessDenied();
      }
    },
    'click .authorizeAu'() {
      var newPlan = Plans_Authorization.findOne({ "_id" : this._id });
      Session.set("NewPlan",newPlan);
      $('#checkAuthorising').modal();
    },
    'click .BtnAuthorize'() {
      var plan = Session.get("NewPlan");
      plan.status = "LIVE";
      plan.authorizer = Session.get("UserLogged")._id;
      plan.dateTime = getDateNow();
      Plans_Live.insert(plan);
      Plans_Authorization.remove(plan._id);
      toastrAuthorizationDone();
      createSegments(plan.startDate,plan.endDate, plan.slot);
      sendCapsule(plan.startDate,plan.endDate, plan.slot);
    },
});
Template.segment.helpers({
  plansLive (){
    return Plans_Live.find({ 'codeCompany': Session.get("UserLogged").codeCompany, 'screensID': Session.get("SCREEN_ID") });
  },
  plansAuthorization (){
    var plans = Plans_Authorization.find({ 'codeCompany': Session.get("UserLogged").codeCompany, 'screensID': Session.get("SCREEN_ID") });
    var plansAuthorization = [];
    plans.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var plan =
        {
          '_id' : doc._id,
          'screensID': doc.screensID,
          'startDate': doc.startDate,
          'endDate': doc.endDate,
          'slot': doc.slot,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      plansAuthorization.push(plan);
    });
    return plansAuthorization;
  },
  newPlan() {
    return Session.get("NewPlan");
  },
  screenAdr(){
    return Session.get("SCREEN_ADDRESS");
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
  updateTitle(){
    return updateTitle();
  },
  deleteTitle(){
    return deleteTitle();
  },
  validateTitle(){
    return validateTitle();
  },
  authorizeTitle(){
    return authorizeTitle();
  },
  detailsTitle(){
    return detailsTitle();
  },
});

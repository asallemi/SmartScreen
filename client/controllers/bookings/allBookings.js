// Create handlers and subscribers
let handleBookings = Meteor.subscribe('bookings');
let handleSegments = Meteor.subscribe('segments');
let handleScreens = Meteor.subscribe('screens');

Template.allBookings.rendered = function(){

    // Initialie clockpicker
    $('.clockpicker').clockpicker();
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(".select2_demo_2").select2();
    $(".select2_demo_3").select2({
        placeholder: "Select a content",
        allowClear: true
    });
    // Initialize datapicker
    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
    $('#data_5 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    $(assignPopup).click(function(){
      var checkedValues = [];
      var checkboxes = document.getElementsByClassName('check');

      for(var i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
          console.log(" Check box value :"+checkboxes[i].value);
          checkedValues.push(checkboxes[i].value);
        }
      }
      if(checkedValues.length > 0){
        Session.set("checkedValues", checkedValues);
        $('#assign').modal();
      }else{
        swal("Sorry !", "You didn't checked any reservation !")
      }
      //console.log("checked count "+checkedValues.length);
    });
};
Template.allBookings.events({
  'click .validateAssign': function (e) {
    e.preventDefault();
    swal("Segment assigned!", "", "success")
  },
});
Template.allBookings.helpers({
  // A helper for the specific assigning
  allBookings() {
    var months = new Array(12);
    months[1] = "January";
    months[2] = "February";
    months[3] = "March";
    months[4] = "April";
    months[5] = "May";
    months[6] = "June";
    months[7] = "July";
    months[8] = "August";
    months[9] = "September";
    months[10] = "October";
    months[11] = "November";
    months[12] = "December";
    if(handleBookings.ready()){
      var bookingList = Bookings.find({ clientID : "10010" });
      var bookingArray = [];
      var monthsArray = [];
      var monthArr = [];
      bookingList.forEach(function(doc){
        if(handleSegments.ready()){
          var segment = Segments.findOne({ _id : doc.segmentID});
          var d = new Date(segment.segmentDate);
          //var result = segment.segmentDate.split("/");
          if( monthsArray.indexOf(months[d.getMonth()+1]+" "+d.getFullYear()) < 0 ){ // verify if the month exist before
            monthsArray.push(months[d.getMonth()+1]+" "+d.getFullYear());
            monthArr.push(d.getMonth()+1);
            Session.set("allMonths", monthArr);
          }
        }
       });
       for (var i=0; i<monthsArray.length; i++) {
         var obj = {};
         obj.month = monthsArray[i];
         bookingArray.push(obj);
       }
    }
    return bookingArray;
  },
  allWeeks(){
    var weeksArray = [];
    var monthArr = Session.get("allMonths");
    console.log(" Count of months :"+monthArr.length);
    for (var i=0; i<monthArr.length; i++) {
      //  monthArr : |8|6|10|
       var segments = Segments.find({ segmentMonth : monthArr[i] });
       //console.log(""+segments.count());
       console.log("For month :"+monthArr[i]);
       segments.forEach(function(doc){
         if( weeksArray.indexOf(doc.segmentWeek) < 0 ){
           weeksArray.push(doc.segmentWeek);
         }
       });
       //we'll have here an array -> weeksArray : |4|3|2|
       //console.log("we have "+)
       var obj = {};
       switch (weeksArray.length){
         case 1 : obj.week = weeksArray[0];
                  break;
         case 2 : obj.week = weeksArray[0]+weeksArray[1];
                  break;
         case 3 : obj.week = weeksArray[0]+weeksArray[1]+ weeksArray[2];
                  break;
         case 4 : obj.week = weeksArray[0]+ weeksArray[1]+weeksArray[2]+weeksArray[3];
                  break;
         case 5 : obj.week = weeksArray[0]+weeksArray[1]+weeksArray[2]+ weeksArray[3]+weeksArray[4]
                  break;
          default:
                  console.log("No weeks");
       }
       weeksArray.push(obj);
    }
    //console.log(" Weeks Array :"+weeksArray);
    return weeksArray;
  },
  // A helper to display all bookings
  bookings() {
    var bookingArray = [];
      if(handleBookings.ready()){
        var bookingList = Bookings.find({ clientID : "10010" });
        //console.log("list bookings  :"+bookingList.count());
        bookingList.forEach(function(doc){
          var obj = {};
          if(handleScreens.ready()){
            var screen = Screens.findOne({ _id : doc.screenID});
            obj.address = screen.screenAddress;
          }
          //console.log("Adresses :"+screen.screenAddress);
          if(handleSegments.ready()){
            var segment = Segments.findOne({ _id : doc.segmentID});
            obj.segmentDate = segment.segmentDate;
            obj.segmentStartTime = segment.segmentStartTime;
            obj.segmentEndTime = segment.segmentEndTime;
          }
          bookingArray.push(obj);
         });
      }
      return bookingArray;
  },
  content(){
    return Contents.find({})
  },
  bookingCount() {
    return Bookings.find().count();
  },
  selectedBookings() {
    var checkedValues = Session.get("checkedValues");
    var selectedObj = {};
    var selectedReservationArray = [];
    for(var i=0; i<checkedValues.length; i++){
      var row = checkedValues[i].split("*");
      selectedObj.date = row[0];
      selectedObj.startSlot = row[1];
      selectedObj.endSlot = row[2];
      selectedReservationArray.push(selectedObj);
    }
    return selectedReservationArray
    ;
  },
});

Template.allAccounts.rendered = function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(newAccount).click(function(){
      $('#addAccountPopUp').modal();
    });
    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    /*Meteor.call('getAdminUsers', function(error, result){
      // Result contains the list of users
      Session.set("allAdminUsers",result);
    });
    // List of users request
    if (Session.get("userConnected") === "admin"){
      var dn = "o=Administrators,o=WebApp,dc=swallow,dc=tn";
      var userType = "admin";
      Meteor.call('sendCapsuleLDAP', dn, userType, function(error, result){
        // Depends from the result , a popup display if the capsule didn't received
      });
    }else{
      var dn = "o=Establishments,o=WebApp,dc=swallow,dc=tn";
      var userType = "client";
      Meteor.call('sendCapsuleLDAP', dn, userType, function(error, result){
        // Depends from the result , a popup display if the capsule didn't received
      });
    }*/

};
Template.allAccounts.events({
  'submit .form'(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.mail.value;
    const password = target.password.value;
    const confirm = target.confirm.value;
    const fname = target.fname.value;
    const surname = target.surname.value;
    const cin = target.cin.value;
    const dateOfBirth = target.dateOfBirth.value;
    const phone = target.phone.value;
    const address = target.address.value;
    var pass1 = document.getElementById("pass1").value;
    var pass2 = document.getElementById("pass2").value;
    if (pass1 != pass2) {
        //alert("Passwords Do not match");
        document.getElementById("pass1").style.borderColor = "#E34234";
        document.getElementById("pass2").style.borderColor = "#E34234";
    }
    var AAssigningContent = "FALSE";
    var ADashboradGA = "FALSE";
    var AInvoiceGA = "FALSE";
    var AContartGA = "FALSE";
    var AClientGA = "FALSE";
    var AScreensGA = "FALSE";
    var ASegmentGA = "FALSE";
    var ABookingGA = "FALSE";
    var AAccountGA = "FALSE";
    if (document.getElementById('home').checked) {  ABookingGA = "TRUE";  }
    if (document.getElementById('dashboard').checked) {  ADashboradGA = "TRUE"; }
    if (document.getElementById('invoice').checked) {  AInvoiceGA = "TRUE";   }
    if (document.getElementById('account').checked) {  AAccountGA = "TRUE";   }
    if (document.getElementById('client').checked) {  AClientGA = "TRUE";   }
    if (document.getElementById('segment').checked) {  ASegmentGA = "TRUE";   }
    if (document.getElementById('booking').checked) {  AAssigningContent = "TRUE";   }
    if (document.getElementById('contract').checked) {  AContartGA = "TRUE";  }
    if (document.getElementById('screen').checked) {  AScreensGA = "TRUE";  }
    // we suppose the user who connected is an Administrator
    Session.set("userConnected","admin");
    if(Session.get("userConnected") === "admin"){
      var dn = "AEmail="+email+",o=Administrators,o=WebApp,dc=swallow,dc=tn";
      var userType = "admin";
      Meteor.call('addUser', dn, userType, email, password, fname, surname, cin, dateOfBirth, phone, address, AAssigningContent, ADashboradGA, AInvoiceGA, AContartGA, AClientGA, AScreensGA, ASegmentGA, ABookingGA, AAccountGA, function(error, result){
        if(result === 1){
          swal("Success !", "User saved with success", "success");
          location.reload();
        }else{
          swal("ERROR!", "User didn't saved");
        }
        target.mail.value = '';
        target.password.value = '';
        target.confirm.value = '';
        target.fname.value = '';
        target.surname.value = '';
        target.cin.value = '';
        target.dateOfBirth.value = '';
        target.phone.value = '';
        target.address.value = '';
      });
      target.mail.value = '';
      target.password.value = '';
      target.confirm.value = '';
      target.fname.value = '';
      target.surname.value = '';
      target.cin.value = '';
      target.dateOfBirth.value = '';
      target.phone.value = '';
      target.address.value = '';
    }
    if(Session.get("userConnected") === "client"){

    }
  },
  'click .btn-details'() {
    var users = Session.get("allAdminUsers");
    for (var i = 0; i < users.length; i++) {
        if (users[i].userId === this.userId) {
            Session.set("userDetails", users[i]);
        }
    }
    $('#userDetailsPopUp').modal();
  },
  'click .btn-edit'() {
    var users = Session.get("allAdminUsers");
    for (var i = 0; i < users.length; i++) {
        if (users[i].userId === this.userId) {
            Session.set("userDetails", users[i]);
        }
    }
    $('#userUpdatePopUp').modal();
  },
});
Template.allAccounts.helpers({
  users() {
    return Session.get("allAdminUsers");
  },
  userDetails(){
    return Session.get("userDetails");
  },
  roles(){
    return Roles.find();
  },
});

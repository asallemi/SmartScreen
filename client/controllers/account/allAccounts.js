Template.allAccounts.rendered = function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(newAccount).click(function(){ $('#addAccountPopUp').modal(); });
    $("#wizard").steps();
    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

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
    /*var pass1 = document.getElementById("pass1").value;
    var pass2 = document.getElementById("pass2").value;
    if (pass1 != pass2) {
        //alert("Passwords Do not match");
        document.getElementById("pass1").style.borderColor = "#E34234";
        document.getElementById("pass2").style.borderColor = "#E34234";
    }else{
    }*/
    var AAssigningContent = 0;
    var ADashboradGA = 0;
    var AInvoiceGA = 0;
    var AContartGA = 0;
    var AClientGA = 0;
    var AScreensGA = 0;
    var ASegmentGA = 0;
    var ABookingGA = 0;
    var AAccountGA = 0;
    if (document.getElementById('home').checked) {  AAssigningContent = 1;  }
    if (document.getElementById('dashboard').checked) {  ADashboradGA = 1; }
    if (document.getElementById('invoice').checked) {  AInvoiceGA = 1;   }
    if (document.getElementById('account').checked) {  AContartGA = 1;   }
    if (document.getElementById('client').checked) {  AClientGA = 1;   }
    if (document.getElementById('segment').checked) {  AScreensGA = 1;   }
    if (document.getElementById('booking').checked) {  ASegmentGA = 1;   }
    if (document.getElementById('contract').checked) {  ABookingGA = 1;  }
    if (document.getElementById('contract').checked) {  AAccountGA = 1;  }
    // we suppose the user who connected is an Administrator
    Session.set("userConnected","admin");
    if(Session.get("userConnected") === "admin"){
      var dn = "AEmail="+email+",o=Administrator,o=WebApp,dc=swallow,dc=tn";
      var userType = "admin";
      Meteor.call('addUser', dn, userType, email, password, fname, surname, cin, dateOfBirth, phone, address, AAssigningContent, ADashboradGA, AInvoiceGA, AContartGA, AClientGA, AScreensGA, ASegmentGA, ABookingGA, AAccountGA, function(error, result){
        if(result === 1){
          swal("Good job!", "User saved!", "success")
        }else{
          swal("ERROR!", "User didn't saved")
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
      var dn = "AEmail="+email+",o=Administrator,o=WebApp,dc=swallow,dc=tn";
      var userType = "client";
      Meteor.call('addUser', dn, userType, email, password, fname, surname, cin, dateOfBirth, phone, address, function(error, result){
        if(result === 1){
          swal("Good job!", "User saved!", "success")
        }else{
          swal("ERROR!", "User didn't saved")
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


  },
});

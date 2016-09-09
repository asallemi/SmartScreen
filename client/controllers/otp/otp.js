Template.otp.events({
    'submit .upload'(event) {
      event.preventDefault();
      const target = event.target;
      const otp = target.otp.value;
      //var login = Session.get("LOGIN");
      //var password = Session.get("PASSWORD");
      if( otp === Session.get("OTP")){
        Router.go('home');
      }else{
        swal({
          title: "OTP notification",
          text: "Your code has been expired ! You passed the 60 seconds",
          type: "warning",
          showCancelButton: false,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Okay, fine !",
          closeOnConfirm: false
        });
        Router.go('login');
      }
    }
});
Template.otp.helpers({
  otpCode: function() {
    return Session.get("OTP");
  }
});

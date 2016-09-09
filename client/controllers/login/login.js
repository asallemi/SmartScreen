Template.login.events({
    'submit .m-t'(event) {
      event.preventDefault();
      const target = event.target;

      const login = target.login.value;
      const password = target.password.value;

      Session.set("LOGIN", login);
      Session.set("PASSWORD", password);
      Meteor.call('sendLoginInfo', login, password, function(error, result){
        if(result === 1){
          Meteor.call(
            'sendEmail',
            login,
            'asallemi@swallow-labs.com','Smart Screen OTP',
            'You received this email because you want to login to Smart Sreen solution, this your code :'+Session.get("OTP")
          );
          setTimeout(function() {
              var otp = Math.random().toString(36).substring(7);
              Session.set("OTP", otp);
          }, 180*1000);

          Router.go('otp');
          /*Meteor.call('loginWithOTP', function(error, result){
            Session.set("OTP", result);
          });*/
        }else{
          //Router.go('login');
          swal("ERROR", "Please check your information !")
          target.login.value = '';
          target.password.value = '';

        }
      });

      //Meteor.call('sendOTPUsingMail');
    }
});

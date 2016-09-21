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
          Meteor.call('sendEmailContent', function(error, result){
            console.log("USERNAME of sender  "+ result.otp_conf.username);
            console.log("USERNAME of sender  "+ result.otp_conf.mail_subject);
            console.log("USERNAME of sender  "+ result.otp_conf.mail_text);
            Meteor.call(
              'sendEmail',
              login,
              result.otp_conf.username,
              result.otp_conf.mail_subject,
              result.otp_conf.mail_text + Session.get("OTP")
            );
          });
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

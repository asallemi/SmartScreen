Template.login.events({
    'submit .login'(event) {
      event.preventDefault();
      const target = event.target;
      const email = target.email.value;
      const password = target.password.value;
      var user = Users_Live.findOne({ 'email': email });
      var code = null;
      if(user != undefined){
        code = user.code;
        //console.log("Code :", code);
      }
      Meteor.call('sendLoginInfo', email, password, code, function(error, result){
        if(result == 1){
          var pwd = CryptoJS.AES.decrypt(password, 'SmartScreen').toString(CryptoJS.enc.Utf8);
          var user = Users_Live.findOne({ 'email': email, 'password': pwd });
          Session.set("UserLogged",user);
          /*Meteor.call('sendEmailContent', function(error, result){
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
          }, 180*1000);*/
          Router.go('home');
          Session.set("LOGIN", "ok");
          /*Meteor.call('loginWithOTP', function(error, result){
            Session.set("OTP", result);
          });*/
        }else{
          //Router.go('login');
          swal("ERROR", "Please check your information !")
          target.email.value = '';
          target.password.value = '';
        }
      });
      //Meteor.call('sendOTPUsingMail');
    }
});
Template.login.rendered = function(){
    // Set validation rules
    $("#form").validate({
        rules: {
            password: {
                required: true,
                minlength: 0
            }
        },
        messages: {
            email: {
                required: "Custom message for required",
                email: "Custom message for proper email address"
            }
        }
    });
};

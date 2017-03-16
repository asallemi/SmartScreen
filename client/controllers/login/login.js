/*Template.login.events({

    'click .login'() {
      if (document.getElementById('email') != null) {
        var email = document.getElementById("email").value;
      }else {
        var email = null;
      }
      if (document.getElementById('password') != null) {
        var password = document.getElementById("password").value;
      }else {
        var password = null;
      }
      if( email == null || password == null){
        swal("ERROR", "Please enter your email and password !");
      }else{
        console.log("Users number : ", Users_Live.find({ 'email': email }));
        console.log("PWD : ",CryptoJS.AES.encrypt(password, 'SmartScreen').toString());
        var user = Users_Live.findOne({ 'email': email, 'password': CryptoJS.AES.encrypt(password, 'SmartScreen').toString() });
        if(user != undefined){
          Session.set("UserLogged",user);
          Router.go('home');
        }else {
          swal("ERROR", "Please check your email and password !");
        }
      }
    },
});*/
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
      Router.go('home');
      //Session.set("UserLogged",user);
      sessionStorage.setItem("User", JSON.stringify(user));
      if(user.roles.indexOf("*").length > 0){
        var listOfRoles = getListOfRoles(user.roles);
        var role = getFinalRole(listOfRoles);
      }else {
          var role = Roles_Live.findOne({ '_id': user.roles });
      }
      sessionStorage.setItem("Role", JSON.stringify(role));

      Session.set("LOGIN", "ok");
      Session.set("Welcome", "ok");

    }else{
      //Router.go('login');
      swal({ title: "Alert !",text: "Please verify your email and password, you have something wrong !",type: "warning",closeOnConfirm: true });
      target.email.value = '';
      target.password.value = '';
    }
  });
  //Meteor.call('sendOTPUsingMail');
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

  /*Meteor.call('loginWithOTP', function(error, result){
    Session.set("OTP", result);
  });*/
  },
});

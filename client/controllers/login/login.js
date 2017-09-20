Template.login.rendered = function(){
    $('#error').hide();
};
Template.login.events({
  'click .login'(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value
    if (email.length == 0 || password.length == 0) {
      $('#error').show();
    }else {
      var user = Users_Live.findOne({ 'email': email });
      var codeCompany = null;
      if(user != undefined){
        codeCompany = user.codeCompany;
        // CODE : help us to know from which company (go to /server/ldap.js file for more details)
        Meteor.call('sendLoginInfo', email, password, codeCompany, user.code, function(error, result){
          console.log("Res " ,result);
          if(result == 1){
            if (codeCompany == "swallow-labs") {
              Router.go('allCompanies');
            }else {
              Router.go('home');
            }
            // Set user information in local Storage
            localStorage.setItem("User", JSON.stringify(user));
            if(user.roles.indexOf("*").length > 0){
              var listOfRoles = getListOfRoles(user.roles);
              var role = getFinalRole(listOfRoles);
            }else {
                var role = Roles_Live.findOne({ '_id': user.roles });
            }
            console.log(role);
            console.log(JSON.stringify(role));
            localStorage.setItem("Role", JSON.stringify(role));
            Session.set("SESSION_LOGIN", "ok");
            Session.set("Welcome", "ok");
          }else{
            $('#error').show();
            target.email.value = '';
            target.password.value = '';
          }
        });
      }else {
        $('#error').show();
      }
    }
  },
});

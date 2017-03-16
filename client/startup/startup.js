Meteor.startup(function () {
  let plansLive = Meteor.subscribe('plansLive');
  let plansAuthorization = Meteor.subscribe('plansAuthorization');
  let contentsAuthorization = Meteor.subscribe('contentsAuthorization');
  let contentsLive = Meteor.subscribe('contentsLive');
  //Uploader.uploadUrl = Meteor.absoluteUrl("/home/akrem/Contenus/"+Session.get("UserLogged").code);
});

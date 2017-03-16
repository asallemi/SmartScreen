settingLanguage = function(){
  if(Session.get("UserLogged").language != "en" && Session.get("UserLogged").language != "fr" ){
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: 'en'
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.row').i18n();
        $('.modal').i18n();
        $('.center').i18n();
        $('.modal-body').i18n();
    });
  }else {
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: Session.get("UserLogged").language
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.row').i18n();
        $('.modal').i18n();
        $('.center').i18n();
        $('.modal-body').i18n();
    });
  }
  $('.set_en').on('click', function (){
      i18n.setLng('en', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.row').i18n();
          $('.modal').i18n();
          $('.center').i18n();
          $('.modal-body').i18n();

          $('.set_en').addClass('active');
          $('.set_fr').removeClass('active');
      });
  });

  $('.set_fr').on('click', function (){
      i18n.setLng('fr', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.row').i18n();
          $('.modal').i18n();
          $('.center').i18n();
          $('.modal-body').i18n();

          $('.set_fr').addClass('active');
          $('.set_en').removeClass('active');
      });
  });

}
Template.topNavbar.rendered = function(){
  if(Session.get("UserLogged").language != "en" && Session.get("UserLogged").language != "fr" ){
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: 'en'
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.row').i18n();
        $('.modal').i18n();
        $('.center').i18n();
    });
  }else {
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: Session.get("UserLogged").language
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.row').i18n();
        $('.modal').i18n();
        $('.center').i18n();
    });
  }
  $('.set_en').on('click', function (){
    toastr.success('With success','Language changed');
    Users_Live.update({ '_id' : Session.get("UserLogged")._id }, {'$set':{ 'language' : "en" }});
    var user = Session.get("UserLogged");
    user.language = "en";
    Session.set("UserLogged", user);
      i18n.setLng('en', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.row').i18n();
          $('.modal').i18n();
          $('.center').i18n();

          $('.set_en').addClass('active');
          $('.set_fr').removeClass('active');
      });
  });

  $('.set_fr').on('click', function (){
    toastr.success('Avec succés','Langage a changé');
    Users_Live.update({ '_id' : Session.get("UserLogged")._id }, {'$set':{ 'language' : "fr" }});
    var user = Session.get("UserLogged");
    user.language = "fr";
    Session.set("UserLogged", user);
      i18n.setLng('fr', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.row').i18n();
          $('.modal').i18n();
          $('.center').i18n();

          $('.set_fr').addClass('active');
          $('.set_en').removeClass('active');
      });
  });
};

Template.topNavbar.events({
    // Toggle left navigation
    'click #navbar-minimalize': function(event){
        event.preventDefault();
        // Toggle special class
        $("body").toggleClass("mini-navbar");

        // Enable smoothly hide/show menu
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    },
    // Toggle right sidebar
    'click .right-sidebar-toggle': function(){
        $('#right-sidebar').toggleClass('sidebar-open');
    }
});

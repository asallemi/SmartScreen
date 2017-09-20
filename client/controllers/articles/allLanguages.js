Meteor.subscribe('languages_live');
function verifyExistingLanguagePivot(){
  var languages = Languages_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany, "isPivot": true }, {"isPivot": 1}).fetch();
  if (languages.length > 0) {
    return true;
  }else {
    return false;
  }
}
Template.allLanguages.rendered = function(){
  checkSession();
  settingLanguage();
  // Initialize fooTable
  $('.footable').footable();
};
Template.allLanguages.events({
  'click .btn-edit'() {
    var language = Languages_Live.findOne({ "_id" : this._id });
    Session.set("LanguageToUpdate", language);
    settingLanguage();
    $('#editLanguage').modal();
  },
  // We didn't give the possiblity to update the name of language bz it s connected to i18next plugins (Internationalization plugins)
  'click .update'() {
    var isPivot = ($('input[name="_isPivot"]:checked').val() == "true");
    if (verifyExistingLanguagePivot() == false || isPivot == false) {
      Languages_Live.update({'_id' : Session.get("LanguageToUpdate")._id }, {'$set':{ 'isPivot' : isPivot, 'dateTime' : getDateNow() }});
      $('#editLanguage').modal('hide');
      toastrModificationSaved();
    }else {
      toastrCanootHavingTwoPivotLanguage();
    }
  },
});
Template.allLanguages.helpers({
  languages (){
    return Languages_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  },
  language (){
    return Session.get("LanguageToUpdate");
  },
  ActionDetails (){
    return Session.get("ActionDetails");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
  updateTitle(){
    return updateTitle();
  },
  deleteTitle(){
    return deleteTitle();
  },
  validateTitle(){
    return validateTitle();
  },
  authorizeTitle(){
    return authorizeTitle();
  },
  detailsTitle(){
    return detailsTitle();
  },
});
